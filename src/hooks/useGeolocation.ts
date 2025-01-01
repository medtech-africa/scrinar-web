'use client'

import { useState, useEffect } from 'react'

interface GeolocationData {
  lat: number | null
  lng: number | null
  error: string | null
}

const useGeolocation = (): GeolocationData => {
  const [location, setLocation] = useState<Omit<GeolocationData, 'error'>>({
    lat: null,
    lng: null,
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported')
      fetch('/api/geolocation')
        .then((res) => res.json())
        .then((data) => setLocation({ lat: data.lat, lng: data.lng }))
        .catch(() => setError('Unable to retrieve fallback geolocation'))
      return
    }

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords
      setLocation({ lat: latitude, lng: longitude })
    }

    const failure = (err: GeolocationPositionError) => {
      setError(err.message || 'Unable to retrieve location')
    }

    navigator.geolocation.getCurrentPosition(success, failure, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // Cache for 5 minutes
    })
  }, [])

  return { lat: location.lat, lng: location.lng, error }
}

export { useGeolocation }
