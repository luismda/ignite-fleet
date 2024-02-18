import { TouchableOpacity } from 'react-native'
import { Power } from 'phosphor-react-native'
import { useUser, useApp } from '@realm/react'

import { THEME } from '@/theme/default'

import { Container, Greeting, Message, Name, Picture } from './styles'

const PICTURE_BLUR_HASH = `L184i9ofbHof00ayjsay~qj[ayj@`

export function HomeHeader() {
  const app = useApp()
  const user = useUser()

  function handleLogout() {
    app.currentUser?.logOut()
  }

  return (
    <Container>
      <Picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder={PICTURE_BLUR_HASH}
      />

      <Greeting>
        <Message>Olá,</Message>
        <Name>{user?.profile.name}</Name>
      </Greeting>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <Power size={32} color={THEME.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  )
}
