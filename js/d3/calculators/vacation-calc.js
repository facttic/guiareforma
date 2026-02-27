/**
 * Calculadora de vacaciones
 * Muestra los días de vacaciones según antigüedad
 */

/**
 * Calcular días de vacaciones según la LCT
 * @param {number} antiguedad - Años de antigüedad
 * @returns {object} { dias, categoria }
 */
export function calcularVacaciones(antiguedad) {
  // Art. 150 LCT - Licencia anual ordinaria
  // Esto NO cambió con la reforma, pero lo incluimos como referencia

  if (antiguedad < 0.5) {
    // Menos de 6 meses: 1 día por cada 20 trabajados
    return {
      dias: Math.floor(antiguedad * 12 * 1.5), // aproximación
      categoria: 'proporcional',
      descripcion: '1 día por cada 20 trabajados'
    };
  } else if (antiguedad < 5) {
    return {
      dias: 14,
      categoria: 'hasta5',
      descripcion: 'Hasta 5 años de antigüedad'
    };
  } else if (antiguedad < 10) {
    return {
      dias: 21,
      categoria: 'hasta10',
      descripcion: 'Más de 5 y hasta 10 años'
    };
  } else if (antiguedad < 20) {
    return {
      dias: 28,
      categoria: 'hasta20',
      descripcion: 'Más de 10 y hasta 20 años'
    };
  } else {
    return {
      dias: 35,
      categoria: 'mas20',
      descripcion: 'Más de 20 años de antigüedad'
    };
  }
}

/**
 * Actualizar visualización de vacaciones
 */
export function updateVacaciones({ antiguedad, vacacionesActuales }) {
  const resultado = calcularVacaciones(antiguedad);

  // Verificar si coincide con lo ingresado
  const diferencia = vacacionesActuales - resultado.dias;

  return {
    ...resultado,
    ingresado: vacacionesActuales,
    diferencia,
    mensaje: diferencia !== 0
      ? `Según la ley te corresponden ${resultado.dias} días, pero indicaste ${vacacionesActuales}.`
      : `Correcto: te corresponden ${resultado.dias} días.`
  };
}

/**
 * Obtener escala completa de vacaciones
 */
export function getEscalaVacaciones() {
  return [
    { antiguedad: '6 meses a 5 años', dias: 14 },
    { antiguedad: '5 a 10 años', dias: 21 },
    { antiguedad: '10 a 20 años', dias: 28 },
    { antiguedad: 'Más de 20 años', dias: 35 }
  ];
}

/**
 * Calcular vacaciones no gozadas (para indemnización)
 */
export function calcularVacacionesNoGozadas(salario, diasNoGozados) {
  // El salario diario se calcula dividiendo el mensual por 25
  const salarioDiario = salario / 25;
  return salarioDiario * diasNoGozados;
}

/**
 * Proyectar próximo aumento de vacaciones
 */
export function proximoAumento(antiguedad) {
  if (antiguedad < 5) {
    return {
      enAnios: 5 - antiguedad,
      diasActuales: 14,
      diasFuturos: 21,
      aumento: 7
    };
  } else if (antiguedad < 10) {
    return {
      enAnios: 10 - antiguedad,
      diasActuales: 21,
      diasFuturos: 28,
      aumento: 7
    };
  } else if (antiguedad < 20) {
    return {
      enAnios: 20 - antiguedad,
      diasActuales: 28,
      diasFuturos: 35,
      aumento: 7
    };
  } else {
    return {
      enAnios: null,
      diasActuales: 35,
      diasFuturos: 35,
      aumento: 0,
      mensaje: 'Ya tenés el máximo de días de vacaciones'
    };
  }
}
