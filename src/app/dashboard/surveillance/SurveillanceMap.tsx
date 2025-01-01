'use client'
import React from 'react'

// START: Preserve spaces to avoid auto-sorting
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'
// END: Preserve spaces to avoid auto-sorting

import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet'
import { useSurveillanceAnalytics } from '@/hooks/queries/useAnalytics'
import ContentLoader from '@/components/content-loader'

// const data = [
//   { name: 'Takushara', lat: 8.8824, lon: 7.4564, value: 80945 },
//   { name: 'Oyo', lat: 7.83715, lon: 3.93465, value: 2882 },
// ]

const position = { lat: 9.082, lng: 8.6753 }

export const SurveillanceMap = () => {
  const [coordinates, setCoordinates] = React.useState<{
    lat: number
    lng: number
  } | null>(null)

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  const { data: dbData, isPending } = useSurveillanceAnalytics()

  const initialCoordinates = coordinates || position

  if (isPending) {
    return <ContentLoader loading={isPending} />
  }

  const mapData =
    dbData?.data.map((data) => {
      return {
        name: data.schoolName,
        lat: data.geo.latitude,
        lon: data.geo.longitude,
        value: data.count,
      }
    }) || []

  return (
    <MapContainer
      key={Object.values(initialCoordinates).join(',')}
      center={initialCoordinates}
      zoom={6}
      scrollWheelZoom={true}
      style={{ height: 'max(600px, 80vh)', width: '100%' }}
    >
      <React.Fragment>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {mapData.map((location, index) => (
          <Circle
            key={index}
            center={[location.lat, location.lon]}
            radius={Math.sqrt(location.value) * 100} // Adjust radius based on value
            color="red"
            fillColor="red"
            fillOpacity={0.4}
          >
            <Popup>
              <strong>{location.name}</strong> <br />
              Value: {location.value}
            </Popup>
          </Circle>
        ))}
      </React.Fragment>
    </MapContainer>
  )
}
