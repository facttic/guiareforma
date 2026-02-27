/**
 * Anotaciones estilo manuscrito con rough-notation
 * Se activan cuando los elementos entran en viewport
 */

// Esperar a que rough-notation esté disponible
function waitForAnnotate() {
  return new Promise((resolve) => {
    if (window.annotate) {
      resolve();
    } else {
      const check = setInterval(() => {
        if (window.annotate) {
          clearInterval(check);
          resolve();
        }
      }, 100);
    }
  });
}

// Colores para anotaciones
const COLORS = {
  highlight: '#fef08a',      // Amarillo resaltador
  highlightRed: '#fecaca',   // Rojo suave para "después/ahora"
  underline: '#dc2626',      // Rojo para subrayados
  circle: '#dc2626',         // Rojo para números importantes
  box: '#2563eb',            // Azul para cajas
  bracket: '#6b7280'         // Gris para brackets
};

// Configuración por tipo de anotación
const ANNOTATION_CONFIGS = {
  highlight: {
    type: 'highlight',
    color: COLORS.highlight,
    multiline: true,
    iterations: 1
  },
  highlightImportant: {
    type: 'highlight',
    color: COLORS.highlightRed,
    multiline: true,
    iterations: 2
  },
  underline: {
    type: 'underline',
    color: COLORS.underline,
    strokeWidth: 2,
    iterations: 2
  },
  circle: {
    type: 'circle',
    color: COLORS.circle,
    strokeWidth: 2,
    padding: 5,
    iterations: 2
  },
  box: {
    type: 'box',
    color: COLORS.box,
    strokeWidth: 2,
    padding: 4,
    iterations: 2
  },
  bracket: {
    type: 'bracket',
    color: COLORS.bracket,
    strokeWidth: 2,
    brackets: ['left'],
    padding: 6
  },
  crossedOff: {
    type: 'crossed-off',
    color: COLORS.underline,
    strokeWidth: 2,
    iterations: 1
  },
  strikeThrough: {
    type: 'strike-through',
    color: COLORS.bracket,
    strokeWidth: 1,
    iterations: 1
  }
};

// Almacenar anotaciones activas
const activeAnnotations = new Map();

/**
 * Crear anotación para un elemento
 */
function createAnnotation(element, type = 'highlight') {
  const config = ANNOTATION_CONFIGS[type] || ANNOTATION_CONFIGS.highlight;

  // Respetar preferencia de movimiento reducido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return window.annotate(element, {
    ...config,
    animate: !prefersReducedMotion,
    animationDuration: prefersReducedMotion ? 0 : 800
  });
}

// Observer global para reutilizar
let annotationObserver = null;

/**
 * Inicializar anotaciones con Intersection Observer
 */
function initAnnotations() {
  // Crear observer si no existe
  if (!annotationObserver) {
    annotationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const annotationType = el.dataset.annotate;

        if (entry.isIntersecting) {
          // Crear y mostrar anotación si no existe
          if (!activeAnnotations.has(el)) {
            const annotation = createAnnotation(el, annotationType);
            activeAnnotations.set(el, annotation);

            // Pequeño delay para mejor efecto visual
            setTimeout(() => {
              annotation.show();
            }, 200);
          }
        }
      });
    }, {
      threshold: 0.3,  // Reducido para que se active antes
      rootMargin: '50px 0px 50px 0px'  // Margen para activar antes de estar visible
    });
  }

  // Buscar elementos con data-annotate que no estén siendo observados
  const elements = document.querySelectorAll('[data-annotate]:not([data-observing])');

  elements.forEach(el => {
    el.dataset.observing = 'true';
    annotationObserver.observe(el);
  });
}

/**
 * Anotar elementos específicos de la infografía
 * Solo anotamos elementos de la sección activa para evitar conflictos
 */
function annotateKeyElements() {
  // Obtener la sección activa
  const activeSection = document.querySelector('.section.active') || document;

  // Highlight ROSA en la descripción del "AHORA" de cada slide (lo más importante)
  activeSection.querySelectorAll('.despues-card .descripcion').forEach(el => {
    if (!el.dataset.annotate) {
      el.dataset.annotate = 'highlightImportant';
    }
  });

  // Subrayar los valores AHORA de las cards de comparación
  activeSection.querySelectorAll('.cambio-ahora .cambio-valor').forEach(el => {
    if (!el.dataset.annotate) {
      el.dataset.annotate = 'underline';
    }
  });

  // Highlight amarillo en los textos marcados con <mark>
  activeSection.querySelectorAll('mark.rough-highlight').forEach(el => {
    if (!el.dataset.annotate) {
      el.dataset.annotate = 'highlight';
    }
  });

  // Circle en diferencias de calculadora (pérdidas)
  activeSection.querySelectorAll('.diferencia-valor.negativo').forEach(el => {
    if (!el.dataset.annotate) {
      el.dataset.annotate = 'circle';
    }
  });

  // Highlight en el hero tag
  document.querySelectorAll('.hero-tag').forEach(el => {
    if (!el.dataset.annotate) {
      el.dataset.annotate = 'highlight';
    }
  });

  // Circulito en los números de sección
  activeSection.querySelectorAll('.section-number').forEach(el => {
    if (!el.dataset.annotate) {
      el.dataset.annotate = 'circle';
    }
  });

  // Subrayar votos a favor en hero
  document.querySelectorAll('.hero-stats .votos-favor').forEach(el => {
    if (!el.dataset.annotate) {
      el.dataset.annotate = 'underline';
    }
  });

  // Highlight en items importantes de listas
  activeSection.querySelectorAll('.info-lista li strong').forEach((el, i) => {
    if (!el.dataset.annotate && i < 3) {
      el.dataset.annotate = 'highlight';
    }
  });
}

/**
 * Ocultar anotaciones de una sección
 */
function hideAnnotationsInSection(section) {
  if (!section) return;

  const elements = section.querySelectorAll('[data-annotate]');
  elements.forEach(el => {
    const annotation = activeAnnotations.get(el);
    if (annotation) {
      annotation.hide();
    }
  });
}

/**
 * Re-escanear y anotar contenido nuevo (para contenido dinámico)
 */
function refreshAnnotations() {
  if (!window.annotate) return;

  // Primero marcar nuevos elementos
  annotateKeyElements();

  // Observar nuevos elementos
  initAnnotations();

  // Mostrar todos los de la sección activa
  const activeSection = document.querySelector('.section.active');
  if (activeSection) {
    const elements = activeSection.querySelectorAll('[data-annotate]');
    elements.forEach((el, index) => {
      const existingAnnotation = activeAnnotations.get(el);

      if (existingAnnotation) {
        // Re-mostrar anotación existente con animación
        setTimeout(() => existingAnnotation.show(), 100 + (index * 150));
      } else {
        // Crear nueva anotación
        const annotationType = el.dataset.annotate;
        const annotation = createAnnotation(el, annotationType);
        activeAnnotations.set(el, annotation);
        setTimeout(() => annotation.show(), 100 + (index * 150));
      }
    });
  }
}

/**
 * Inicializar todo cuando el DOM esté listo
 */
async function init() {
  await waitForAnnotate();

  // Primero marcar elementos clave
  annotateKeyElements();

  // Luego inicializar el observer
  initAnnotations();

  // Escuchar cambios en el wizard para re-anotar
  document.addEventListener('wizardStepChange', (e) => {
    // Ocultar todas las anotaciones de secciones no activas
    document.querySelectorAll('.section:not(.active)').forEach(section => {
      hideAnnotationsInSection(section);
    });

    // Mostrar anotaciones de la nueva sección con delay
    setTimeout(() => {
      annotateKeyElements();
      refreshAnnotations();
    }, 300);
  });
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Exponer globalmente para que otros módulos puedan refrescar
window.refreshAnnotations = refreshAnnotations;

// Exportar para uso manual si es necesario
export { createAnnotation, refreshAnnotations, COLORS, ANNOTATION_CONFIGS };
