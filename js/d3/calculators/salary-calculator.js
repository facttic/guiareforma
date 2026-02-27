/**
 * Calculadora de indemnización por despido
 * Compara el cálculo ANTES vs DESPUÉS de la reforma
 *
 * ANTES (Art. 245 original):
 * - Base: mejor remuneración mensual, normal y habitual
 * - Incluía: básico + adicionales + proporcional aguinaldo/vacaciones + premios
 * - Tope: 3x salario convenio (pero en la práctica era más flexible)
 *
 * DESPUÉS (Art. 51 reforma):
 * - Base: solo conceptos MENSUALES devengados al menos 6 meses en el último año
 * - EXCLUYE: aguinaldo (SAC), vacaciones, premios no mensuales
 * - Tope: 3x salario promedio del CCT (más estricto)
 * - Piso: 67% de la remuneración o 1 mes de sueldo (lo que sea mayor)
 * - Comisiones/horas extra: SÍ cuentan si son mensuales y habituales (6+ meses)
 *   Se usa el promedio de últimos 6 o 12 meses, el más favorable
 *
 * EFECTO LIBERATORIO:
 * - Al cobrar, se extingue todo derecho a reclamo (salvo delitos penales)
 *
 * APLICACIÓN TEMPORAL:
 * - Se aplica a despidos posteriores a la vigencia, sin importar fecha de contratación
 */

// Conceptos que se incluían ANTES y ahora NO:
// - SAC proporcional: ~8.33% (1/12 del sueldo)
// - Vacaciones proporcionales: varía según antigüedad
// - Premios no mensuales, gratificaciones, etc.
const FACTOR_SAC = 0.0833; // 8.33% del aguinaldo proporcional
const FACTOR_OTROS = 0.03; // ~3% otros conceptos no mensuales (premios, etc.)

// Días por mes para calcular valor del día (según LCT)
const DIAS_MES = 25;

/**
 * Calcular días de vacaciones según antigüedad (Art. 150 LCT)
 */
function getDiasVacaciones(antiguedad) {
  if (antiguedad > 20) return 35;
  if (antiguedad > 10) return 28;
  if (antiguedad > 5) return 21;
  return 14;
}

/**
 * Calcular factor de vacaciones proporcional según antigüedad
 * Se calcula como: días de vacaciones / 365 días del año
 */
function getFactorVacaciones(antiguedad) {
  const dias = getDiasVacaciones(antiguedad);
  return dias / 365;
}

/**
 * Calcular indemnización según la ley ANTERIOR
 *
 * ANTES se usaba la "mejor remuneración mensual, normal y habitual"
 * que incluía: básico + extras + proporcional SAC + proporcional vacaciones + premios
 */
function calcularIndemnizacionAntes(salarioBasico, variablesMensuales, antiguedad, vacacionesAcumuladas = 0) {
  const anios = Math.max(antiguedad, 1);

  // Salario base + variables
  const salarioMensual = salarioBasico + variablesMensuales;

  // ANTES se sumaban proporcionales a la base:
  // - SAC proporcional (8.33%)
  // - Vacaciones proporcionales (varía según antigüedad: 3.8% a 9.6%)
  // - Premios y gratificaciones no mensuales (~3%)
  const proporcionalSAC = salarioMensual * FACTOR_SAC;
  const factorVacaciones = getFactorVacaciones(antiguedad);
  const diasVacaciones = getDiasVacaciones(antiguedad);
  const proporcionalVacaciones = salarioMensual * factorVacaciones;
  const proporcionalOtros = salarioMensual * FACTOR_OTROS;

  const baseCompleta = salarioMensual + proporcionalSAC + proporcionalVacaciones + proporcionalOtros;

  // Indemnización: 1 mes por año sobre la base completa
  const indemnizacionBase = baseCompleta * anios;

  return {
    indemnizacionBase,
    total: indemnizacionBase,
    salarioUsado: baseCompleta,
    salarioMensual,
    detalle: {
      basico: salarioBasico,
      variables: variablesMensuales,
      proporcionalSAC,
      proporcionalVacaciones,
      proporcionalOtros,
      diasVacaciones,
      factorVacaciones
    }
  };
}

/**
 * Calcular indemnización según la ley NUEVA (Art. 51)
 *
 * AHORA solo se usa: básico + variables MENSUALES HABITUALES (6+ meses)
 * NO se incluye: SAC, vacaciones, premios no mensuales
 */
function calcularIndemnizacionDespues(salarioBasico, variablesMensuales, antiguedad, salarioPromedioCCT, vacacionesAcumuladas = 0) {
  const anios = Math.max(antiguedad, 1);

  // Base: solo salario mensual (sin proporcionales de SAC/vacaciones/otros)
  const salarioMensual = salarioBasico + variablesMensuales;
  let baseCalculo = salarioMensual;

  // Aplicar tope del convenio (3x promedio)
  const tope = salarioPromedioCCT * 3;
  let topeAplicado = false;

  if (baseCalculo > tope) {
    baseCalculo = tope;
    topeAplicado = true;
  }

  // Calcular indemnización base
  let indemnizacionBase = baseCalculo * anios;

  // Verificar piso del 67%
  const minimo67 = salarioMensual * 0.67 * anios;
  let pisoAplicado = false;
  let tipoPiso = null;

  if (indemnizacionBase < minimo67) {
    indemnizacionBase = minimo67;
    pisoAplicado = true;
    tipoPiso = '67%';
  }

  // Mínimo absoluto: 1 mes de sueldo
  if (indemnizacionBase < salarioMensual) {
    indemnizacionBase = salarioMensual;
    pisoAplicado = true;
    tipoPiso = '1 mes';
  }

  const factorVacaciones = getFactorVacaciones(antiguedad);
  const diasVacaciones = getDiasVacaciones(antiguedad);

  return {
    indemnizacionBase,
    total: indemnizacionBase,
    baseUsada: baseCalculo,
    topeAplicado,
    tope,
    pisoAplicado,
    tipoPiso,
    salarioMensual,
    // Lo que se perdió respecto a antes:
    conceptosExcluidos: {
      sac: salarioMensual * FACTOR_SAC,
      vacaciones: salarioMensual * factorVacaciones,
      otros: salarioMensual * FACTOR_OTROS
    },
    diasVacaciones,
    factorVacaciones
  };
}

/**
 * Actualizar la visualización de la calculadora
 */
export function updateIndemnizacion({
  salario,
  variables = 0,
  antiguedad,
  salarioPromedioCCT,
  tipoEmpresa = 'nosabe',
  sectorData = null,
  isExample = false
}) {
  const container = document.querySelector('#calc-indemnizacion');
  if (!container) return;

  const personalizada = container.querySelector('.calc-personalizada');
  if (!personalizada) return;

  personalizada.hidden = false;

  // Calcular ambos escenarios
  const resultadoAntes = calcularIndemnizacionAntes(salario, variables, antiguedad, 0);
  const resultadoDespues = calcularIndemnizacionDespues(salario, variables, antiguedad, salarioPromedioCCT, 0);

  const indemAntes = resultadoAntes.indemnizacionBase;
  const indemDespues = resultadoDespues.indemnizacionBase;

  // Calcular diferencia
  const diferencia = indemAntes - indemDespues;
  const porcentaje = indemAntes > 0 ? ((diferencia / indemAntes) * 100).toFixed(1) : 0;
  const sueldosDiferencia = (diferencia / salario).toFixed(1);

  // Calcular tope del convenio
  const topeConvenio = salarioPromedioCCT * 3;

  // Limpiar contenido anterior
  personalizada.innerHTML = `<h4>Tu indemnización, <span class="user-name">trabajador</span></h4>`;

  let html = '';

  // === INFO BOX CON VALORES DE REFERENCIA ===
  const sectorNombre = sectorData ? sectorData.nombre : 'General';
  html += `<div class="calc-referencia-box ${isExample ? 'ejemplo' : 'personal'}">`;
  if (isExample) {
    html += '<div class="referencia-titulo">📋 Valores de ejemplo</div>';
    html += '<div class="referencia-detalle">';
    html += `Salario: <strong>${formatCurrency(salario)}</strong> · `;
    html += `Antigüedad: <strong>${antiguedad} años</strong> · `;
    html += `Sector: <strong>${sectorNombre}</strong>`;
    html += '</div>';
    html += '<div class="referencia-nota">Completá el formulario para ver tu situación real.</div>';
  } else {
    html += '<div class="referencia-titulo">📊 Tus datos</div>';
    html += '<div class="referencia-detalle">';
    html += `Salario: <strong>${formatCurrency(salario)}</strong>`;
    if (variables > 0) {
      html += ` + ${formatCurrency(variables)} variables`;
    }
    html += ` · Antigüedad: <strong>${antiguedad} años</strong> · `;
    html += `Sector: <strong>${sectorNombre}</strong>`;
    html += '</div>';
  }
  html += '</div>';

  // === INFO DEL CONVENIO (simplificada) ===
  if (sectorData) {
    html += '<div class="calc-convenio">';
    html += `<div class="convenio-header">Sector: <strong>${sectorData.nombre}</strong> (${sectorData.convenio})</div>`;
    html += '<div class="convenio-datos">';
    html += `<div class="convenio-dato">`;
    html += `<span class="dato-label">Sindicato:</span>`;
    html += `<span class="dato-valor">${sectorData.sindicato}</span>`;
    html += `</div>`;
    html += `<div class="convenio-dato convenio-tope">`;
    html += `<span class="dato-label">Tope para indemnización:</span>`;
    html += `<span class="dato-valor">${formatCurrency(topeConvenio)}</span>`;
    html += `<button type="button" class="tope-ayuda" aria-label="¿Qué es el tope?" title="¿Qué es el tope?">?</button>`;
    html += `</div>`;
    html += '</div>';

    // Tooltip de ayuda del tope
    html += `<div class="convenio-tooltip" hidden>`;
    html += `<p>El <strong>tope</strong> es el máximo que pueden usar para calcular tu indemnización.</p>`;
    html += `<p>Se calcula como 3 veces el sueldo promedio del convenio de tu sector.</p>`;
    html += `<p><strong>Ejemplo:</strong> Si el promedio es $500.000, el tope es $1.500.000. Aunque ganes más, tu indemnización se calcula sobre ese máximo.</p>`;
    html += `</div>`;

    // Mostrar alerta si el sueldo supera el tope
    if (salario > topeConvenio) {
      html += `<div class="convenio-alerta">`;
      html += `Tu sueldo (${formatCurrency(salario)}) supera el tope del convenio. En el cálculo se usará el tope.`;
      html += `</div>`;
    }

    html += '</div>';
  }

  // === EXPLICACIÓN INICIAL ===
  html += '<div class="calc-intro">';
  html += '<p>La indemnización por despido se calcula así: <strong>1 sueldo por cada año trabajado</strong>. ';
  html += 'Lo que cambia es <em>qué se considera "sueldo"</em> para ese cálculo.</p>';
  html += '</div>';

  html += '<div class="calc-comparacion">';

  // === COLUMNA ANTES ===
  html += '<div class="calc-columna calc-antes">';
  html += '<div class="calc-etiqueta">Ley anterior</div>';
  html += `<div class="calc-monto">${formatCurrency(indemAntes)}</div>`;
  // Calcular porcentaje de vacaciones para mostrar
  const pctVacaciones = (resultadoAntes.detalle.factorVacaciones * 100).toFixed(1);
  const diasVac = resultadoAntes.detalle.diasVacaciones;

  html += '<div class="calc-desglose">';
  html += '<div class="desglose-titulo">¿Cómo se calcula?</div>';
  html += `<div class="desglose-linea"><span class="desglose-concepto">Tu sueldo base</span><span class="desglose-valor">${formatCurrency(salario)}</span></div>`;
  if (variables > 0) {
    html += `<div class="desglose-linea"><span class="desglose-concepto">+ Variables (comisiones, etc.)</span><span class="desglose-valor">+${formatCurrency(variables)}</span></div>`;
  }
  html += `<div class="desglose-linea"><span class="desglose-concepto">+ Aguinaldo (8.3%)</span><span class="desglose-valor">+${formatCurrency(resultadoAntes.detalle.proporcionalSAC)}</span></div>`;
  html += `<div class="desglose-linea"><span class="desglose-concepto">+ Vacaciones (${diasVac} días = ${pctVacaciones}%)</span><span class="desglose-valor">+${formatCurrency(resultadoAntes.detalle.proporcionalVacaciones)}</span></div>`;
  html += `<div class="desglose-linea"><span class="desglose-concepto">+ Premios y extras (~3%)</span><span class="desglose-valor">+${formatCurrency(resultadoAntes.detalle.proporcionalOtros)}</span></div>`;
  html += `<div class="desglose-linea desglose-total"><span class="desglose-concepto">= Base mensual</span><span class="desglose-valor">${formatCurrency(resultadoAntes.salarioUsado)}</span></div>`;
  html += `<div class="desglose-formula">× ${antiguedad} ${antiguedad === 1 ? 'año' : 'años'} = <strong>${formatCurrency(indemAntes)}</strong></div>`;
  html += '</div>';
  html += '</div>';

  // === FLECHA ===
  html += '<div class="calc-flecha">→</div>';

  // === COLUMNA AHORA ===
  html += '<div class="calc-columna calc-ahora">';
  html += '<div class="calc-etiqueta">Ley nueva</div>';
  html += `<div class="calc-monto">${formatCurrency(indemDespues)}</div>`;
  html += '<div class="calc-desglose">';
  html += '<div class="desglose-titulo">¿Cómo se calcula?</div>';
  html += `<div class="desglose-linea"><span class="desglose-concepto">Tu sueldo base</span><span class="desglose-valor">${formatCurrency(salario)}</span></div>`;
  if (variables > 0) {
    html += `<div class="desglose-linea"><span class="desglose-concepto">+ Variables (comisiones, etc.)</span><span class="desglose-valor">+${formatCurrency(variables)}</span></div>`;
  }
  html += `<div class="desglose-linea desglose-tachado"><span class="desglose-concepto">Aguinaldo (8.3%)</span><span class="desglose-valor">No cuenta</span></div>`;
  html += `<div class="desglose-linea desglose-tachado"><span class="desglose-concepto">Vacaciones (${diasVac} días)</span><span class="desglose-valor">No cuenta</span></div>`;
  html += `<div class="desglose-linea desglose-tachado"><span class="desglose-concepto">Premios no mensuales</span><span class="desglose-valor">No cuenta</span></div>`;
  html += `<div class="desglose-linea desglose-total"><span class="desglose-concepto">= Base mensual</span><span class="desglose-valor">${formatCurrency(resultadoDespues.baseUsada)}</span></div>`;

  // Mostrar si se aplicó tope
  if (resultadoDespues.topeAplicado) {
    html += `<div class="desglose-alerta">`;
    html += `<strong>Se aplicó el tope:</strong> Tu sueldo supera el límite del convenio (${formatCurrency(resultadoDespues.tope)}), así que se usa ese límite en vez de tu sueldo real.`;
    html += `</div>`;
  }

  // Mostrar si se aplicó piso
  if (resultadoDespues.pisoAplicado) {
    html += `<div class="desglose-ok">`;
    html += `<strong>Se aplicó el piso:</strong> La ley garantiza un mínimo del 67% de tu sueldo.`;
    html += `</div>`;
  }

  html += `<div class="desglose-formula">× ${antiguedad} ${antiguedad === 1 ? 'año' : 'años'} = <strong>${formatCurrency(indemDespues)}</strong></div>`;
  html += '</div>';
  html += '</div>';

  html += '</div>'; // fin calc-comparacion

  // === DIFERENCIA ===
  html += '<div class="calc-diferencia-box">';
  if (diferencia > 0) {
    html += `<div class="diferencia-grande">`;
    html += `<span class="diferencia-label">Perdés:</span> `;
    html += `<span class="diferencia-valor negativo">${formatCurrency(diferencia)}</span>`;
    html += `</div>`;
    html += `<div class="diferencia-detalle">`;
    html += `Eso equivale a <strong>${sueldosDiferencia} sueldos menos</strong> (${porcentaje}% de pérdida)`;
    html += `</div>`;
  } else {
    html += `<span class="diferencia-label">Sin diferencia en tu caso</span>`;
  }
  html += '</div>';

  // === CUOTAS (si aplica FAL) ===
  const cuotaMensual = indemDespues / 12;
  html += '<div class="calc-cuotas-box">';
  html += '<div class="cuotas-titulo">Si te pagan en 12 cuotas (FAL)</div>';
  html += '<div class="cuotas-contenido">';
  html += `<div class="cuota-monto">${formatCurrency(cuotaMensual)} <span class="cuota-periodo">por mes</span></div>`;
  html += `<div class="cuota-detalle">`;
  html += `En vez de recibir ${formatCurrency(indemDespues)} de una vez, recibirías ${formatCurrency(cuotaMensual)} durante 12 meses.`;
  html += `</div>`;
  html += `<div class="cuota-alerta">`;
  html += `Mientras tanto, tenés que buscar trabajo y pagar tus gastos con esa cuota mensual.`;
  html += `</div>`;
  html += '</div>';
  html += '</div>';

  html += '<div class="calc-disclaimer">Cálculo estimativo basado en los datos que ingresaste. Para un cálculo exacto consultá con tu sindicato o abogado laboralista.</div>';

  personalizada.innerHTML += html;

  // Event listener para el botón de ayuda del tope
  const btnAyuda = personalizada.querySelector('.tope-ayuda');
  const tooltip = personalizada.querySelector('.convenio-tooltip');
  if (btnAyuda && tooltip) {
    btnAyuda.addEventListener('click', (e) => {
      e.preventDefault();
      tooltip.hidden = !tooltip.hidden;
    });
  }
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
 * Obtener desglose detallado del cálculo
 */
export function getCalculoDetallado(salario, variables, antiguedad, salarioPromedioCCT, vacacionesAcumuladas = 0) {
  const antes = calcularIndemnizacionAntes(salario, variables, antiguedad, vacacionesAcumuladas);
  const despues = calcularIndemnizacionDespues(salario, variables, antiguedad, salarioPromedioCCT, vacacionesAcumuladas);

  return {
    antes: {
      indemnizacion: antes.indemnizacionBase,
      vacaciones: antes.vacacionesPago,
      total: antes.total,
      salarioUsado: antes.salarioUsado
    },
    despues: {
      indemnizacion: despues.indemnizacionBase,
      vacaciones: despues.vacacionesPago,
      total: despues.total,
      baseUsada: despues.baseUsada,
      topeAplicado: despues.topeAplicado,
      pisoAplicado: despues.pisoAplicado
    },
    diferencia: antes.total - despues.total,
    porcentaje: antes.total > 0 ? ((antes.total - despues.total) / antes.total * 100) : 0
  };
}
