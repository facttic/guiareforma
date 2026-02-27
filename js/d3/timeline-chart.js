/**
 * Timeline del proceso legislativo
 */

import * as d3 from 'd3';

const timelineData = [
  {
    fecha: '11 Dic 2025',
    titulo: 'Proyecto Ejecutivo',
    descripcion: 'El gobierno envía el proyecto de "Modernización Laboral" al Congreso.',
    tipo: 'inicio'
  },
  {
    fecha: '11-12 Feb 2026',
    titulo: 'Debate en Senado',
    descripcion: 'Casi 17 horas de debate. Aprobado 42-30.',
    tipo: 'votacion',
    resultado: { favor: 42, contra: 30 }
  },
  {
    fecha: '20 Feb 2026',
    titulo: 'Votación en Diputados',
    descripcion: '12+ horas de sesión. Aprobado 135-115. Vuelve al Senado por modificaciones (eliminación Art. 44).',
    tipo: 'votacion',
    resultado: { favor: 135, contra: 115 }
  }
];

let svg = null;

/**
 * Inicializar timeline
 */
export function initTimeline(selector) {
  const container = document.querySelector(selector);
  if (!container) return;

  // Limpiar contenedor
  container.innerHTML = '';

  // Dimensiones
  const width = container.clientWidth || 800;
  const height = 350;
  const margin = { top: 40, right: 40, bottom: 40, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Crear SVG
  svg = d3.select(selector)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('role', 'img')
    .attr('aria-label', 'Línea de tiempo del proceso legislativo de la reforma laboral');

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Escala X (temporal)
  const x = d3.scalePoint()
    .domain(timelineData.map((d, i) => i))
    .range([0, innerWidth])
    .padding(0.5);

  // Línea central
  g.append('line')
    .attr('class', 'timeline-line')
    .attr('x1', 0)
    .attr('y1', innerHeight / 2)
    .attr('x2', innerWidth)
    .attr('y2', innerHeight / 2)
    .attr('stroke', '#e0e0e0')
    .attr('stroke-width', 4)
    .attr('stroke-linecap', 'round');

  // Línea de progreso animada
  g.append('line')
    .attr('class', 'timeline-progress')
    .attr('x1', 0)
    .attr('y1', innerHeight / 2)
    .attr('x2', 0)
    .attr('y2', innerHeight / 2)
    .attr('stroke', '#1a5f7a')
    .attr('stroke-width', 4)
    .attr('stroke-linecap', 'round')
    .transition()
    .duration(1500)
    .ease(d3.easeQuadOut)
    .attr('x2', innerWidth);

  // Eventos
  const events = g.selectAll('.timeline-event')
    .data(timelineData)
    .enter()
    .append('g')
    .attr('class', 'timeline-event')
    .attr('transform', (d, i) => `translate(${x(i)}, ${innerHeight / 2})`);

  // Círculos de eventos
  events.append('circle')
    .attr('r', 0)
    .attr('fill', d => d.tipo === 'votacion' ? '#1a5f7a' : '#4ecdc4')
    .attr('stroke', '#fff')
    .attr('stroke-width', 3)
    .transition()
    .duration(500)
    .delay((d, i) => 500 + i * 300)
    .attr('r', 16);

  // Iconos dentro de círculos
  events.append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-size', 14)
    .attr('fill', '#fff')
    .attr('opacity', 0)
    .text(d => d.tipo === 'votacion' ? '✓' : '📄')
    .transition()
    .duration(300)
    .delay((d, i) => 800 + i * 300)
    .attr('opacity', 1);

  // Fechas (arriba)
  events.append('text')
    .attr('class', 'timeline-date')
    .attr('y', -40)
    .attr('text-anchor', 'middle')
    .attr('font-size', 13)
    .attr('font-weight', 700)
    .attr('fill', '#1a5f7a')
    .attr('opacity', 0)
    .text(d => d.fecha)
    .transition()
    .duration(400)
    .delay((d, i) => 600 + i * 300)
    .attr('opacity', 1);

  // Títulos (abajo)
  events.append('text')
    .attr('class', 'timeline-title')
    .attr('y', 45)
    .attr('text-anchor', 'middle')
    .attr('font-size', 14)
    .attr('font-weight', 600)
    .attr('fill', '#333')
    .attr('opacity', 0)
    .text(d => d.titulo)
    .transition()
    .duration(400)
    .delay((d, i) => 700 + i * 300)
    .attr('opacity', 1);

  // Descripciones (más abajo, multilínea)
  events.each(function(d, i) {
    const group = d3.select(this);
    const lines = wrapText(d.descripcion, 25);

    lines.forEach((line, lineIndex) => {
      group.append('text')
        .attr('class', 'timeline-desc')
        .attr('y', 70 + lineIndex * 16)
        .attr('text-anchor', 'middle')
        .attr('font-size', 11)
        .attr('fill', '#666')
        .attr('opacity', 0)
        .text(line)
        .transition()
        .duration(400)
        .delay(800 + i * 300 + lineIndex * 50)
        .attr('opacity', 1);
    });

    // Resultado de votación
    if (d.resultado) {
      group.append('text')
        .attr('class', 'timeline-result')
        .attr('y', 70 + lines.length * 16 + 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', 12)
        .attr('font-weight', 700)
        .attr('opacity', 0)
        .html(`<tspan fill="#0571b0">${d.resultado.favor}</tspan> - <tspan fill="#ca0020">${d.resultado.contra}</tspan>`)
        .transition()
        .duration(400)
        .delay(900 + i * 300)
        .attr('opacity', 1);
    }
  });

  // Agregar tabla accesible
  addAccessibleTable(container);
}

/**
 * Wrap text helper
 */
function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + ' ' + word).trim().length <= maxChars) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * Agregar tabla accesible oculta
 */
function addAccessibleTable(container) {
  const table = document.createElement('table');
  table.className = 'sr-only';
  table.innerHTML = `
    <caption>Proceso legislativo de la reforma laboral</caption>
    <thead>
      <tr>
        <th>Fecha</th>
        <th>Evento</th>
        <th>Descripción</th>
        <th>Resultado</th>
      </tr>
    </thead>
    <tbody>
      ${timelineData.map(d => `
        <tr>
          <td>${d.fecha}</td>
          <td>${d.titulo}</td>
          <td>${d.descripcion}</td>
          <td>${d.resultado ? `${d.resultado.favor} a favor, ${d.resultado.contra} en contra` : 'N/A'}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
  container.appendChild(table);
}

/**
 * Animar timeline al entrar en viewport
 */
export function animateTimeline() {
  // Trigger animación si es necesario
  if (svg) {
    // Re-run animations
  }
}
