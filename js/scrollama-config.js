/**
 * Configuración de Scrollama para scrollytelling
 */

import scrollama from 'scrollama';

let scroller = null;
let onEnterCallback = null;
let onExitCallback = null;

/**
 * Inicializar Scrollama
 */
export function initScrollama(onEnter, onExit) {
  onEnterCallback = onEnter;
  onExitCallback = onExit;

  // Crear instancia de Scrollama
  scroller = scrollama();

  // Configurar
  scroller
    .setup({
      step: '.section',
      offset: 0.5, // Trigger cuando la sección está al 50% del viewport
      progress: true,
      debug: false
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
    .onStepProgress(handleStepProgress);

  // Resize handler
  window.addEventListener('resize', debounce(handleResize, 200));

  // Scroll progress indicator
  initScrollProgress();

  console.log('Scrollama inicializado');
}

/**
 * Handler cuando se entra a una sección
 */
function handleStepEnter(response) {
  const { element, direction, index } = response;

  // Marcar sección como activa
  document.querySelectorAll('.section').forEach(s => {
    s.setAttribute('data-active', 'false');
  });
  element.setAttribute('data-active', 'true');

  // Callback
  if (onEnterCallback) {
    onEnterCallback(element, direction, index);
  }

  // Analytics (si hubiera)
  trackSectionView(element.id);
}

/**
 * Handler cuando se sale de una sección
 */
function handleStepExit(response) {
  const { element, direction, index } = response;

  if (onExitCallback) {
    onExitCallback(element, direction, index);
  }
}

/**
 * Handler de progreso dentro de una sección
 */
function handleStepProgress(response) {
  const { element, progress } = response;

  // Opcional: usar el progreso para animaciones dentro de la sección
  element.style.setProperty('--scroll-progress', progress);
}

/**
 * Handler de resize
 */
function handleResize() {
  if (scroller) {
    scroller.resize();
  }
}

/**
 * Inicializar indicador de progreso de scroll
 */
function initScrollProgress() {
  // Crear elemento de progreso si no existe
  let progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
  }

  // Actualizar en scroll
  window.addEventListener('scroll', throttle(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, 16)); // ~60fps
}

/**
 * Tracking de sección (placeholder)
 */
function trackSectionView(sectionId) {
  // Placeholder para analytics
  // console.log('Section viewed:', sectionId);
}

/**
 * Utilidad: debounce
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Utilidad: throttle
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Ir a una sección específica
 */
export function goToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Obtener sección actual
 */
export function getCurrentSection() {
  const active = document.querySelector('.section[data-active="true"]');
  return active ? active.id : null;
}

/**
 * Destruir instancia de Scrollama
 */
export function destroyScrollama() {
  if (scroller) {
    scroller.destroy();
    scroller = null;
  }
}
