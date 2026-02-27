/**
 * Reforma Laboral 2026 - FACTTIC
 * Archivo principal de la aplicación
 */

import { initWizard } from './wizard.js';
import { initUserData, getUserData, hasUserData } from './user-data.js';
import { initVotingMap } from './d3/voting-map.js';
import { initBlocChart } from './d3/bloc-chart.js';
import { initTimeline } from './d3/timeline-chart.js';
import { initComparisonViz } from './d3/comparison-viz.js';
import { updateIndemnizacion } from './d3/calculators/salary-calculator.js';
import { updateBancoHoras } from './d3/calculators/hours-calculator.js';
import { updateCuotaSindical } from './d3/calculators/union-calculator.js';
import { initLeyModal } from './ley-modal.js';

// Estado de la aplicación
const state = {
  currentSection: 'hero',
  userData: null,
  dataLoaded: false
};

// Datos cargados
let dataSenadores = [];
let dataProvincias = {};
let dataBloques = {};
let dataCambios = {};
let dataSectores = {};

/**
 * Inicializar la aplicación
 */
async function init() {
  console.log('Iniciando Reforma Laboral 2026 - FACTTIC');

  // Cargar datos
  await loadData();

  // Inicializar navegación mobile
  initMobileNav();

  // Inicializar Wizard PRIMERO (para que nextStep esté disponible)
  initWizard();

  // Inicializar formulario (usa nextStep del wizard)
  initUserData(onUserDataChange);

  // Inicializar visualizaciones
  initVisualizations();

  // Escuchar cambios de paso para actualizar visualizaciones
  document.addEventListener('wizardStepChange', onWizardStepChange);

  // Inicializar compartir
  initShare();

  // Inicializar modal de ley
  initLeyModal();

  // Marcar como listo
  document.body.classList.add('app-ready');
}

/**
 * Cargar todos los datos JSON
 */
async function loadData() {
  // Usar BASE_URL de Vite para que funcione en GitHub Pages
  const base = import.meta.env.BASE_URL || '/';

  try {
    const [senadores, provincias, bloques, cambios, sectores] = await Promise.all([
      fetch(`${base}data/senadores.json`).then(r => r.json()),
      fetch(`${base}data/provincias.json`).then(r => r.json()),
      fetch(`${base}data/bloques.json`).then(r => r.json()),
      fetch(`${base}data/cambios.json`).then(r => r.json()),
      fetch(`${base}data/sectores-cct.json`).then(r => r.json())
    ]);

    dataSenadores = senadores;
    dataProvincias = provincias;
    dataBloques = bloques;
    dataCambios = cambios;
    dataSectores = sectores;

    state.dataLoaded = true;
    console.log('Datos cargados correctamente');
  } catch (error) {
    console.error('Error cargando datos:', error);
  }
}

/**
 * Inicializar navegación mobile
 */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      navList.classList.toggle('open');
    });

    // Cerrar al hacer click en un link
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
      });
    });
  }
}

/**
 * Inicializar todas las visualizaciones D3
 */
function initVisualizations() {
  // Timeline
  initTimeline('#timeline-viz');

  // Mapa de votación - DIFERIDO hasta que la sección sea visible
  initMapaWhenVisible();

  // Gráfico de bloques
  initBlocChart('#bloques-viz', dataBloques);

  // Inicializar controles del mapa
  initMapaControls();

  // Inicializar tabs de bloques
  initBloquesTabs();

  // Inicializar tooltips de barras stackeadas (con delay para asegurar que el DOM esté listo)
  setTimeout(initStackedBarTooltips, 500);
}

/**
 * Inicializar mapa cuando la sección de votación sea visible
 */
let mapaInitialized = false;

function initMapaWhenVisible() {
  const mapaContainer = document.getElementById('mapa-viz');
  if (!mapaContainer) return;

  // Observar cuando el contenedor sea visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !mapaInitialized) {
        console.log('Sección de mapa visible, inicializando...');
        mapaInitialized = true;

        // Pequeño delay para asegurar que el layout esté calculado
        setTimeout(() => {
          initVotingMap('#mapa-viz', dataProvincias, dataSenadores);
        }, 100);

        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(mapaContainer);

  // También intentar inicializar si la sección ya está activa
  const section = mapaContainer.closest('.section');
  if (section && section.classList.contains('active') && !mapaInitialized) {
    mapaInitialized = true;
    setTimeout(() => {
      initVotingMap('#mapa-viz', dataProvincias, dataSenadores);
    }, 100);
  }
}

/**
 * Controles del mapa (filtro por cámara)
 */
function initMapaControls() {
  const buttons = document.querySelectorAll('.mapa-toggle');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const camara = btn.dataset.camara;
      // Solo actualizar si el mapa ya está inicializado
      if (mapaInitialized) {
        initVotingMap('#mapa-viz', dataProvincias, dataSenadores, camara);
      }
    });
  });
}

/**
 * Tabs de bloques (Diputados/Senado)
 */
function initBloquesTabs() {
  const tabs = document.querySelectorAll('.bloques-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const camara = tab.dataset.tab;
      initBlocChart('#bloques-viz', dataBloques, camara);
    });
  });
}

/**
 * Callback cuando cambian los datos del usuario
 */
function onUserDataChange(userData) {
  state.userData = userData;

  // Actualizar todas las calculadoras
  updateAllCalculators();

  // Mostrar secciones personalizadas
  showPersonalizedContent();

  // Actualizar nombres
  updateUserNames(userData.nombre || 'trabajador');
}

/**
 * Actualizar todas las calculadoras con datos del usuario
 */
function updateAllCalculators() {
  if (!state.userData) return;

  const { salario, variables, antiguedad, horas, afiliado, convenio, sector, tipoEmpresa, isExample } = state.userData;
  const sectorData = dataSectores[sector] || dataSectores.otros;

  // Indemnización
  updateIndemnizacion({
    salario,
    variables: variables || 0,
    antiguedad,
    salarioPromedioCCT: sectorData.salarioPromedio,
    tipoEmpresa: tipoEmpresa || 'nosabe',
    sectorData: sectorData,
    isExample: isExample || false
  });

  // Banco de horas
  updateBancoHoras({
    horasDiarias: horas,
    salario
  });

  // Cuota sindical
  updateCuotaSindical({
    salario,
    afiliado,
    sector: sectorData.nombre
  });

  // Actualizar info de convenio
  updateConvenioInfo(convenio, sectorData);
}

/**
 * Mostrar contenido personalizado
 */
function showPersonalizedContent() {
  const personalizadas = document.querySelectorAll('.calc-personalizada');
  personalizadas.forEach(el => {
    el.hidden = false;
  });

  // Mostrar resumen personalizado
  const resumen = document.getElementById('resumen-personalizado');
  if (resumen && state.userData) {
    resumen.hidden = false;
    generateResumen();
  }

  // Refrescar anotaciones para contenido dinámico
  setTimeout(() => {
    if (window.refreshAnnotations) {
      window.refreshAnnotations();
    }
  }, 100);
}

/**
 * Actualizar nombres del usuario en toda la página
 */
function updateUserNames(nombre) {
  document.querySelectorAll('.user-name').forEach(el => {
    el.textContent = nombre;
  });
}

/**
 * Actualizar info de convenio
 */
function updateConvenioInfo(tieneConvenio, sectorData) {
  const convenioSi = document.querySelector('.convenio-si');
  const convenioNo = document.querySelector('.convenio-no');
  const sectorNombre = document.getElementById('sector-nombre');
  const sectorConvenio = document.getElementById('sector-convenio');

  if (tieneConvenio) {
    if (convenioSi) convenioSi.hidden = false;
    if (convenioNo) convenioNo.hidden = true;
    if (sectorConvenio) sectorConvenio.textContent = sectorData.nombre;
  } else {
    if (convenioSi) convenioSi.hidden = true;
    if (convenioNo) convenioNo.hidden = false;
    if (sectorNombre) sectorNombre.textContent = sectorData.nombre;
  }
}

/**
 * Generar resumen personalizado
 */
function generateResumen() {
  const container = document.getElementById('resumen-personalizado');
  if (!container || !state.userData) return;

  const { nombre, antiguedad, salario, variables, sector, afiliado, convenio, horas } = state.userData;
  const sectorData = dataSectores[sector] || dataSectores.otros;

  // Calcular indemnización ANTES (con variables)
  const salarioCompleto = salario + (variables || 0);
  const meses = Math.max(antiguedad, 1);
  const indemAntes = salarioCompleto * meses;

  // Calcular indemnización AHORA (con tope y exclusiones)
  const salarioReducido = salario * 0.85; // ~15% menos por exclusiones
  const tope = sectorData.salarioPromedio * 3;
  const baseConTope = Math.min(salarioReducido, tope);
  const minimoGarantizado = salario * 0.67 * meses;
  const indemDespues = Math.max(baseConTope * meses, minimoGarantizado, salario);

  const diferencia = indemAntes - indemDespues;
  const porcentajePerdida = indemAntes > 0 ? ((diferencia / indemAntes) * 100).toFixed(0) : 0;

  // Llenar datos de indemnización
  const indemAntesEl = document.getElementById('resumen-indem-antes');
  const indemAhoraEl = document.getElementById('resumen-indem-ahora');
  const indemDifEl = document.getElementById('resumen-indem-diferencia');

  if (indemAntesEl) indemAntesEl.textContent = `$${formatNumber(indemAntes)}`;
  if (indemAhoraEl) indemAhoraEl.textContent = `$${formatNumber(indemDespues)}`;
  if (indemDifEl) {
    if (diferencia > 0) {
      indemDifEl.innerHTML = `<span class="perdida">Perdés $${formatNumber(diferencia)} (${porcentajePerdida}% menos)</span>`;
    } else {
      indemDifEl.innerHTML = `<span class="neutro">Sin cambio significativo por el mínimo garantizado</span>`;
    }
  }

  // Llenar datos de horas extra
  const horasTexto = document.getElementById('resumen-horas-texto');
  if (horasTexto) {
    const horasDiarias = horas || 8;
    if (horasDiarias > 8) {
      horasTexto.innerHTML = `Trabajás <strong>${horasDiarias} horas por día</strong>. Esas ${horasDiarias - 8} horas extra antes se pagaban al 50-100%. Ahora podrían compensarte con tiempo libre en vez de plata.`;
    } else {
      horasTexto.innerHTML = `Trabajás <strong>8 horas por día</strong>. Si te piden horas extra, ahora podrían compensarte con tiempo libre en vez de pagártelas.`;
    }
  }

  // Llenar datos de cuota sindical
  const cuotaTexto = document.getElementById('resumen-cuota-texto');
  if (cuotaTexto) {
    if (afiliado) {
      const cuotaEstimada = Math.round(salario * 0.02);
      cuotaTexto.innerHTML = `Estás afiliado. Los ~<strong>$${formatNumber(cuotaEstimada)}/mes</strong> que te descuentan ahora son voluntarios. Tu empleador podría preguntarte si querés seguir aportando.`;
    } else {
      cuotaTexto.innerHTML = `No estás afiliado, no te descuentan cuota. Pero esto <strong>debilita al sindicato</strong> de tu sector, lo que puede afectarte en futuras negociaciones.`;
    }
  }

  // Llenar datos de convenio
  const convenioTexto = document.getElementById('resumen-convenio-texto');
  if (convenioTexto) {
    if (convenio) {
      convenioTexto.innerHTML = `Tu empresa tiene convenio propio. Ahora <strong>prevalece sobre el nacional</strong>. Podrían negociar condiciones distintas a las del CCT de ${sectorData.nombre}.`;
    } else {
      convenioTexto.innerHTML = `Te rige el CCT de ${sectorData.nombre}. Pero ahora <strong>podrían crear un convenio de empresa</strong> con condiciones diferentes.`;
    }
  }

  // Alerta final
  const alertaEl = document.getElementById('resumen-alerta');
  if (alertaEl) {
    let alertas = [];
    if (diferencia > salario * 2) {
      alertas.push('Tu indemnización podría reducirse significativamente');
    }
    if (afiliado) {
      alertas.push('Prestá atención si te piden firmar algo sobre la cuota sindical');
    }
    if (convenio) {
      alertas.push('Seguí de cerca las negociaciones del convenio de empresa');
    }

    if (alertas.length > 0) {
      alertaEl.innerHTML = `<strong>⚠️ Puntos a seguir:</strong><ul>${alertas.map(a => `<li>${a}</li>`).join('')}</ul>`;
      alertaEl.hidden = false;
    } else {
      alertaEl.hidden = true;
    }
  }
}

/**
 * Callback cuando cambia el paso del wizard
 */
function onWizardStepChange(event) {
  const { currentStep, section } = event.detail;

  state.currentSection = section.id;

  // Animar elementos de la sección
  section.querySelectorAll('.animate-in').forEach(el => {
    el.classList.add('visible');
  });

  // Actualizar navegación
  updateNavHighlight(section.id);
}

/**
 * Actualizar highlight de navegación
 */
function updateNavHighlight(sectionId) {
  const links = document.querySelectorAll('.nav-list a');
  links.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', href === sectionId);
  });
}

/**
 * Inicializar funcionalidad de compartir
 */
function initShare() {
  const buttons = document.querySelectorAll('.compartir-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const shareType = btn.dataset.share;
      const url = window.location.href;
      const title = 'Reforma Laboral 2026: Lo que cambia para vos | FACTTIC';
      const text = 'Guía interactiva sobre la reforma laboral argentina. Calculá cómo te afecta.';

      switch (shareType) {
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
          break;
        case 'instagram':
          navigator.clipboard.writeText(url).then(() => {
            btn.textContent = 'Link copiado!';
            setTimeout(() => {
              btn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              `;
            }, 2000);
          });
          break;
        case 'copy':
          navigator.clipboard.writeText(url).then(() => {
            btn.textContent = 'Copiado!';
            setTimeout(() => {
              btn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copiar link
              `;
            }, 2000);
          });
          break;
      }
    });
  });
}

/**
 * Inicializar tooltips para barras stackeadas
 */
function initStackedBarTooltips() {
  // Crear tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'chart-tooltip';
  tooltip.innerHTML = '<span class="tooltip-votos"></span><span class="tooltip-bloque"></span>';
  document.body.appendChild(tooltip);

  const votosEl = tooltip.querySelector('.tooltip-votos');
  const bloqueEl = tooltip.querySelector('.tooltip-bloque');

  // Agregar eventos a cada segmento
  document.querySelectorAll('.segment').forEach(segment => {
    segment.addEventListener('mouseenter', function(e) {
      const votos = this.dataset.votos;
      const bloque = this.dataset.bloque;

      votosEl.textContent = votos;
      bloqueEl.textContent = bloque;

      const rect = this.getBoundingClientRect();
      tooltip.style.left = (rect.left + rect.width / 2 - 65) + 'px';
      tooltip.style.top = (rect.top - 85) + 'px';

      tooltip.classList.add('show');
    });

    segment.addEventListener('mouseleave', function() {
      tooltip.classList.remove('show');
    });

    // Touch
    segment.addEventListener('click', function(e) {
      const votos = this.dataset.votos;
      const bloque = this.dataset.bloque;

      votosEl.textContent = votos;
      bloqueEl.textContent = bloque;

      const rect = this.getBoundingClientRect();
      tooltip.style.left = (rect.left + rect.width / 2 - 65) + 'px';
      tooltip.style.top = (rect.top - 85) + 'px';

      tooltip.classList.add('show');

      setTimeout(() => tooltip.classList.remove('show'), 2000);
    });
  });
}

/**
 * Formatear número con separador de miles
 */
function formatNumber(num) {
  return new Intl.NumberFormat('es-AR').format(Math.round(num));
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Exportar para debugging
window.__reformaLaboral = {
  state,
  dataSenadores,
  dataProvincias,
  dataBloques,
  dataCambios,
  dataSectores
};
