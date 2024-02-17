import { useState } from 'react'
import { Alert } from 'react-native'
import { Realm, useApp } from '@realm/react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { Container, Title, Slogan } from './styles'

import { Button } from '@/components/button'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
})

export function SignIn() {
  const app = useApp()

  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function handleGoogleSignIn() {
    setIsAuthenticating(true)

    try {
      const { idToken } = await GoogleSignin.signIn()

      if (!idToken) {
        setIsAuthenticating(false)

        Alert.alert(
          'Entrar com Google',
          'Ocorreu uma falha ao conectar à sua conta Google.',
        )

        return
      }

      const credentials = Realm.Credentials.jwt(idToken)
      await app.logIn(credentials)
    } catch (error) {
      console.debug(error)
      setIsAuthenticating(false)

      Alert.alert(
        'Entrar com Google',
        'Ocorreu uma falha ao conectar à sua conta Google.',
      )
    }
  }

  return (
    <Container source={require('@/assets/background.png')}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title="Entrar com Google"
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  )
}
