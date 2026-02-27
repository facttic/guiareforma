/**
 * Wizard Navigation
 * Maneja la navegación paso a paso entre secciones
 */

let currentStep = 0;
let sections = [];
let progressDots = [];
let isNavigatingHistory = false; // Para evitar doble push al history

/**
 * Inicializar el wizard
 */
export function initWizard() {
  sections = Array.from(document.querySelectorAll('.section[data-step]'));

  if (sections.length === 0) return;

  // Crear indicador de progreso
  createProgressIndicator();

  // Crear botones de navegación en cada sección
  createNavigationButtons();

  // Escuchar el botón back/forward del navegador
  window.addEventListener('popstate', handlePopState);

  // Determinar paso inicial desde URL o history state
  const initialStep = getInitialStep();

  // Mostrar primera sección (sin push al history)
  isNavigatingHistory = true;
  goToStep(initialStep);
  isNavigatingHistory = false;

  // Reemplazar el state inicial
  history.replaceState({ step: initialStep }, '', getStepUrl(initialStep));

  // Keyboard navigation
  document.addEventListener('keydown', handleKeyboard);

  // Swipe en mobile
  initSwipeNavigation();

  console.log(`Wizard iniciado con ${sections.length} pasos`);
}

/**
 * Obtener paso inicial desde URL hash o default 0
 */
function getInitialStep() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#paso-')) {
    const stepNum = parseInt(hash.replace('#paso-', ''), 10);
    if (!isNaN(stepNum) && stepNum >= 1 && stepNum <= sections.length) {
      return stepNum - 1;
    }
  }
  return 0;
}

/**
 * Generar URL para un paso
 */
function getStepUrl(stepIndex) {
  return `#paso-${stepIndex + 1}`;
}

/**
 * Manejar navegación con botones back/forward del navegador
 */
function handlePopState(e) {
  if (e.state && typeof e.state.step === 'number') {
    isNavigatingHistory = true;
    goToStep(e.state.step);
    isNavigatingHistory = false;
  }
}

/**
 * Crear indicador de progreso (dots)
 */
function createProgressIndicator() {
  const progress = document.createElement('div');
  progress.className = 'wizard-progress';
  progress.setAttribute('role', 'tablist');
  progress.setAttribute('aria-label', 'Progreso de la guía');

  sections.forEach((section, index) => {
    const dot = document.createElement('button');
    dot.className = 'wizard-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    dot.setAttribute('aria-label', `Ir al paso ${index + 1}: ${section.dataset.stepTitle || ''}`);
    dot.dataset.step = index;

    dot.addEventListener('click', () => goToStep(index));

    progress.appendChild(dot);
    progressDots.push(dot);
  });

  // Barra de progreso
  const progressBar = document.createElement('div');
  progressBar.className = 'wizard-progress-bar';
  progressBar.innerHTML = '<div class="wizard-progress-fill"></div>';
  progress.appendChild(progressBar);

  document.body.appendChild(progress);
}

/**
 * Crear botones de navegación en cada sección
 */
function createNavigationButtons() {
  sections.forEach((section, index) => {
    const nav = document.createElement('div');
    nav.className = 'wizard-nav';

    // Botón anterior
    if (index > 0) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'wizard-btn wizard-btn-prev';
      prevBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Anterior
      `;
      prevBtn.addEventListener('click', prevStep);
      nav.appendChild(prevBtn);
    } else {
      // Spacer para mantener el layout
      const spacer = document.createElement('div');
      nav.appendChild(spacer);
    }

    // Indicador de paso
    const stepIndicator = document.createElement('span');
    stepIndicator.className = 'wizard-step-indicator';
    stepIndicator.textContent = `${index + 1} / ${sections.length}`;
    nav.appendChild(stepIndicator);

    // Botón siguiente (excepto en el formulario que tiene sus propios botones)
    const isFormSection = section.id === 'formulario';

    if (index < sections.length - 1 && !isFormSection) {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'wizard-btn wizard-btn-next';
      nextBtn.innerHTML = `
        Siguiente
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      `;
      nextBtn.addEventListener('click', nextStep);
      nav.appendChild(nextBtn);
    } else if (isFormSection) {
      // En el formulario no agregamos botón siguiente
      // Se usan los botones del form: "Ver cómo me afecta" y "Continuar sin personalizar"
    } else {
      // Último paso: botón de "Volver al inicio" o similar
      const restartBtn = document.createElement('button');
      restartBtn.className = 'wizard-btn wizard-btn-restart';
      restartBtn.innerHTML = `
        Volver al inicio
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
      `;
      restartBtn.addEventListener('click', () => goToStep(0));
      nav.appendChild(restartBtn);
    }

    // Agregar nav al final del container de la sección
    const container = section.querySelector('.container') || section;
    container.appendChild(nav);
  });
}

/**
 * Ir a un paso específico
 */
export function goToStep(stepIndex) {
  if (stepIndex < 0 || stepIndex >= sections.length) return;

  const prevStepIndex = currentStep;
  currentStep = stepIndex;

  // Ocultar todas las secciones
  sections.forEach((section, index) => {
    if (index === currentStep) {
      section.classList.add('active');
      section.classList.remove('prev', 'next');
      section.setAttribute('aria-hidden', 'false');
    } else {
      section.classList.remove('active');
      section.classList.add(index < currentStep ? 'prev' : 'next');
      section.setAttribute('aria-hidden', 'true');
    }
  });

  // Actualizar dots
  progressDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentStep);
    dot.classList.toggle('completed', index < currentStep);
    dot.setAttribute('aria-selected', index === currentStep ? 'true' : 'false');
  });

  // Actualizar barra de progreso
  const progressFill = document.querySelector('.wizard-progress-fill');
  if (progressFill) {
    const progress = ((currentStep + 1) / sections.length) * 100;
    progressFill.style.width = `${progress}%`;
  }

  // Scroll to top de la sección activa (sin animación)
  const activeSection = sections[currentStep];
  if (activeSection) {
    activeSection.scrollIntoView({ behavior: 'instant', block: 'start' });
    // Forzar scroll a 0 también por si acaso
    window.scrollTo(0, 0);
  }

  // Agregar al historial del navegador (si no es navegación por history)
  if (!isNavigatingHistory && prevStepIndex !== currentStep) {
    history.pushState({ step: currentStep }, '', getStepUrl(currentStep));
  }

  // Dispatch event para que otros módulos puedan escuchar
  document.dispatchEvent(new CustomEvent('wizardStepChange', {
    detail: { currentStep, prevStep: prevStepIndex, section: sections[currentStep] }
  }));
}

/**
 * Ir al siguiente paso
 */
export function nextStep() {
  goToStep(currentStep + 1);
}

/**
 * Ir al paso anterior
 */
export function prevStep() {
  goToStep(currentStep - 1);
}

/**
 * Manejar navegación con teclado
 */
function handleKeyboard(e) {
  // Solo si no está en un input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
    return;
  }

  // Bloquear navegación por teclado en la sección del formulario
  const currentSection = sections[currentStep];
  if (currentSection && currentSection.id === 'formulario') {
    return;
  }

  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      e.preventDefault();
      nextStep();
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      e.preventDefault();
      prevStep();
      break;
    case 'Home':
      e.preventDefault();
      goToStep(0);
      break;
    case 'End':
      e.preventDefault();
      goToStep(sections.length - 1);
      break;
  }
}

/**
 * Swipe navigation para mobile
 */
function initSwipeNavigation() {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    // Bloquear swipe en la sección del formulario
    const currentSection = sections[currentStep];
    if (currentSection && currentSection.id === 'formulario') {
      return;
    }

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Solo si el swipe horizontal es mayor que el vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > 50) { // Mínimo 50px de swipe
        if (diffX > 0) {
          nextStep(); // Swipe left = next
        } else {
          prevStep(); // Swipe right = prev
        }
      }
    }
  }
}

/**
 * Obtener el paso actual
 */
export function getCurrentStep() {
  return currentStep;
}

/**
 * Obtener total de pasos
 */
export function getTotalSteps() {
  return sections.length;
}
