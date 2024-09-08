import React from 'react';
import { ComposableMap, Geographies, Geography, Marker ,  Sphere,
    Graticule} from 'react-simple-maps';
import { scaleLinear } from "d3-scale";

const markers = [
  { name: "US", coordinates: [-98.35, 39.50] }, // Approximate center of the US
  { name: "CA", coordinates: [-106.35, 56.13] }, // Approximate center of Canada
  { name: "MX", coordinates: [-102.55, 23.64] }, // Approximate center of Mexico
  { name: "GB", coordinates: [-3.44, 55.00] }, // Approximate center of the UK
  { name: "FR", coordinates: [2.21, 46.60] }, // Approximate center of France
  { name: "DE", coordinates: [10.45, 51.16] }, // Approximate center of Germany
  { name: "JP", coordinates: [138.25, 36.65] }, // Approximate center of Japan
  { name: "KR", coordinates: [127.77, 35.90] }, // Approximate center of South Korea
  { name: "CN", coordinates: [104.19, 35.86] }, // Approximate center of China
  { name: "AU", coordinates: [133.77, -25.27] }, // Approximate center of Australia
  { name: "NZ", coordinates: [174.88, -40.90] }, // Approximate center of New Zealand
  { name: "SG", coordinates: [103.82, 1.35] }, // Approximate center of Singapore
  { name: "BR", coordinates: [-51.92, -14.24] }, // Approximate center of Brazil
  { name: "AR", coordinates: [-63.61, -38.42] }, // Approximate center of Argentina
  { name: "CL", coordinates: [-71.53, -35.68] } // Approximate center of Chile
];

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => (
  <ComposableMap
  projectionConfig={{
    rotate: [-10, 0, 0],
    scale: 147,
  }}
  >    <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      <Geographies geography='features.json'>
        {({ geographies }) =>
          geographies.map((geo) => {
          
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#B0B0B0" 
                stroke="#FFF" 
                strokeWidth={0.5} 
                
              />
            );
          })
        }
      </Geographies>
    {markers.map(({ name, coordinates, markerOffset }) => (
      <Marker key={name} coordinates={coordinates}>
        <circle r={5} fill="#FF5722" stroke="#FFF" strokeWidth={2} />
        <text
          textAnchor="middle"
          y={markerOffset}
          style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
        >
          {name}
        </text>
      </Marker>
    ))}
  </ComposableMap>
);

export default MapChart;