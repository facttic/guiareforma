/**
 * Visualización de comparación ANTES/DESPUÉS
 * Template reutilizable para los cambios
 */

import * as d3 from 'd3';

/**
 * Crear visualización de comparación
 */
export function initComparisonViz(selector, cambioData) {
  const container = document.querySelector(selector);
  if (!container) return;

  // Por ahora esto es un placeholder
  // Las visualizaciones principales están en las calculadoras
  console.log('Comparison viz inicializada para:', cambioData?.id);
}

/**
 * Crear gráfico de barras divergentes
 */
export function createDivergingBars(selector, beforeValue, afterValue, options = {}) {
  const container = document.querySelector(selector);
  if (!container) return;

  const {
    width = 300,
    height = 100,
    labelBefore = 'ANTES',
    labelAfter = 'DESPUÉS',
    color = '#1a5f7a'
  } = options;

  container.innerHTML = '';

  const svg = d3.select(selector)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  const centerX = width / 2;
  const barHeight = 30;
  const maxBarWidth = (width / 2) - 60;

  // Escala
  const maxValue = Math.max(beforeValue, afterValue);
  const scale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, maxBarWidth]);

  // Barra ANTES (izquierda)
  svg.append('rect')
    .attr('x', centerX - scale(beforeValue))
    .attr('y', height / 2 - barHeight / 2)
    .attr('width', 0)
    .attr('height', barHeight)
    .attr('fill', '#e74c3c')
    .attr('rx', 4)
    .transition()
    .duration(800)
    .attr('width', scale(beforeValue));

  // Barra DESPUÉS (derecha)
  svg.append('rect')
    .attr('x', centerX)
    .attr('y', height / 2 - barHeight / 2)
    .attr('width', 0)
    .attr('height', barHeight)
    .attr('fill', '#27ae60')
    .attr('rx', 4)
    .transition()
    .duration(800)
    .attr('width', scale(afterValue));

  // Línea central
  svg.append('line')
    .attr('x1', centerX)
    .attr('y1', height / 2 - barHeight)
    .attr('x2', centerX)
    .attr('y2', height / 2 + barHeight)
    .attr('stroke', '#333')
    .attr('stroke-width', 2);

  // Labels
  svg.append('text')
    .attr('x', 10)
    .attr('y', height / 2)
    .attr('dominant-baseline', 'middle')
    .attr('font-size', 12)
    .attr('font-weight', 600)
    .attr('fill', '#e74c3c')
    .text(labelBefore);

  svg.append('text')
    .attr('x', width - 10)
    .attr('y', height / 2)
    .attr('text-anchor', 'end')
    .attr('dominant-baseline', 'middle')
    .attr('font-size', 12)
    .attr('font-weight', 600)
    .attr('fill', '#27ae60')
    .text(labelAfter);

  // Valores
  svg.append('text')
    .attr('x', centerX - scale(beforeValue) / 2)
    .attr('y', height / 2)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-size', 14)
    .attr('font-weight', 700)
    .attr('fill', '#fff')
    .attr('opacity', 0)
    .text(formatNumber(beforeValue))
    .transition()
    .delay(400)
    .duration(400)
    .attr('opacity', 1);

  svg.append('text')
    .attr('x', centerX + scale(afterValue) / 2)
    .attr('y', height / 2)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-size', 14)
    .attr('font-weight', 700)
    .attr('fill', '#fff')
    .attr('opacity', 0)
    .text(formatNumber(afterValue))
    .transition()
    .delay(400)
    .duration(400)
    .attr('opacity', 1);
}

/**
 * Formatear número
 */
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toString();
}

/**
 * Crear mini gráfico de diferencia
 */
export function createDifferenceIndicator(selector, beforeValue, afterValue) {
  const container = document.querySelector(selector);
  if (!container) return;

  const diff = afterValue - beforeValue;
  const percentChange = beforeValue > 0 ? ((diff / beforeValue) * 100).toFixed(1) : 0;
  const isPositive = diff >= 0;

  container.innerHTML = `
    <div class="diff-indicator ${isPositive ? 'positive' : 'negative'}">
      <span class="diff-arrow">${isPositive ? '↑' : '↓'}</span>
      <span class="diff-value">${Math.abs(percentChange)}%</span>
    </div>
  `;
}
