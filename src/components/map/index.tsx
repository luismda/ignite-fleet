import { useRef } from 'react'
import { Car, FlagCheckered } from 'phosphor-react-native'

import MapView, {
  Marker,
  LatLng,
  Polyline,
  MapViewProps,
  PROVIDER_GOOGLE,
} from 'react-native-maps'

import { THEME } from '@/theme/default'

import { IconBox } from '@/components/icon-box'

interface MapProps extends MapViewProps {
  coords: LatLng[]
}

export function Map({ coords, ...rest }: MapProps) {
  const mapRef = useRef<MapView>(null)

  function handleMapLoaded() {
    if (coords.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(['departure', 'arrival'], {
        edgePadding: { top: 24, bottom: 24, left: 24, right: 24 },
      })
    }
  }

  const lastCoords = coords[coords.length - 1]

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ width: '100%', height: 200 }}
      region={{
        latitude: lastCoords.latitude,
        longitude: lastCoords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapLoaded={handleMapLoaded}
      {...rest}
    >
      <Marker identifier="departure" coordinate={coords[0]}>
        <IconBox size="SMALL" icon={Car} />
      </Marker>

      {coords.length > 1 && (
        <>
          <Marker identifier="arrival" coordinate={lastCoords}>
            <IconBox size="SMALL" icon={FlagCheckered} />
          </Marker>

          <Polyline
            coordinates={coords}
            strokeColor={THEME.COLORS.GRAY_700}
            strokeWidth={6}
          />
        </>
      )}
    </MapView>
  )
}
