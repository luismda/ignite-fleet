import { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LatLng } from 'react-native-maps'
import { X } from 'phosphor-react-native'
import { BSON } from 'realm'
import dayjs from 'dayjs'

import { useObject, useRealm } from '@/libs/realm'
import { History } from '@/libs/realm/schemas/history'
import { getAddressLocation } from '@/utils/get-address-location'
import { stopLocationTask } from '@/tasks/background-location-task'
import { getLocations } from '@/libs/async-storage/locations-storage'
import { getLastSyncTimestamp } from '@/libs/async-storage/sync-storage'

import {
  Label,
  Footer,
  Content,
  Container,
  Description,
  LicensePlate,
  SyncMessage,
} from './styles'

import { Map } from '@/components/map'
import { Header } from '@/components/header'
import { Button } from '@/components/button'
import { Loading } from '@/components/loading'
import { ButtonIcon } from '@/components/button-icon'
import { Locations, LocationInfo } from '@/components/locations'

type RouteParams = {
  id: string
}

export function Arrival() {
  const [isSynced, setIsSynced] = useState(false)
  const [coords, setCoords] = useState<LatLng[]>([])
  const [isRegistering, setIsRegistering] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [arrival, setArrival] = useState<LocationInfo | null>(null)
  const [departure, setDeparture] = useState<LocationInfo>({} as LocationInfo)

  const route = useRoute()
  const navigation = useNavigation()

  const { id } = route.params as RouteParams

  const realm = useRealm()
  const history = useObject(History, new BSON.UUID(id) as unknown as string)

  const getLocationsInfo = useCallback(async () => {
    if (!history) return

    const lastSyncTimestamp = await getLastSyncTimestamp()
    const updatedAt = history.updated_at.getTime()

    setIsSynced(lastSyncTimestamp > updatedAt)

    if (history.status === 'departure') {
      const locations = await getLocations()
      setCoords(locations)
    } else {
      setCoords(
        history.coords.map(({ latitude, longitude }) => ({
          latitude,
          longitude,
        })),
      )
    }

    const firstCoords = history.coords[0]
    const departureStreetName = await getAddressLocation(firstCoords)

    setDeparture({
      label: `Saindo em ${departureStreetName}`,
      description: dayjs(firstCoords.timestamp).format('DD/MM/YYYY [às] HH:mm'),
    })

    if (history.status === 'arrival') {
      const lastCoords = history.coords[history.coords.length - 1]
      const arrivalStreetName = await getAddressLocation(lastCoords)

      setArrival({
        label: `Chegando em ${arrivalStreetName}`,
        description: dayjs(lastCoords.timestamp).format(
          'DD/MM/YYYY [às] HH:mm',
        ),
      })
    }

    setIsInitialLoading(false)
  }, [history])

  async function removeVehicleUsage() {
    try {
      realm.write(() => {
        realm.delete(history)
      })

      await stopLocationTask()

      navigation.goBack()
    } catch (error) {
      console.debug(error)

      Alert.alert(
        'Cancelar utilização',
        `Ocorreu uma falha inesperada ao cancelar a utilização do veículo.`,
      )
    }
  }

  function handleRemoveVehicleUsage() {
    Alert.alert(
      'Cancelar utilização',
      `Deseja cancelar a utilização desse veículo?`,
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: removeVehicleUsage },
      ],
    )
  }

  async function handleRegisterArrival() {
    if (!history) {
      Alert.alert(
        'Registrar chegada',
        `Ocorreu uma falha inesperada ao registrar a chegada do veículo.`,
      )

      return
    }

    setIsRegistering(true)

    try {
      const locations = await getLocations()

      realm.write(() => {
        history.status = 'arrival'
        history.updated_at = new Date()
        history.coords.push(...locations)
      })

      await stopLocationTask()

      navigation.goBack()
    } catch (error) {
      console.debug(error)

      setIsRegistering(false)

      Alert.alert(
        'Registrar chegada',
        `Ocorreu uma falha inesperada ao registrar a chegada do veículo.`,
      )
    }
  }

  useEffect(() => {
    getLocationsInfo()
  }, [getLocationsInfo])

  const isDeparture = history?.status === 'departure'
  const title = isDeparture ? 'Chegada' : 'Histórico'

  if (isInitialLoading) {
    return <Loading />
  }

  return (
    <Container>
      <Header title={title} />

      {coords.length > 0 && <Map coords={coords} />}

      <Content>
        <Locations departure={departure} arrival={arrival} />

        <Label>Placa do veículo</Label>
        <LicensePlate>{history?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{history?.description}</Description>
      </Content>

      {isDeparture && (
        <Footer>
          <ButtonIcon
            icon={X}
            accessibilityLabel="Cancelar utilização do veículo"
            onPress={handleRemoveVehicleUsage}
          />

          <Button
            title="Registrar chegada"
            isLoading={isRegistering}
            onPress={handleRegisterArrival}
          />
        </Footer>
      )}

      {!isSynced && (
        <SyncMessage>
          Sincronização da{' '}
          {history?.status === 'departure' ? 'partida' : 'chegada'} pendente.
        </SyncMessage>
      )}
    </Container>
  )
}
