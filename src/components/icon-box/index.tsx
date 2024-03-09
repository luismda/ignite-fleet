import { ElementType } from 'react'
import { IconProps } from 'phosphor-react-native'

import { THEME } from '@/theme/default'

import { Container, Size } from './styles'

export type IconElementType = ElementType<IconProps>

interface IconBoxProps {
  size?: Size
  icon: IconElementType
}

const ICON_SIZE: { [key in Size]: number } = {
  SMALL: 16,
  DEFAULT: 24,
}

export function IconBox({ size = 'DEFAULT', icon: Icon }: IconBoxProps) {
  const iconSize = ICON_SIZE[size]

  return (
    <Container size={size}>
      <Icon size={iconSize} color={THEME.COLORS.BRAND_LIGHT} />
    </Container>
  )
}
