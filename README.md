# 🌍 Geovisor Interactivo

[![Estado del Despliegue](https://github.com/ArmandoRodriguez/geoivisor/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/ArmandoRodriguez/geoivisor/actions/workflows/pages-build-deployment)
[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Hecho con Leaflet](https://img.shields.io/badge/Hecho%20con-Leaflet-green.svg)](https://leafletjs.com/)

Un geovisor web interactivo y dinámico construido con Leaflet.js. Este proyecto visualiza datos geográficos de Cochabamba, Bolivia, e integra capas de información ambiental en tiempo real, como focos de calor de la NASA y pronósticos de riesgo de incendio de Copernicus.

> **Ver la demo en vivo:** **[https://armandorodriguez.github.io/geoivisor/](https://armandorodriguez.github.io/geoivisor/)**

---

## 📸 Vista Previa

> **Acción recomendada:** Saca una captura de pantalla atractiva de tu geovisor con varias capas activas y súbela a tu repositorio. Luego, reemplaza la siguiente línea para que la imagen se muestre aquí.


---

## ✨ Características Principales

* **🗺️ Control de Capas Interactivo:** Permite al usuario activar y desactivar capas de forma independiente.
* **🛰️ Múltiples Mapas Base:** Ofrece la posibilidad de cambiar entre una vista de calles (OpenStreetMap) y una vista satelital (Esri).
* **🔥 Focos de Calor en Tiempo Real:** Integra datos de focos de calor de las últimas 24 horas del sensor VIIRS, obtenidos directamente del servicio WMS de NASA FIRMS.
* **📈 Pronóstico de Riesgo de Incendio:** Visualiza el Fire Weather Index (FWI) del servicio Copernicus EFFIS, mostrando el pronóstico para el día siguiente.
* **📂 Carga de Datos GeoJSON:** Muestra una capa de datos personalizada cargada desde un archivo GeoJSON local (convertido desde un Shapefile).
* **📍 Marcador Personalizado:** Centra el mapa en un punto de interés (Universidad Católica Boliviana, sede Cochabamba) con información detallada.
* **📱 Diseño Responsivo:** La interfaz se adapta a diferentes tamaños de pantalla, desde escritorio hasta dispositivos móviles.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Librería de Mapas:** [Leaflet.js](https://leafletjs.com/)
* **Fuentes de Datos (Servicios Web):**
    * [NASA FIRMS](https://firms.modaps.eosdis.nasa.gov/): para datos de focos de calor (WMS).
    * [Copernicus EFFIS](https://effis.jrc.ec.europa.eu/): para el pronóstico de riesgo de incendio (WMS).
    * [OpenStreetMap](https://www.openstreetmap.org/): para el mapa base de calles.
    * [Esri World Imagery](https://www.esri.com/en-us/arcgis/products/arcgis-platform/services/basemaps): para el mapa base satelital.
* **Alojamiento:** [GitHub Pages](https://pages.github.com/)

---

## 🚀 Cómo Empezar

Si deseas ejecutar este proyecto de forma local o clonarlo, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/ArmandoRodriguez/geoivisor.git](https://github.com/ArmandoRodriguez/geoivisor.git)
    cd TU-REPOSITORIO
    ```

2.  **Configura tu Llave API de FIRMS:**
    Abre el archivo `main.js` y busca la siguiente línea. Reemplaza `'TU_LLAVE_API'` con tu clave personal obtenida de NASA FIRMS.
    ```javascript
    const firmsApiKey = 'TU_LLAVE_API'; 
    ```

3.  **Prepara tus datos GeoJSON:**
    Asegúrate de que tu archivo de datos geográficos se llame `mis_datos.geojson` y esté ubicado dentro de la carpeta `data/`.

4.  **Abre el geovisor:**
    Simplemente abre el archivo `index.html` en tu navegador web.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
