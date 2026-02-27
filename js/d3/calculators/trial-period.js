/**
 * Calculadora de período de prueba
 * Muestra el cambio de 3 a 6 meses
 */

/**
 * Verificar estado del período de prueba
 * @param {number} antiguedadMeses - Antigüedad en meses
 * @returns {object} Estado del período de prueba
 */
export function verificarPeriodoPrueba(antiguedadMeses) {
  const PERIODO_ANTES = 3;  // meses
  const PERIODO_DESPUES = 6; // meses

  // Convertir antigüedad en años a meses si es necesario
  const meses = antiguedadMeses;

  if (meses >= PERIODO_DESPUES) {
    return {
      enPeriodoPrueba: false,
      mensaje: `Ya pasaste el período de prueba (tenés más de ${PERIODO_DESPUES} meses).`,
      mesesRestantes: 0,
      impacto: 'ninguno'
    };
  } else if (meses >= PERIODO_ANTES && meses < PERIODO_DESPUES) {
    return {
      enPeriodoPrueba: true,
      mensaje: `Con la ley anterior, ya habrías salido del período de prueba. Con la nueva ley, todavía te quedan ${PERIODO_DESPUES - meses} meses.`,
      mesesRestantes: PERIODO_DESPUES - meses,
      impacto: 'afectado'
    };
  } else {
    return {
      enPeriodoPrueba: true,
      mensaje: `Estás en período de prueba. Te quedan ${PERIODO_DESPUES - meses} meses hasta que se confirme tu puesto.`,
      mesesRestantes: PERIODO_DESPUES - meses,
      impacto: 'en_prueba'
    };
  }
}

/**
 * Actualizar visualización de período de prueba
 */
export function updateTrialPeriod({ antiguedad }) {
  // Convertir años a meses
  const antiguedadMeses = antiguedad * 12;

  const resultado = verificarPeriodoPrueba(antiguedadMeses);

  // Esta función se puede expandir para actualizar el DOM
  // Por ahora solo retorna el resultado
  return resultado;
}

/**
 * Obtener implicaciones del período de prueba
 */
export function getImplicaciones() {
  return {
    despido: {
      titulo: 'Despido sin causa',
      descripcion: 'Durante el período de prueba, te pueden despedir sin dar explicaciones y sin pagar indemnización.',
    },
    preaviso: {
      titulo: 'Sin preaviso',
      descripcion: 'No tienen obligación de avisarte con anticipación.',
    },
    registracion: {
      titulo: 'Registración obligatoria',
      descripcion: 'Aunque estés en período de prueba, el empleador tiene que registrarte desde el día 1.',
    },
    aportes: {
      titulo: 'Aportes completos',
      descripcion: 'Tenés derecho a todos los aportes jubilatorios y de obra social.',
    },
    recontratacion: {
      titulo: 'Solo una vez',
      descripcion: 'El mismo empleador no puede contratarte dos veces usando el período de prueba.',
    }
  };
}

/**
 * Comparar sistemas
 */
export function compararSistemas() {
  return {
    antes: {
      duracion: '3 meses',
      caracteristicas: [
        'Despido sin causa permitido',
        'Sin indemnización',
        'Derechos laborales básicos',
        'Una sola vez por empleador'
      ]
    },
    despues: {
      duracion: '6 meses',
      caracteristicas: [
        'Despido sin causa permitido',
        'Sin indemnización',
        'Derechos laborales básicos',
        'Una sola vez por empleador',
        'Doble de tiempo de incertidumbre'
      ]
    },
    cambio: {
      descripcion: 'El período se duplica de 3 a 6 meses',
      impacto: 'Mayor tiempo de incertidumbre laboral para trabajadores nuevos'
    }
  };
}
