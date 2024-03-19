import { Car, FlagCheckered } from 'phosphor-react-native'

import { Container, Line } from './styles'

import { LocationInfo, LocationInfoProps } from '@/components/location-info'

export type LocationInfo = Omit<LocationInfoProps, 'icon'>

interface LocationsProps {
  departure: LocationInfo
  arrival?: LocationInfo | null
}

export function Locations({ departure, arrival = null }: LocationsProps) {
  return (
    <Container>
      <LocationInfo
        icon={Car}
        label={departure.label}
        description={departure.description}
      />

      {!!arrival && (
        <>
          <Line />

          <LocationInfo
            icon={FlagCheckered}
            label={arrival.label}
            description={arrival.description}
          />
        </>
      )}
    </Container>
  )
}
