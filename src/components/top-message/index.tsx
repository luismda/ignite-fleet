import { ElementType } from 'react'
import { IconProps } from 'phosphor-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { THEME } from '@/theme/default'

import { Container, Title } from './styles'

interface TopMessageProps {
  icon?: ElementType<IconProps>
  title: string
}

export function TopMessage({ icon: Icon, title }: TopMessageProps) {
  const insets = useSafeAreaInsets()

  const hasIcon = !!Icon
  const paddingTop = insets.top + 5

  return (
    <Container style={{ paddingTop }}>
      {hasIcon && <Icon size={18} color={THEME.COLORS.GRAY_100} />}

      <Title>{title}</Title>
    </Container>
  )
}
