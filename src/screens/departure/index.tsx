import { useRef, useState } from 'react'
import { Alert, TextInput } from 'react-native'
import { useUser } from '@realm/react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useRealm } from '@/libs/realm'
import { History } from '@/libs/realm/schemas/history'
import { validateLicensePlate } from '@/utils/validate-license-plate'

import { Container, Content } from './styles'

import { Header } from '@/components/header'
import { Button } from '@/components/button'
import { TextAreaInput } from '@/components/text-area-input'
import { LicensePlateInput } from '@/components/license-plate-input'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const descriptionInputRef = useRef<TextInput>(null)
  const licensePlateInputRef = useRef<TextInput>(null)

  const user = useUser()
  const realm = useRealm()
  const navigation = useNavigation()

  function handleRegisterDeparture() {
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

      setIsRegistering(true)

      realm.write(() => {
        realm.create(
          'history',
          History.generate({
            description,
            user_id: user.id,
            license_plate: licensePlate.toUpperCase(),
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

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAwareScrollView
        extraHeight={100}
        showsVerticalScrollIndicator={false}
      >
        <Content>
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
