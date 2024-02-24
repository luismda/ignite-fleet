import { TouchableOpacity } from 'react-native'
import { ArrowLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { THEME } from '@/theme/default'

import { Container, Title } from './styles'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const paddingTop = insets.top + 42

  return (
    <Container style={{ paddingTop }}>
      <TouchableOpacity activeOpacity={0.7} onPress={navigation.goBack}>
        <ArrowLeft size={24} weight="bold" color={THEME.COLORS.BRAND_LIGHT} />
      </TouchableOpacity>

      <Title>{title}</Title>
    </Container>
  )
}
