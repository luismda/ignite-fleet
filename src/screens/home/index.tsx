import { useNavigation } from '@react-navigation/native'

import { Container, Content } from './styles'

import { CarStatus } from '@/components/car-status'
import { HomeHeader } from '@/components/home-header'

export function Home() {
  const navigation = useNavigation()

  function handleRegisterMovement() {
    navigation.navigate('departure')
  }

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus onPress={handleRegisterMovement} />
      </Content>
    </Container>
  )
}
