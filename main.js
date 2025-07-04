const ucbCoords = [-17.4045, -66.1772];
const initialZoom = 8;

const baseMapStreets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const baseMapSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, et al.'
});

const baseMaps = {
    "Mapa de Calles": baseMapStreets,
    "Vista Satelital": baseMapSatellite
};

const map = L.map('map', {
    layers: [baseMapStreets] 
}).setView(ucbCoords, initialZoom);

L.marker(ucbCoords).addTo(map)
    .bindPopup("<b>Universidad Católica Boliviana 'San Pablo'</b><br>Sede Cochabamba.")
    .openPopup();


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


const firmsApiKey = 'a1a0615d71695e65c3fef82ad59ed0b4'; 
//`https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/${mapKey}/fires_viirs_24/
const firmsWmsUrlConLlave = `https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/${firmsApiKey}/fires_viirs_24/`;
const focosDeCalorLayer = L.tileLayer.wms(firmsWmsUrlConLlave, {
    layers: 'fires_viirs_snpp_24', // Capa para datos de VIIRS (24h) con API Key
    format: 'image/png',
    transparent: true,
    attribution: '<a href="https://firms.modaps.eosdis.nasa.gov/">FIRMS</a> | NASA'
});
const effisWmsUrl = 'https://maps.effis.emergency.copernicus.eu/gwis';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const year = tomorrow.getFullYear();
const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
const day = String(tomorrow.getDate()).padStart(2, '0');
const forecastDate = `${year}-${month}-${day}`;

const riesgoIncendioFWI = L.tileLayer.wms(effisWmsUrl, {
    layers: 'ecmwf.fwi',
    format: 'image/png',
    transparent: true,
    time: forecastDate, // Usamos la fecha de mañana que generamos
    attribution: 'Copernicus EFFIS'
});

// Objeto que contiene todas las capas de superposición
const overlayMaps = {
    "Riesgo de Incendio (FWI)": riesgoIncendioFWI,
    "Focos de Calor VIIRS (24h)": focosVIIRS_24h
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
