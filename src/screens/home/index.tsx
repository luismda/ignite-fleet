import { Alert } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { useQuery, useRealm } from '@/lib/realm'
import { History } from '@/lib/realm/schemas/history'

import { Container, Content } from './styles'

import { CarStatus } from '@/components/car-status'
import { HomeHeader } from '@/components/home-header'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<History | null>(null)

  const realm = useRealm()
  const history = useQuery(History)
  const navigation = useNavigation()

  const fetchVehicleInUse = useCallback(() => {
    try {
      const [vehicle] = history.filtered(`status = 'departure'`)
      setVehicleInUse(vehicle)
    } catch (error) {
      console.debug(error)

      Alert.alert(
        'Veículo em uso',
        `Ocorreu uma falha inesperada ao buscar o veículo em uso.`,
      )
    }
  }, [history])

  function handleRegisterMovement() {
    const vehicleId = vehicleInUse?._id.toString()

    if (vehicleId) {
      navigation.navigate('arrival', { id: vehicleId })
      return
    }

    navigation.navigate('departure')
  }

  useEffect(() => {
    fetchVehicleInUse()
  }, [fetchVehicleInUse])

  useEffect(() => {
    realm.addListener('change', fetchVehicleInUse)

    return () => {
      realm.removeListener('change', fetchVehicleInUse)
    }
  }, [realm, fetchVehicleInUse])

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
      </Content>
    </Container>
  )
}
