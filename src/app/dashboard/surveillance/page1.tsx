/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck page

'use client'
import React from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'

// const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'

const MapChart = ({ data }) => {
  // Scale for circle sizes
  const maxValue = Math.max(...data.map((d) => d.value))
  const sizeScale = scaleLinear().domain([0, maxValue]).range([5, 30])

  // return (
  //   <ComposableMap>
  //     <Geographies geography={geoUrl}>
  //       {({ geographies }) =>
  //         geographies.map((geo) => (
  //           <Geography key={geo.rsmKey} geography={geo} />
  //         ))
  //       }
  //     </Geographies>
  //   </ComposableMap>
  // )

  return (
    <div className="w-full h-[600px] bg-slate-100">
      <ComposableMap projection="geoMercator" className="w-full h-full">
        <ZoomableGroup>
          <Geographies
            // geography="https://gist.githubusercontent.com/1310aditya/35b939f63d9bf7fbafb0ab28eb878388/raw/96b48425262b64764254745393ba63456fe3135d/africa.json"
            // geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
            // geography="https://raw.githubusercontent.co/m/deldersveld/topojson/master/world-countries.json"
            geoUrl={
              geoUrl
              //   'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
            }
          >
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#374151"
                  // stroke="#1F2937"
                  strokeWidth={0.5}
                />
              ))
            }
          </Geographies>

          {data.map(({ name, coordinates, value }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle
                r={sizeScale(value)}
                fill="#EF4444"
                fillOpacity={0.8}
                stroke="#991B1B"
                strokeWidth={1}
                className="transition-all duration-300 hover:fill-opacity-100"
              />
              <text
                textAnchor="middle"
                y={-sizeScale(value) - 5}
                className="text-xs fill-gray-200"
              >
                {name}: {value.toLocaleString()}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

export default function SurveillancePage() {
  const sampleData = [
    {
      name: 'New York',
      coordinates: [-74.006, 40.7128],
      value: 8400000,
    },
    {
      name: 'London',
      coordinates: [-0.1276, 51.5074],
      value: 8900000,
    },
    // Add more data points as needed
  ]

  return (
    <div className="p-4">
      <MapChart data={sampleData} />
    </div>
  )
}
