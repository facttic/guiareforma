/**
 * Gráfico de votación por bloques políticos
 * Lista visual con barras de favor/contra
 */

import * as d3 from 'd3';

/**
 * Inicializar gráfico de bloques
 */
export function initBlocChart(selector, bloquesData, camara = 'diputados') {
  const container = document.querySelector(selector);
  if (!container) return;

  // Limpiar contenedor
  container.innerHTML = '';

  const data = bloquesData[camara];
  if (!data) return;

  // Combinar datos de favor y contra por bloque
  const bloqueMap = new Map();

  data.favor.forEach(d => {
    bloqueMap.set(d.bloque, {
      bloque: d.bloque,
      favor: d.votos,
      contra: 0,
      color: d.color,
      detalle: d.detalle || null
    });
  });

  data.contra.forEach(d => {
    if (bloqueMap.has(d.bloque)) {
      const existing = bloqueMap.get(d.bloque);
      existing.contra = d.votos;
      if (d.detalle) existing.detalle = d.detalle;
    } else {
      bloqueMap.set(d.bloque, {
        bloque: d.bloque,
        favor: 0,
        contra: d.votos,
        color: d.color,
        detalle: d.detalle || null
      });
    }
  });

  // Convertir a array y ordenar por total, pero "Otros" al final
  const allBloques = Array.from(bloqueMap.values())
    .map(d => ({
      ...d,
      total: d.favor + d.contra,
      isOtros: d.bloque.startsWith('Otros')
    }))
    .sort((a, b) => {
      // "Otros" siempre al final
      if (a.isOtros && !b.isOtros) return 1;
      if (!a.isOtros && b.isOtros) return -1;
      // Resto ordenado por total
      return b.total - a.total;
    });

  // Totales
  const totalFavor = d3.sum(data.favor, d => d.votos);
  const totalContra = d3.sum(data.contra, d => d.votos);
  const maxVotos = d3.max(allBloques, d => Math.max(d.favor, d.contra));

  // Crear HTML
  const wrapper = document.createElement('div');
  wrapper.className = 'bloques-chart';

  // Título
  const titulo = document.createElement('h4');
  titulo.className = 'bloques-titulo';
  titulo.textContent = camara === 'diputados' ? 'Diputados' : 'Senado';
  wrapper.appendChild(titulo);

  // Totales
  const totales = document.createElement('div');
  totales.className = 'bloques-totales';
  totales.innerHTML = `
    <span class="total-favor">${totalFavor} a favor</span>
    <span class="total-contra">${totalContra} en contra</span>
  `;
  wrapper.appendChild(totales);

  // Lista de bloques
  const lista = document.createElement('div');
  lista.className = 'bloques-lista';

  allBloques.forEach(bloque => {
    const item = document.createElement('div');
    item.className = 'bloque-item';

    const widthFavor = (bloque.favor / maxVotos) * 100;
    const widthContra = (bloque.contra / maxVotos) * 100;

    const detalleHTML = bloque.detalle
      ? `<div class="bloque-detalle">${bloque.detalle}</div>`
      : '';

    item.innerHTML = `
      <div class="bloque-nombre">${bloque.bloque}</div>
      ${detalleHTML}
      <div class="bloque-barras">
        <div class="barra-row">
          <span class="barra-label favor">A favor</span>
          <div class="barra-container">
            <div class="barra favor" style="width: ${widthFavor}%"></div>
          </div>
          <span class="barra-valor favor">${bloque.favor}</span>
        </div>
        <div class="barra-row">
          <span class="barra-label contra">En contra</span>
          <div class="barra-container">
            <div class="barra contra" style="width: ${widthContra}%"></div>
          </div>
          <span class="barra-valor contra">${bloque.contra}</span>
        </div>
      </div>
    `;

    lista.appendChild(item);
  });

  wrapper.appendChild(lista);
  container.appendChild(wrapper);
}

/**
 * Resaltar un bloque específico
 */
export function highlightBloque(bloque) {
  const items = document.querySelectorAll('.bloque-item');
  items.forEach(item => {
    const nombre = item.querySelector('.bloque-nombre').textContent;
    item.style.opacity = nombre === bloque ? '1' : '0.3';
  });
}

/**
 * Resetear resaltado
 */
export function resetBloqueHighlight() {
  const items = document.querySelectorAll('.bloque-item');
  items.forEach(item => {
    item.style.opacity = '1';
  });
}
