// components/MapChart.tsx
"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
  { name: "امریکا", coordinates: [-100, 38] },
  { name: "کانادا", coordinates: [-106, 56] },
  { name: "افعانستان", coordinates: [65.5776, 33.8391] },
  { name: "ایران", coordinates: [53.688, 32.4279] },
  { name: "چین", coordinates: [104.1954, 35.8617] },
];

export default function MapChart() {
  return (
    <ComposableMap projectionConfig={{ scale: 120 }}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill='#81828c'
              stroke='#e5e7eb'
              strokeWidth={0.5}
            />
          ))
        }
      </Geographies>
      {markers.map(({ name, coordinates }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={10} fill='#d14900' stroke='#d14900' strokeWidth={2} />
          <text textAnchor='middle' y={-10} fontSize={16} fill='#111827'>
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
}
