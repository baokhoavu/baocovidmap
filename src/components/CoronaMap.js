import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapContainer as LeafletMapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import lookup from 'country-code-lookup';
import styled from 'styled-components';
import L from 'leaflet';

import { mapLayerConfirmed } from '../config/map/mapLayerConfirmed';
import { mapLayerRecovered } from '../config/map/mapLayerRecovered';
import { mapLayerDead } from '../config/map/mapLayerDead';
import Spinner from './Spinner';

// Mapbox CSS
import 'mapbox-gl/dist/mapbox-gl.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: grid;
  position: relative;

  @media (min-width: 768px) {
    height: 100%;
    min-height: 100vh;
  }

  @media (min-width: 1024px) {
    height: 100%;
    min-height: 100vh;
  }
`;

const MapBox = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 1;
  grid-row: 1;
  visibility: ${(props) => props.mapVisibility};

  @media (min-width: 768px) {
    height: 100%;
  }

  @media (min-width: 1024px) {
    height: 100%;
  }
`;

const MapPlaceholder = styled.div`
  background: #2c2c2c;
  justify-content: center;
  align-items: center;
  opacity: 0.85;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  padding: 20px;
  position: relative;

  @media (min-width: 768px) {
    height: 100%;
  }

  @media (min-width: 1024px) {
    height: 100%;
  }
`;

const StyledLeafletContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .leaflet-container {
    height: 100% !important;
    width: 100% !important;
    background: #2c2c2c;
    z-index: 1;
  }

  .leaflet-tile-pane {
    z-index: 2;
  }

  .leaflet-popup-pane {
    z-index: 3;
  }

  .leaflet-control-container {
    z-index: 4;
  }
`;
const RenderLoader = () => (
  <MapPlaceholder>
    <Spinner />
  </MapPlaceholder>
);

// Leaflet-based map component for free geographical visualization
const LeafletCovidMap = ({ data, mockStats }) => {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setMapData(data);
    }
  }, [data]);

  // Get color based on case count
  const getColor = (cases) => {
    if (cases > 10000000) return '#ff0000'; // Red for very high
    if (cases > 1000000) return '#ff4500'; // Orange red for high
    if (cases > 100000) return '#ff8c00'; // Dark orange for medium-high
    if (cases > 10000) return '#ffa500'; // Orange for medium
    return '#ffff00'; // Yellow for low
  };

  // Get radius based on case count (logarithmic scale)
  const getRadius = (cases) => {
    if (cases <= 0) return 5;
    return Math.max(5, Math.min(30, Math.log10(cases) * 3));
  };

  if (mapData.length === 0) {
    return (
      <StyledLeafletContainer>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: '#2c2c2c', 
          color: 'white',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}>
          <div style={{ textAlign: 'center' }}>
            <h3>Loading COVID-19 Data...</h3>
            <p>Preparing geographical visualization</p>
          </div>
        </div>
      </StyledLeafletContainer>
    );
  }

  return (
    <StyledLeafletContainer>
      <LeafletMapContainer
        center={[20, 0]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          noWrap={true}
          bounds={[[-90, -180], [90, 180]]}
        />
        {mapData.map((country, index) => {
          const { coordinates } = country.geometry;
          const { country: countryName, confirmed, dead, recovered } = country.properties;
          const mortalityRate = confirmed > 0 ? ((dead / confirmed) * 100).toFixed(2) : 0;

          return (
            <CircleMarker
              key={index}
              center={[coordinates[1], coordinates[0]]}
              radius={getRadius(confirmed)}
              fillColor={getColor(confirmed)}
              color="#fff"
              weight={2}
              opacity={0.8}
              fillOpacity={0.6}
            >
              <Popup>
                <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '200px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{countryName}</h4>
                  <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
                    <p style={{ margin: '4px 0', color: '#d32f2f' }}>
                      <strong>Confirmed:</strong> {confirmed?.toLocaleString() || 'N/A'}
                    </p>
                    <p style={{ margin: '4px 0', color: '#2e7d32' }}>
                      <strong>Recovered:</strong> {recovered?.toLocaleString() || 'N/A'}
                    </p>
                    <p style={{ margin: '4px 0', color: '#1976d2' }}>
                      <strong>Deaths:</strong> {dead?.toLocaleString() || 'N/A'}
                    </p>
                    <p style={{ margin: '4px 0', color: '#666' }}>
                      <strong>Mortality Rate:</strong> {mortalityRate}%
                    </p>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </LeafletMapContainer>
    </StyledLeafletContainer>
  );
};

const CoronaMap = ({ data }) => {
  const mapboxRef = useRef(null); // DOM element to render map
  /* State to hold value for map visibility; depending on whether the map is
        loaded the container for map component will be set to visible
    */
  const [mapVisibility, setMapVisibility] = useState('hidden');
  const [mapError, setMapError] = useState(false);
  const [mockStats, setMockStats] = useState(null);

  // Load mock statistics for display
  useEffect(() => {
    const loadMockStats = async () => {
      try {
        const response = await fetch('/mockData.json');
        const mockData = await response.json();
        const countries = mockData.countriesLatest || [];
        const summary = mockData.allSummary || {};

        // Get top 5 countries by cases
        const topCountries = countries
          .sort((a, b) => b.cases - a.cases)
          .slice(0, 5);

        setMockStats({
          totalCases: summary.cases || 0,
          totalDeaths: summary.deaths || 0,
          totalRecovered: summary.recovered || 0,
          topCountries
        });
      } catch (error) {
        console.error('Error loading mock stats:', error);
      }
    };

    loadMockStats();
  }, []);

  // Initialize the map
  useEffect(() => {
    // Check if Mapbox token is available
    if (!mapboxgl.accessToken) {
      console.warn('Mapbox access token not found. Using Leaflet map with OpenStreetMap.');
      setMapError(true);
      setMapVisibility('visible');
      return;
    }

    const loadMap = () => {
      // You can store the map instance with useRef too
      /*
            const bounds = [
                [65.818748, 5.979753], // Southwest coordinates
                [100.294876, 37.983175] // Northeast coordinates
                ];
            */
      const map = new mapboxgl.Map({
        container: mapboxRef.current,
        style: 'mapbox://styles/mapbox/dark-v10', // theme of the map
        center: [76.33643, 22.5493], // initial geo location
        //maxBounds: bounds    // restrict map panning to an area
        zoom: 4,
      });

      // Add navigation controls to the top right of the canvas
      map.addControl(new mapboxgl.NavigationControl());
        // Call this method when the map is loaded
        map.once('load', () => {
        // Add our SOURCE
        // with id "points"
        map.addSource('points', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: data,
          },
        });

        // Add first layer: active cases
        map.addLayer({ ...mapLayerConfirmed });

        // Add second layer - recoveries
        map.addLayer({ ...mapLayerRecovered });

        // Add third layer - death count
        map.addLayer({ ...mapLayerDead });

        // Create a mapbox popup
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });

        // Variable to hold the active country/province on hover
        let lastId;

        // Mouse move event
        map.on('mousemove', 'covid19-cases', (e) => {
          // Get the id from the properties
          const id = e.features[0].properties.id;

          // Only if the id are different we process the tooltip
          if (id !== lastId) {
            lastId = id;

            map.getCanvas().style.cursor = 'pointer';

            const {
              confirmed,
              dead,
              recovered,
              country,
              province,
            } = e.features[0].properties;
            const coordinates = e.features[0].geometry.coordinates.slice();

            // Collect data for the tooltip
            const countryISO =
              lookup.byCountry(country)?.iso2 ||
              lookup.byInternet(country)?.iso2;
            const provinceHTML =
              province !== 'null' ? `<p>Province: <b>${province}</b></p>` : '';
            const mortalityRate = ((dead / confirmed) * 100).toFixed(2);
            const countryFlagHTML = Boolean(countryISO)
              ? `<img src="https://www.countryflags.io/${countryISO}/flat/64.png"></img>`
              : '';

            const HTML = `<p><b>${country}</b>${countryFlagHTML}</p>
                                ${provinceHTML}
                                <p>Confirmed: ${confirmed}</p>
                                <p>Recovered: ${recovered}</p>
                                <p>Dead: ${dead}</p>
                                <p>Mortality Rate: ${mortalityRate}%</p>
                                `;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
          }
        });

        // Mouse leave event
        map.on('mouseleave', 'covid19-cases', function () {
          // Reset the last Id
          lastId = undefined;
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
        setMapVisibility('visible');
      });
    };
    
    try {
      loadMap();
    } catch (error) {
      console.error('Error loading map:', error);
      setMapError(true);
      setMapVisibility('visible');
    }
  }, [data]);

  return (
    <MapContainer>
      {/* When the map is not visible render the spinner component */}
      {mapVisibility === 'hidden' && <RenderLoader />}
      {mapError ? (
        <LeafletCovidMap data={data} mockStats={mockStats} />
      ) : (
        <MapBox ref={mapboxRef} visibility={mapVisibility} />
      )}
      {/* Map container - uses Leaflet as fallback when Mapbox unavailable */}
    </MapContainer>
  );
};

export default CoronaMap;
