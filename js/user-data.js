/**
 * Manejo de datos del usuario
 * Los datos se guardan solo en memoria/localStorage del navegador
 */

import { nextStep } from './wizard.js';
import { formatArgentineNumber } from './input-masks.js';

let userData = null;
let onChangeCallback = null;

/**
 * Inicializar el módulo de datos de usuario
 */
export function initUserData(onChange) {
  onChangeCallback = onChange;

  const form = document.getElementById('user-form');
  const skipButton = document.getElementById('skip-form');
  const resetButton = document.getElementById('reset-form');

  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  if (skipButton) {
    skipButton.addEventListener('click', handleSkip);
  }

  if (resetButton) {
    resetButton.addEventListener('click', handleReset);
  }

  // Intentar recuperar datos guardados
  loadSavedData();
}

/**
 * Obtener valor de input (soporta máscaras)
 */
function getInputValue(name) {
  const input = document.querySelector(`[name="${name}"]`);
  if (!input) return 0;

  // Si tiene máscara, usar valor raw
  if (input.dataset.rawValue !== undefined) {
    return parseInt(input.dataset.rawValue, 10) || 0;
  }

  // Sino, parsear normalmente
  return parseInt(input.value.replace(/\D/g, ''), 10) || 0;
}

/**
 * Manejar envío del formulario
 */
function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  userData = {
    nombre: formData.get('nombre') || '',
    sector: formData.get('sector') || 'otros',
    antiguedad: parseInt(formData.get('antiguedad')) || 0,
    salario: getInputValue('salario'),
    variables: getInputValue('variables'),
    horas: parseInt(formData.get('horas')) || 8,
    tipoEmpresa: formData.get('tipo-empresa') || 'nosabe',
    afiliado: formData.get('afiliado') === 'on',
    convenio: formData.get('convenio') === 'on',
    isExample: false  // Datos ingresados por el usuario
  };

  // Validar datos mínimos
  if (!userData.salario || userData.salario < 1) {
    showError('salario', 'Ingresá tu salario para personalizar la información');
    return;
  }

  // Guardar en localStorage
  saveData();

  // Notificar cambio
  if (onChangeCallback) {
    onChangeCallback(userData);
  }

  // Scroll a siguiente sección
  scrollToNextSection();

  // Feedback visual
  showSuccessMessage();
}

/**
 * Manejar skip del formulario
 */
function handleSkip() {
  // Limpiar datos guardados
  clearUserData();

  // Usar valores por defecto (ejemplo realista clase media trabajadora)
  userData = {
    nombre: '',
    sector: 'comercio',
    antiguedad: 8,
    salario: 1200000,
    variables: 0,
    horas: 9,
    tipoEmpresa: 'pyme',
    afiliado: true,
    convenio: true,
    isExample: true  // Marca que son datos de ejemplo
  };

  // Ocultar botón reset
  updateResetButtonVisibility(false);

  if (onChangeCallback) {
    onChangeCallback(userData);
  }

  scrollToNextSection();
}

/**
 * Manejar reset de datos
 */
function handleReset() {
  // Limpiar datos
  clearUserData();

  // Limpiar formulario
  const form = document.getElementById('user-form');
  if (form) {
    form.reset();
    form.classList.remove('submitted');

    // Limpiar valores raw de máscaras
    const maskedInputs = form.querySelectorAll('[data-raw-value]');
    maskedInputs.forEach(input => {
      delete input.dataset.rawValue;
    });
  }

  // Ocultar botón reset
  updateResetButtonVisibility(false);

  // Feedback
  const resetBtn = document.getElementById('reset-form');
  if (resetBtn) {
    const originalText = resetBtn.innerHTML;
    resetBtn.innerHTML = '✓ Datos borrados';
    resetBtn.disabled = true;
    setTimeout(() => {
      resetBtn.innerHTML = originalText;
      resetBtn.disabled = false;
    }, 2000);
  }
}

/**
 * Mostrar/ocultar botón de reset según si hay datos guardados
 */
function updateResetButtonVisibility(hasData) {
  const resetButton = document.getElementById('reset-form');
  if (resetButton) {
    resetButton.hidden = !hasData;
  }
}

/**
 * Obtener datos del usuario
 */
export function getUserData() {
  return userData;
}

/**
 * Verificar si hay datos del usuario
 */
export function hasUserData() {
  return userData !== null && userData.salario > 0;
}

/**
 * Guardar datos en localStorage
 */
function saveData() {
  try {
    localStorage.setItem('reforma_laboral_user', JSON.stringify(userData));
  } catch (e) {
    console.warn('No se pudo guardar en localStorage:', e);
  }
}

/**
 * Cargar datos guardados
 */
function loadSavedData() {
  try {
    const saved = localStorage.getItem('reforma_laboral_user');
    if (saved) {
      userData = JSON.parse(saved);

      // Rellenar formulario con datos guardados
      fillFormWithData(userData);

      // Mostrar botón de reset
      updateResetButtonVisibility(true);

      // Notificar
      if (onChangeCallback) {
        onChangeCallback(userData);
      }
    }
  } catch (e) {
    console.warn('No se pudo cargar desde localStorage:', e);
  }
}

/**
 * Rellenar formulario con datos guardados
 */
function fillFormWithData(data) {
  const form = document.getElementById('user-form');
  if (!form) return;

  if (data.nombre) form.querySelector('#nombre').value = data.nombre;
  if (data.sector) form.querySelector('#sector').value = data.sector;
  if (data.antiguedad) form.querySelector('#antiguedad').value = data.antiguedad;

  // Para salario y variables, aplicar formato con máscara
  if (data.salario) {
    const salarioInput = form.querySelector('#salario');
    if (salarioInput) {
      salarioInput.value = formatArgentineNumber(data.salario);
      salarioInput.dataset.rawValue = data.salario;
    }
  }
  if (data.variables) {
    const variablesInput = form.querySelector('#variables');
    if (variablesInput) {
      variablesInput.value = formatArgentineNumber(data.variables);
      variablesInput.dataset.rawValue = data.variables;
    }
  }

  if (data.horas) form.querySelector('#horas').value = data.horas;
  if (data.tipoEmpresa) form.querySelector('#tipo-empresa').value = data.tipoEmpresa;
  if (data.afiliado) form.querySelector('#afiliado').checked = data.afiliado;
  if (data.convenio) form.querySelector('#convenio').checked = data.convenio;
}

/**
 * Mostrar error en un campo
 */
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  const group = field.closest('.form-group');
  if (group) {
    group.classList.add('error');

    // Remover mensaje anterior si existe
    const existing = group.querySelector('.error-message');
    if (existing) existing.remove();

    // Agregar nuevo mensaje
    const errorEl = document.createElement('span');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    group.appendChild(errorEl);

    // Focus en el campo
    field.focus();

    // Remover error después de un tiempo o cuando el usuario escriba
    field.addEventListener('input', () => {
      group.classList.remove('error');
      const msg = group.querySelector('.error-message');
      if (msg) msg.remove();
    }, { once: true });
  }
}

/**
 * Mostrar mensaje de éxito
 */
function showSuccessMessage() {
  const form = document.getElementById('user-form');
  if (!form) return;

  // Agregar clase de éxito
  form.classList.add('submitted');

  // Mostrar mensaje
  const message = document.createElement('div');
  message.className = 'form-success';
  message.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <span>¡Listo! La información está personalizada para vos.</span>
  `;

  form.insertBefore(message, form.firstChild);

  // Remover después de un tiempo
  setTimeout(() => {
    message.classList.add('fade-out');
    setTimeout(() => message.remove(), 300);
  }, 3000);
}

/**
 * Avanzar a la siguiente sección usando el wizard
 */
function scrollToNextSection() {
  nextStep();
}

/**
 * Limpiar datos del usuario
 */
export function clearUserData() {
  userData = null;
  try {
    localStorage.removeItem('reforma_laboral_user');
  } catch (e) {
    console.warn('No se pudo limpiar localStorage:', e);
  }
}
