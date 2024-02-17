import { Container, Title, Slogan } from './styles'

import { Button } from '@/components/button'

export function SignIn() {
  return (
    <Container source={require('@/assets/background.png')}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>

      <Button title="Entrar com Google" />
    </Container>
  )
}
