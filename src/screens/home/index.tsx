import { Alert, FlatList } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'

import { useQuery, useRealm } from '@/libs/realm'
import { History } from '@/libs/realm/schemas/history'

import { Container, Content, Label, Title } from './styles'

import { CarStatus } from '@/components/car-status'
import { HomeHeader } from '@/components/home-header'
import { HistoryCard, HistoryData } from '@/components/history-card'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<History | null>(null)
  const [vehiclesHistory, setVehiclesHistory] = useState<HistoryData[]>([])

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

  const fetchHistory = useCallback(() => {
    try {
      const response = history.filtered(
        `status = 'arrival' SORT(created_at DESC)`,
      )

      const vehicles = response.map<HistoryData>((item) => ({
        id: item._id.toString(),
        isSync: false,
        licensePlate: item.license_plate,
        createdAt: dayjs(item.created_at).format(
          '[Saída em] DD/MM/YYYY [às] HH:mm',
        ),
      }))

      setVehiclesHistory(vehicles)
    } catch (error) {
      console.debug(error)

      Alert.alert(
        'Histórico',
        `Ocorreu uma falha inesperada ao buscar o histórico de veículos utilizados.`,
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

  function handleViewVehicleDetails(id: string) {
    navigation.navigate('arrival', { id })
  }

  useEffect(() => {
    fetchVehicleInUse()
  }, [fetchVehicleInUse])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  useEffect(() => {
    const refetchQueries = () => {
      fetchVehicleInUse()
      fetchHistory()
    }

    realm.addListener('change', refetchQueries)

    return () => {
      realm.removeListener('change', refetchQueries)
    }
  }, [realm, fetchVehicleInUse, fetchHistory])

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <FlatList
          data={vehiclesHistory}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 112 }}
          ListHeaderComponent={<Title>Histórico</Title>}
          ListEmptyComponent={<Label>Nenhum veículo registrado.</Label>}
          renderItem={({ item }) => (
            <HistoryCard
              data={item}
              onPress={() => handleViewVehicleDetails(item.id)}
            />
          )}
        />
      </Content>
    </Container>
  )
}
