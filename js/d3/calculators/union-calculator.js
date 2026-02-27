/**
 * Calculadora de cuota sindical
 * Muestra el impacto del cambio a cuota voluntaria
 */

// Porcentajes típicos de cuota sindical por sector
const CUOTAS_SINDICALES = {
  comercio: 0.02,      // 2% - Empleados de Comercio
  metalurgico: 0.025,  // 2.5% - UOM
  construccion: 0.03,  // 3% - UOCRA
  gastronomico: 0.02,  // 2% - UTHGRA
  bancario: 0.025,     // 2.5% - Asociación Bancaria
  transporte: 0.03,    // 3% - UTA/Camioneros
  salud: 0.02,         // 2% - FATSA
  educacion: 0.02,     // 2% - CTERA/UDA
  informatica: 0.02,   // 2% (si aplica)
  otros: 0.02          // 2% por defecto
};

/**
 * Calcular cuota sindical mensual
 * @param {number} salario - Salario mensual bruto
 * @param {string} sector - Sector de actividad
 * @returns {number} Cuota mensual
 */
function calcularCuotaMensual(salario, sector) {
  const porcentaje = CUOTAS_SINDICALES[sector] || CUOTAS_SINDICALES.otros;
  return salario * porcentaje;
}

/**
 * Calcular cuota sindical anual
 * @param {number} salario - Salario mensual bruto
 * @param {string} sector - Sector de actividad
 * @returns {number} Cuota anual (13 meses por aguinaldo)
 */
function calcularCuotaAnual(salario, sector) {
  // Se calcula sobre 13 meses (incluye aguinaldo)
  return calcularCuotaMensual(salario, sector) * 13;
}

/**
 * Actualizar visualización de cuota sindical
 */
export function updateCuotaSindical({ salario, afiliado, sector }) {
  const container = document.querySelector('#calc-cuota');
  if (!container) return;

  const personalizada = container.querySelector('.calc-personalizada');
  if (!personalizada) return;

  // Mostrar sección
  personalizada.hidden = false;

  const afiliadoSi = container.querySelector('.afiliado-si');
  const afiliadoNo = container.querySelector('.afiliado-no');
  const elCuotaMensual = document.getElementById('cuota-mensual');

  if (afiliado) {
    // Mostrar info para afiliados
    if (afiliadoSi) afiliadoSi.hidden = false;
    if (afiliadoNo) afiliadoNo.hidden = true;

    const cuotaMensual = calcularCuotaMensual(salario, sector);
    if (elCuotaMensual) {
      elCuotaMensual.textContent = formatCurrency(cuotaMensual);
    }

    // Agregar detalles
    actualizarDetallesAfiliado(container, salario, sector);
  } else {
    // Mostrar info para no afiliados
    if (afiliadoSi) afiliadoSi.hidden = true;
    if (afiliadoNo) afiliadoNo.hidden = false;

    // Limpiar detalles
    const detalles = container.querySelector('.cuota-detalles');
    if (detalles) detalles.remove();
  }
}

/**
 * Actualizar detalles para afiliados
 */
function actualizarDetallesAfiliado(container, salario, sector) {
  const cuotaMensual = calcularCuotaMensual(salario, sector);
  const cuotaAnual = calcularCuotaAnual(salario, sector);
  const porcentaje = (CUOTAS_SINDICALES[sector] || CUOTAS_SINDICALES.otros) * 100;

  let detalles = container.querySelector('.cuota-detalles');
  if (!detalles) {
    detalles = document.createElement('div');
    detalles.className = 'cuota-detalles calc-nota';
    container.querySelector('.calc-personalizada').appendChild(detalles);
  }

  detalles.innerHTML = `
    <table class="cuota-tabla">
      <tr>
        <td>Porcentaje de tu sector:</td>
        <td><strong>${porcentaje}%</strong></td>
      </tr>
      <tr>
        <td>Cuota mensual:</td>
        <td><strong>${formatCurrency(cuotaMensual)}</strong></td>
      </tr>
      <tr>
        <td>Cuota anual (con aguinaldo):</td>
        <td><strong>${formatCurrency(cuotaAnual)}</strong></td>
      </tr>
    </table>

  `;
}

/**
 * Formatear como moneda argentina
 */
function formatCurrency(value) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Obtener información del sindicato por sector
 */
export function getInfoSindicato(sector) {
  const sindicatos = {
    comercio: {
      nombre: 'Sindicato de Empleados de Comercio (SEC)',
      afiliados: '~1.2 millones',
      convenio: '130/75'
    },
    metalurgico: {
      nombre: 'Unión Obrera Metalúrgica (UOM)',
      afiliados: '~250.000',
      convenio: '260/75'
    },
    construccion: {
      nombre: 'UOCRA',
      afiliados: '~400.000',
      convenio: '76/75'
    },
    gastronomico: {
      nombre: 'UTHGRA',
      afiliados: '~300.000',
      convenio: '389/04'
    },
    bancario: {
      nombre: 'Asociación Bancaria',
      afiliados: '~90.000',
      convenio: '18/75'
    },
    transporte: {
      nombre: 'UTA / Camioneros',
      afiliados: '~200.000',
      convenio: '40/89'
    },
    salud: {
      nombre: 'FATSA',
      afiliados: '~150.000',
      convenio: '122/75'
    },
    educacion: {
      nombre: 'CTERA / UDA',
      afiliados: '~350.000',
      convenio: 'Paritaria Nacional'
    },
    informatica: {
      nombre: 'Sin sindicato mayoritario',
      afiliados: 'Baja sindicalización',
      convenio: 'Sin CCT específico'
    },
    otros: {
      nombre: 'Según actividad',
      afiliados: 'Variable',
      convenio: 'Variable'
    }
  };

  return sindicatos[sector] || sindicatos.otros;
}

/**
 * Simular impacto de desafiliación masiva
 */
export function simularDesafiliacion(porcentajeDesafiliacion) {
  // Simulación conceptual del impacto en poder de negociación
  // No es un cálculo exacto, solo ilustrativo

  const impactos = {
    10: 'Impacto menor en la capacidad de negociación',
    25: 'Reducción moderada de recursos y representatividad',
    50: 'Impacto significativo en el poder de negociación colectiva',
    75: 'Severa reducción de la capacidad de presión sindical'
  };

  if (porcentajeDesafiliacion <= 10) return impactos[10];
  if (porcentajeDesafiliacion <= 25) return impactos[25];
  if (porcentajeDesafiliacion <= 50) return impactos[50];
  return impactos[75];
}
