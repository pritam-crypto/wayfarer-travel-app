import { createContext, useContext, useState, useCallback } from 'react'

const LocationContext = createContext(null)

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null) // { lat, lon, label, source }
  const [permissionState, setPermissionState] = useState('idle') // idle | pending | granted | denied | unsupported

  const requestBrowserLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setPermissionState('unsupported')
      return
    }
    setPermissionState('pending')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          label: 'Your location',
          source: 'device',
        })
        setPermissionState('granted')
      },
      () => setPermissionState('denied'),
      { timeout: 10000 },
    )
  }, [])

  const setManualLocation = useCallback((place) => {
    setLocation({ lat: place.lat, lon: place.lon, label: place.label, source: 'search' })
    setPermissionState('granted')
  }, [])

  const clearLocation = useCallback(() => {
    setLocation(null)
    setPermissionState('idle')
  }, [])

  return (
    <LocationContext.Provider
      value={{ location, permissionState, requestBrowserLocation, setManualLocation, clearLocation }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const ctx = useContext(LocationContext)
  if (!ctx) throw new Error('useLocation must be used within a LocationProvider')
  return ctx
}
