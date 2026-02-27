/**
 * Máscaras de input para formato argentino
 * - Números con separador de miles: 1.000.000
 * - Moneda: $ 1.000.000
 */

/**
 * Formatear número con separador de miles argentino (punto)
 * @param {number|string} value - Valor a formatear
 * @returns {string} Número formateado con puntos: 1.000.000
 */
function formatArgentineNumber(value) {
  if (!value && value !== 0) return '';

  const num = typeof value === 'string'
    ? parseInt(value.replace(/\D/g, ''), 10)
    : value;

  if (isNaN(num)) return '';

  // Formato argentino explícito: punto como separador de miles
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Parsear número formateado a valor numérico
 * @param {string} value - Valor formateado
 * @returns {number} Número
 */
function parseArgentineNumber(value) {
  if (!value) return 0;
  // Remover todo excepto dígitos
  const cleaned = value.toString().replace(/\D/g, '');
  return parseInt(cleaned, 10) || 0;
}

/**
 * Aplicar máscara de moneda argentina a un input
 * @param {HTMLInputElement} input - Input element
 */
function applyCurrencyMask(input) {
  // Guardar valor real en data attribute
  input.dataset.rawValue = input.value || '0';

  // Cambiar a tipo text para poder mostrar el formato
  input.type = 'text';
  input.inputMode = 'numeric';
  input.classList.add('input-currency');

  // Formatear valor inicial si existe
  if (input.value) {
    const raw = parseArgentineNumber(input.value);
    input.dataset.rawValue = raw;
    input.value = formatArgentineNumber(raw);
  }

  // Al escribir
  input.addEventListener('input', (e) => {
    const cursorPos = e.target.selectionStart;
    const oldLength = e.target.value.length;

    // Parsear y reformatear
    const raw = parseArgentineNumber(e.target.value);
    input.dataset.rawValue = raw;

    const formatted = formatArgentineNumber(raw);
    e.target.value = formatted;

    // Ajustar cursor
    const newLength = formatted.length;
    const diff = newLength - oldLength;
    const newPos = Math.max(0, cursorPos + diff);
    e.target.setSelectionRange(newPos, newPos);
  });

  // Al hacer focus, seleccionar todo
  input.addEventListener('focus', () => {
    setTimeout(() => input.select(), 0);
  });

  // Al perder focus, asegurar formato
  input.addEventListener('blur', () => {
    const raw = parseArgentineNumber(input.value);
    input.dataset.rawValue = raw;
    input.value = raw ? formatArgentineNumber(raw) : '';
  });
}

/**
 * Obtener valor real de un input con máscara
 * @param {HTMLInputElement} input - Input element
 * @returns {number} Valor numérico
 */
function getRawValue(input) {
  return parseInt(input.dataset.rawValue, 10) || 0;
}

/**
 * Inicializar máscaras en el formulario
 */
function initInputMasks() {
  // Inputs de salario/dinero
  const currencyInputs = document.querySelectorAll('#salario, #variables');

  currencyInputs.forEach(input => {
    if (input) {
      applyCurrencyMask(input);
    }
  });

  // Interceptar el submit del form para usar valores raw
  const form = document.getElementById('user-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      // Restaurar valores raw antes de enviar
      currencyInputs.forEach(input => {
        if (input && input.dataset.rawValue) {
          // Crear input hidden con valor real
          let hidden = form.querySelector(`input[name="${input.name}_raw"]`);
          if (!hidden) {
            hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.name = `${input.name}_raw`;
            form.appendChild(hidden);
          }
          hidden.value = input.dataset.rawValue;
        }
      });
    });
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInputMasks);
} else {
  initInputMasks();
}

// Exportar funciones para uso externo
export {
  formatArgentineNumber,
  parseArgentineNumber,
  applyCurrencyMask,
  getRawValue
};
