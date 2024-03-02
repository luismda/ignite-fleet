import { Alert, FlatList } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { CloudArrowUp } from 'phosphor-react-native'
import Toast from 'react-native-toast-message'
import { useUser } from '@realm/react'
import Realm from 'realm'
import dayjs from 'dayjs'

import {
  getLastSyncTimestamp,
  saveLastSyncTimestamp,
} from '@/libs/async-storage/sync-storage'

import { useQuery, useRealm } from '@/libs/realm'
import { History } from '@/libs/realm/schemas/history'

import { Container, Content, Label, Title } from './styles'

import { CarStatus } from '@/components/car-status'
import { HomeHeader } from '@/components/home-header'
import { TopMessage } from '@/components/top-message'
import { HistoryCard, HistoryData } from '@/components/history-card'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<History | null>(null)
  const [vehiclesHistory, setVehiclesHistory] = useState<HistoryData[]>([])
  const [percentageToSync, setPercentageToSync] = useState<string | null>(null)

  const user = useUser()
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

  const fetchHistory = useCallback(async () => {
    try {
      const response = history.filtered(
        `status = 'arrival' SORT(created_at DESC)`,
      )

      const lastSyncTimestamp = await getLastSyncTimestamp()

      const vehicles = response.map<HistoryData>((item) => ({
        id: item._id.toString(),
        licensePlate: item.license_plate,
        isSync: lastSyncTimestamp > item.updated_at.getTime(),
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

  const progressNotification = useCallback(
    async (transferred: number, transferrable: number) => {
      const percentage = (transferred / transferrable) * 100

      if (percentage === 100) {
        await saveLastSyncTimestamp()
        await fetchHistory()

        setPercentageToSync(null)

        Toast.show({
          type: 'info',
          text1: 'Todos os dados estão sincronizados.',
        })

        return
      }

      if (percentage < 100) {
        setPercentageToSync(`${percentage.toFixed(0)}% sincronizado.`)
      }
    },
    [fetchHistory],
  )

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
      if (realm && !realm.isClosed) {
        realm.removeListener('change', refetchQueries)
      }
    }
  }, [realm, fetchVehicleInUse, fetchHistory])

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historyByUserQuery = realm
        .objects('history')
        .filtered(`user_id = '${user.id}'`)

      mutableSubs.add(historyByUserQuery, { name: 'history_by_user' })
    })
  }, [realm, user])

  useEffect(() => {
    const syncSession = realm.syncSession

    if (!syncSession) return

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification,
    )

    return () => {
      syncSession.removeProgressNotification(progressNotification)
    }
  }, [realm, progressNotification])

  return (
    <Container>
      {!!percentageToSync && (
        <TopMessage title={percentageToSync} icon={CloudArrowUp} />
      )}

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
