// Coordenadas de la UCB y zoom inicial
const ucbCoords = [-17.4045, -66.1772];
const initialZoom = 10;

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
const map = L.map('map', {
    layers: [baseMapStreets] 
}).setView(ucbCoords, initialZoom);

L.marker(ucbCoords).addTo(map)
    .bindPopup("<b>Universidad Católica Boliviana 'San Pablo'</b><br>Sede Cochabamba.")
    .openPopup();


// --- 3. CARGA DE CAPA GEOJSON (DESDE SHAPEFILE CONVERTIDO) ---
fetch('data/mis_datos.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo encontrar el archivo GeoJSON. Revisa la ruta.');
        }
        return response.json();
    })
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                return { color: "#003399", weight: 2, opacity: 0.8 };
            },
            onEachFeature: function (feature, layer) {
                if (feature.properties) {
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


// --- 4. CAPA DE FOCOS DE CALOR (WMS DE FIRMS NASA) ---
const firmsWmsUrl = 'https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/YourMapKey/fires_viirs_24/?REQUEST=GetMap&WIDTH=1024&HEIGHT=512&BBOX=-180,-90,180,90';
const focosDeCalorLayer = L.tileLayer.wms(firmsWmsUrl, {
    layers: 'VIIRS_S-NPP_24hrs',
    format: 'image/png',
    transparent: true,
    attribution: '<a href="https://firms.modaps.eosdis.nasa.gov/">FIRMS</a> | NASA'
});

// Objeto para las capas de superposición
const overlayMaps = {
    "Focos de Calor (FIRMS)": focosDeCalorLayer
};


// --- 5. CONTROL DE CAPAS ---
// Se añade el control completo con mapas base y capas de superposición
L.control.layers(baseMaps, overlayMaps).addTo(map);
