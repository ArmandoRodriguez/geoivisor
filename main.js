// Coordenadas de la UCB y zoom inicial
const ucbCoords = [-17.4045, -66.1772];
const initialZoom = 17;

// --- 1. DEFINICIÓN DE MAPAS BASE ---
const baseMapStreets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const baseMapSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, et al.'
});

// Objeto que agrupa las capas base
const baseMaps = {
    "Mapa de Calles": baseMapStreets,
    "Vista Satelital": baseMapSatellite
};


// --- 2. INICIALIZACIÓN DEL MAPA Y MARCADOR ---
// Se inicializa el mapa con una capa por defecto
const map = L.map('map', {
    layers: [baseMapStreets] 
}).setView(ucbCoords, initialZoom);

// Se añade el control para cambiar de mapa base
L.control.layers(baseMaps).addTo(map);

// Se añade el marcador de la UCB
L.marker(ucbCoords).addTo(map)
    .bindPopup("<b>Universidad Católica Boliviana 'San Pablo'</b><br>Sede Cochabamba.")
    .openPopup();


// --- 3. CARGA DE CAPA GEOJSON (DESDE SHAPEFILE CONVERTIDO) ---
// Asegúrate de tener el archivo 'mis_datos.geojson' en una carpeta 'data'
fetch('data/mis_datos.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo encontrar el archivo GeoJSON. Revisa la ruta.');
        }
        return response.json();
    })
    .then(data => {
        L.geoJSON(data, {
            // Función para estilizar la capa
            style: function (feature) {
                return {
                    color: "#003399", // Un color azul
                    weight: 2,
                    opacity: 0.8
                };
            },
            // Función para añadir popups a cada polígono/línea/punto
            onEachFeature: function (feature, layer) {
                if (feature.properties) {
                    // Crea un popup con todos los datos de las propiedades
                    let popupContent = '<b>Propiedades:</b><br>';
                    for (let key in feature.properties) {
                        popupContent += `${key}: ${feature.properties[key]}<br>`;
                    }
                    layer.bindPopup(popupContent);
                }
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('No se pudieron cargar los datos de la capa. Revisa la consola para más detalles (F12).');
    });
