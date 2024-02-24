import { useRef } from 'react'

import {
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'

import { Container, Content } from './styles'

import { Header } from '@/components/header'
import { Button } from '@/components/button'
import { TextAreaInput } from '@/components/text-area-input'
import { LicensePlateInput } from '@/components/license-plate-input'

const BEHAVIOR = Platform.OS === 'android' ? 'height' : 'position'

export function Departure() {
  const descriptionInputRef = useRef<TextInput>(null)

  function handleRegisterDeparture() {
    console.log('ok')
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={BEHAVIOR}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Content>
            <LicensePlateInput
              label="Placa do veículo"
              placeholder="BRA1234"
              returnKeyType="next"
              onSubmitEditing={() => descriptionInputRef.current?.focus()}
            />

            <TextAreaInput
              ref={descriptionInputRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              returnKeyType="send"
              blurOnSubmit
              onSubmitEditing={handleRegisterDeparture}
            />

            <Button title="Registrar saída" onPress={handleRegisterDeparture} />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  )
}
