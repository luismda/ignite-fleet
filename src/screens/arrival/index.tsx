import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { X } from 'phosphor-react-native'
import { BSON } from 'realm'

import { useObject, useRealm } from '@/libs/realm'
import { History } from '@/libs/realm/schemas/history'

import {
  Label,
  Footer,
  Content,
  Container,
  Description,
  LicensePlate,
} from './styles'

import { Header } from '@/components/header'
import { Button } from '@/components/button'
import { ButtonIcon } from '@/components/button-icon'

type RouteParams = {
  id: string
}

export function Arrival() {
  const route = useRoute()
  const navigation = useNavigation()

  const { id } = route.params as RouteParams

  const realm = useRealm()
  const history = useObject(History, new BSON.UUID(id) as unknown as string)

  function removeVehicleUsage() {
    try {
      realm.write(() => {
        realm.delete(history)
      })

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

  function handleRegisterArrival() {
    if (!history) {
      Alert.alert(
        'Registrar chegada',
        `Ocorreu uma falha inesperada ao registrar a chegada do veículo.`,
      )

      return
    }

    try {
      realm.write(() => {
        history.status = 'arrival'
        history.updated_at = new Date()
      })

      navigation.goBack()
    } catch (error) {
      console.debug(error)

      Alert.alert(
        'Registrar chegada',
        `Ocorreu uma falha inesperada ao registrar a chegada do veículo.`,
      )
    }
  }

  const isDeparture = history?.status === 'departure'
  const title = isDeparture ? 'Chegada' : 'Histórico'

  return (
    <Container>
      <Header title={title} />

      <Content>
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

          <Button title="Registrar chegada" onPress={handleRegisterArrival} />
        </Footer>
      )}
    </Container>
  )
}
