import { useState, useEffect } from 'react'

interface GeoState {
  lat: number | null
  lng: number | null
  error: string | null
  loading: boolean
}

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({
    lat: null, lng: null, error: null, loading: true,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, loading: false, error: '위치 서비스를 지원하지 않는 브라우저예요.' }))
      return
    }

    const id = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setState({ lat: coords.latitude, lng: coords.longitude, error: null, loading: false })
      },
      () => {
        // 위치 권한 거부 시 서울 강남 기본값으로 폴백
        setState({ lat: 37.4979, lng: 127.0276, error: null, loading: false })
      },
      { enableHighAccuracy: true, maximumAge: 30_000 },
    )

    return () => navigator.geolocation.clearWatch(id)
  }, [])

  return state
}
