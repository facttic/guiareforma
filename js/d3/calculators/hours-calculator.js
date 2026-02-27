/**
 * Calculadora de banco de horas
 * Muestra la diferencia entre pago de horas extra vs compensación con tiempo libre
 */

/**
 * Calcular valor hora
 * @param {number} salarioMensual - Salario mensual bruto
 * @param {number} horasDiarias - Horas de trabajo diarias
 * @returns {number} Valor de la hora
 */
function calcularValorHora(salarioMensual, horasDiarias = 8) {
  // Días laborables promedio por mes: ~21.75
  const diasLaborables = 21.75;
  const horasMensuales = horasDiarias * diasLaborables;

  return salarioMensual / horasMensuales;
}

/**
 * Calcular pago de horas extra (sistema anterior)
 * @param {number} valorHora - Valor de la hora normal
 * @param {number} horasExtra - Cantidad de horas extra
 * @param {boolean} esFeriado - Si es feriado o fin de semana
 * @returns {number} Monto a pagar por horas extra
 */
function calcularHorasExtraAntes(valorHora, horasExtra, esFeriado = false) {
  // Antes: 50% adicional días hábiles, 100% adicional feriados/fines de semana
  const recargo = esFeriado ? 2 : 1.5; // 100% o 50% adicional
  return valorHora * recargo * horasExtra;
}

/**
 * Calcular compensación en banco de horas (sistema nuevo)
 * @param {number} horasExtra - Horas extra trabajadas
 * @returns {object} { horasCompensacion, explicacion }
 */
function calcularBancoHoras(horasExtra) {
  // Con banco de horas: se compensan hora por hora
  // No hay recargo monetario, se da tiempo libre equivalente
  return {
    horasCompensacion: horasExtra,
    explicacion: `${horasExtra} horas de tiempo libre`
  };
}

/**
 * Actualizar la visualización de banco de horas
 */
export function updateBancoHoras({ horasDiarias, salario }) {
  const container = document.querySelector('#calc-horas');
  if (!container) return;

  const personalizada = container.querySelector('.calc-personalizada');
  if (!personalizada) return;

  // Mostrar sección
  personalizada.hidden = false;

  // Ejemplo: semana con 5 horas extra
  const horasExtra = 5;
  const horasSemana = (horasDiarias * 5) + horasExtra;

  const valorHora = calcularValorHora(salario, horasDiarias);
  const pagoAntes = calcularHorasExtraAntes(valorHora, horasExtra, false);
  const bancoHoras = calcularBancoHoras(horasExtra);

  // Actualizar DOM
  const elHorasSemana = document.getElementById('horas-semana');
  const elPagoAntes = document.getElementById('horas-pago-antes');
  const elCompensacion = document.getElementById('horas-compensacion');

  if (elHorasSemana) {
    elHorasSemana.textContent = horasSemana;
  }

  if (elPagoAntes) {
    elPagoAntes.textContent = formatCurrency(pagoAntes) + ' extra';
  }

  if (elCompensacion) {
    elCompensacion.textContent = bancoHoras.explicacion;
  }

  // Agregar explicación adicional
  let explicacion = container.querySelector('.calc-explicacion');
  if (!explicacion) {
    explicacion = document.createElement('div');
    explicacion.className = 'calc-explicacion';
    personalizada.appendChild(explicacion);
  }

  explicacion.innerHTML = `
    <p class="calc-nota">
      <strong>¿Qué significa?</strong><br>
      Antes, esas ${horasExtra} horas extra te las pagaban con 50% de recargo (${formatCurrency(pagoAntes)}).
      <br>
      Ahora, tu empleador puede optar por compensarlas con ${horasExtra} horas libres otro día, sin pagarte el recargo. <strong>Él decide cuándo te las das.</strong>
    </p>
    <p class="calc-nota warning">
      <strong>Ojo:</strong> Según la ley, el banco de horas se pacta por convenio colectivo o acuerdo individual. Pero una vez pactado, el empleador administra los tiempos.
    </p>
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
 * Simular diferentes escenarios de banco de horas
 */
export function simularEscenarios(salarioMensual, horasDiarias) {
  const valorHora = calcularValorHora(salarioMensual, horasDiarias);

  const escenarios = [
    { horasExtra: 2, esFeriado: false },
    { horasExtra: 5, esFeriado: false },
    { horasExtra: 8, esFeriado: false },
    { horasExtra: 4, esFeriado: true },
  ];

  return escenarios.map(e => ({
    ...e,
    pagoAnterior: calcularHorasExtraAntes(valorHora, e.horasExtra, e.esFeriado),
    compensacionNueva: calcularBancoHoras(e.horasExtra),
    diferencia: calcularHorasExtraAntes(valorHora, e.horasExtra, e.esFeriado)
  }));
}

/**
 * Calcular impacto mensual estimado
 */
export function calcularImpactoMensual(salarioMensual, horasDiarias, horasExtraMensuales = 20) {
  const valorHora = calcularValorHora(salarioMensual, horasDiarias);

  // Asumiendo mix de horas en días hábiles y algunos feriados
  const horasHabiles = horasExtraMensuales * 0.8;
  const horasFeriados = horasExtraMensuales * 0.2;

  const pagoAntes = calcularHorasExtraAntes(valorHora, horasHabiles, false) +
                    calcularHorasExtraAntes(valorHora, horasFeriados, true);

  const compensacion = calcularBancoHoras(horasExtraMensuales);

  return {
    horasExtraMensuales,
    pagoAnterior: pagoAntes,
    compensacionNueva: compensacion,
    diferenciaMensual: pagoAntes,
    diferenciaAnual: pagoAntes * 12
  };
}
