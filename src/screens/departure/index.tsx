import { useEffect, useRef, useState } from 'react'
import { Alert, TextInput } from 'react-native'
import { useUser } from '@realm/react'
import { Car } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  LocationAccuracy,
  watchPositionAsync,
  LocationSubscription,
  LocationObjectCoords,
  useForegroundPermissions,
  requestBackgroundPermissionsAsync,
} from 'expo-location'

import { useRealm } from '@/libs/realm'
import { History } from '@/libs/realm/schemas/history'
import { getAddressLocation } from '@/utils/get-address-location'
import { openDeviceSettings } from '@/utils/open-device-settings'
import { startLocationTask } from '@/tasks/background-location-task'
import { validateLicensePlate } from '@/utils/validate-license-plate'

import { Container, Content, Message, MessageContent } from './styles'

import { Map } from '@/components/map'
import { Header } from '@/components/header'
import { Button } from '@/components/button'
import { Loading } from '@/components/loading'
import { LocationInfo } from '@/components/location-info'
import { TextAreaInput } from '@/components/text-area-input'
import { LicensePlateInput } from '@/components/license-plate-input'

const WATCH_POSITION_INTERVAL = 1000 * 1 // 1 second

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLocationLoading, setIsLocationLoading] = useState(true)
  const [currentAddress, setCurrentAddress] = useState<string | null>(null)

  const [currentCoords, setCurrentCoords] =
    useState<LocationObjectCoords | null>(null)

  const descriptionInputRef = useRef<TextInput>(null)
  const licensePlateInputRef = useRef<TextInput>(null)

  const user = useUser()
  const realm = useRealm()
  const navigation = useNavigation()

  const [foregroundLocationPermission, requestForegroundLocationPermission] =
    useForegroundPermissions()

  async function handleRegisterDeparture() {
    try {
      const isValidPlate = validateLicensePlate(licensePlate)

      if (!isValidPlate) {
        Alert.alert(
          'Placa do veículo',
          `A placa do veículo é inválida. Por favor, informe a placa corretamente.`,
        )

        licensePlateInputRef.current?.focus()

        return
      }

      if (description.trim().length === 0) {
        Alert.alert(
          'Finalidade',
          `Por favor, informe a finalidade de uso do veículo.`,
        )

        descriptionInputRef.current?.focus()

        return
      }

      if (!currentCoords?.latitude && !currentCoords?.longitude) {
        Alert.alert(
          'Localização',
          `Não foi possível obter a sua localização atual no momento. Por favor, tente novamente.`,
        )

        return
      }

      setIsRegistering(true)

      const backgroundPermissions = await requestBackgroundPermissionsAsync()

      if (!backgroundPermissions.granted) {
        setIsRegistering(false)

        Alert.alert(
          'Localização',
          `É preciso acessar sua localização em segundo plano para registrar uma saída. Por favor, acesse as configurações do seu dispositivo e habilite a opção de localização "Permitir o tempo todo".`,
          [{ text: 'Abrir configurações', onPress: openDeviceSettings }],
        )

        return
      }

      await startLocationTask()

      realm.write(() => {
        realm.create(
          'history',
          History.generate({
            description,
            user_id: user.id,
            license_plate: licensePlate.toUpperCase(),
            coords: [
              {
                latitude: currentCoords.latitude,
                longitude: currentCoords.longitude,
                timestamp: new Date().getTime(),
              },
            ],
          }),
        )
      })

      navigation.goBack()
    } catch (error) {
      console.debug(error)

      setIsRegistering(false)

      Alert.alert(
        'Registrar veículo',
        `Ocorreu uma falha inesperada ao registrar a saída do veículo.`,
      )
    }
  }

  useEffect(() => {
    requestForegroundLocationPermission()
  }, [requestForegroundLocationPermission])

  useEffect(() => {
    if (!foregroundLocationPermission) return

    if (!foregroundLocationPermission.granted) {
      setIsLocationLoading(false)
      return
    }

    let subscription: LocationSubscription

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: WATCH_POSITION_INTERVAL,
      },
      async (location) => {
        const address = await getAddressLocation(location.coords)

        if (address) {
          setCurrentAddress(address)
          setCurrentCoords(location.coords)
        }

        setIsLocationLoading(false)
      },
    ).then((watchInstance) => (subscription = watchInstance))

    return () => subscription.remove()
  }, [foregroundLocationPermission])

  if (isLocationLoading || !foregroundLocationPermission) {
    return <Loading />
  }

  if (!foregroundLocationPermission.granted) {
    return (
      <Container>
        <Header title="Saída" />

        <MessageContent>
          <Message>
            Você precisa permitir que o aplicativo tenha acesso à localização
            para utilizar essa funcionalidade. Por favor, acesse as
            configurações do seu dispositivo para conceder essa permissão.
          </Message>

          <Button title="Abrir configurações" onPress={openDeviceSettings} />
        </MessageContent>
      </Container>
    )
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAwareScrollView
        extraHeight={100}
        showsVerticalScrollIndicator={false}
      >
        {!!currentCoords && <Map coords={[currentCoords]} />}

        <Content>
          {!!currentAddress && (
            <LocationInfo
              icon={Car}
              label="Localização atual"
              description={currentAddress}
            />
          )}

          <LicensePlateInput
            ref={licensePlateInputRef}
            placeholder="BRA1234"
            returnKeyType="next"
            value={licensePlate}
            label="Placa do veículo"
            onSubmitEditing={() => descriptionInputRef.current?.focus()}
            onChangeText={setLicensePlate}
          />

          <TextAreaInput
            ref={descriptionInputRef}
            label="Finalidade"
            returnKeyType="send"
            value={description}
            placeholder="Vou utilizar o veículo para..."
            blurOnSubmit
            onSubmitEditing={handleRegisterDeparture}
            onChangeText={setDescription}
          />

          <Button
            title="Registrar saída"
            isLoading={isRegistering}
            onPress={handleRegisterDeparture}
          />
        </Content>
      </KeyboardAwareScrollView>
    </Container>
  )
}
