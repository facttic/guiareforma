/**
 * Mapa de votación por provincia - Argentina
 * Basado en el ejemplo oficial de Leaflet: https://leafletjs.com/examples/choropleth/
 */

let map = null;
let geojson = null;
let info = null;

// Mapeo de nombres de provincias (GeoJSON -> datos de votación)
const nombreMapping = {
  "Tierra del Fuego, Antártida e Islas del Atlántico Sur": "Tierra del Fuego"
};

/**
 * Obtener color según balance de votos
 */
function getColor(balance) {
  return balance >= 6  ? '#2166ac' :
         balance >= 3  ? '#67a9cf' :
         balance >= 1  ? '#d1e5f0' :
         balance >= -0.5 ? '#f7f7f7' :
         balance >= -2 ? '#fddbc7' :
         balance >= -5 ? '#ef8a62' :
                         '#b2182b';
}

/**
 * Obtener datos de votación para una provincia
 */
function getProvinciaData(nombre, provinciasData) {
  const nombreNormalizado = nombreMapping[nombre] || nombre;
  return provinciasData[nombreNormalizado] || { favor: 0, contra: 0, ausentes: 0 };
}

/**
 * Estilo para cada feature
 */
function style(feature, provinciasData) {
  const data = getProvinciaData(feature.properties.nombre, provinciasData);
  const balance = data.favor - data.contra;

  return {
    fillColor: getColor(balance),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

/**
 * Resaltar feature en hover
 */
function highlightFeature(e) {
  const layer = e.target;

  layer.setStyle({
    weight: 4,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.9
  });

  layer.bringToFront();

  if (info) {
    info.update(layer.feature.properties);
  }
}

/**
 * Resetear estilo
 */
function resetHighlight(e, provinciasData) {
  geojson.resetStyle(e.target);
  if (info) {
    info.update();
  }
}

/**
 * Zoom al feature
 */
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

/**
 * Configurar eventos para cada feature
 */
function onEachFeature(feature, layer, provinciasData) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: (e) => resetHighlight(e, provinciasData),
    click: zoomToFeature
  });
}

/**
 * Inicializar el mapa
 */
export async function initVotingMap(selector, provinciasData, senadoresData, filtro = 'total') {
  const container = document.querySelector(selector);
  if (!container) {
    console.error('Container no encontrado:', selector);
    return;
  }

  // Limpiar si ya existe
  if (map) {
    map.remove();
    map = null;
    geojson = null;
    info = null;
  }

  // Forzar dimensiones del contenedor
  container.style.height = '500px';
  container.style.width = '100%';

  // Crear mapa - EXACTAMENTE como el ejemplo de Leaflet
  map = L.map(container).setView([-38.5, -64], 4);

  // Forzar recálculo de tamaño después de crear el mapa
  setTimeout(() => {
    map.invalidateSize();
  }, 100);

  // Tiles
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Control de información
  info = L.control();

  info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  info.update = function(props) {
    if (props) {
      const data = getProvinciaData(props.nombre, provinciasData);
      const balance = data.favor - data.contra;
      const resultado = balance > 0 ? 'A favor' : balance < 0 ? 'En contra' : 'Empate';

      this._div.innerHTML = '<h4>Votación por provincia</h4>' +
        '<b>' + props.nombre + '</b><br />' +
        '<span style="color: #2166ac">' + data.favor + ' a favor</span> / ' +
        '<span style="color: #b2182b">' + data.contra + ' en contra</span><br />' +
        '<em>' + resultado + '</em>';
    } else {
      this._div.innerHTML = '<h4>Votación por provincia</h4>Pasá el mouse sobre una provincia';
    }
  };

  info.addTo(map);

  // Cargar GeoJSON
  try {
    const response = await fetch('/data/argentina-provincias-new.json');
    if (!response.ok) {
      throw new Error('Error cargando GeoJSON: ' + response.status);
    }

    const data = await response.json();
    console.log('GeoJSON cargado:', data.features.length, 'provincias');

    // Crear capa GeoJSON - EXACTAMENTE como el ejemplo de Leaflet
    geojson = L.geoJson(data, {
      style: (feature) => style(feature, provinciasData),
      onEachFeature: (feature, layer) => onEachFeature(feature, layer, provinciasData)
    }).addTo(map);

    console.log('GeoJSON agregado al mapa');

    // Agregar leyenda
    const legend = L.control({position: 'bottomright'});

    legend.onAdd = function(map) {
      const div = L.DomUtil.create('div', 'info legend');
      const grades = [-6, -3, -1, 0, 1, 3, 6];
      const labels = ['Muy en contra', 'En contra', 'Leve contra', 'Empate', 'Leve favor', 'A favor', 'Muy a favor'];

      div.innerHTML = '<strong>Balance</strong><br>';
      for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + getColor(grades[i]) + '"></i> ' +
          labels[i] + '<br>';
      }

      return div;
    };

    legend.addTo(map);

  } catch (error) {
    console.error('Error:', error);
    container.innerHTML = '<p style="color: red; padding: 20px;">Error cargando el mapa: ' + error.message + '</p>';
  }
}

/**
 * Actualizar filtro del mapa
 */
export function updateMapFilter(filtro, provinciasData) {
  if (!geojson) return;

  geojson.eachLayer((layer) => {
    const newStyle = style(layer.feature, provinciasData);
    layer.setStyle(newStyle);
  });
}

/**
 * Resaltar provincia específica
 */
export function highlightProvincia(nombre) {
  if (!geojson) return;

  geojson.eachLayer((layer) => {
    const featureNombre = layer.feature.properties.nombre;
    const nombreNormalizado = nombreMapping[featureNombre] || featureNombre;

    if (nombreNormalizado === nombre) {
      layer.setStyle({ fillOpacity: 1, weight: 4, color: '#333' });
      layer.bringToFront();
    } else {
      layer.setStyle({ fillOpacity: 0.3 });
    }
  });
}

/**
 * Resetear resaltado
 */
export function resetHighlightAll() {
  if (!geojson) return;
  geojson.eachLayer((layer) => {
    geojson.resetStyle(layer);
  });
}
