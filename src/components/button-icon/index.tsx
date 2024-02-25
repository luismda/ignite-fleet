import { ElementType } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { IconProps } from 'phosphor-react-native'

import { THEME } from '@/theme/default'

import { Container } from './styles'

interface ButtonIconProps extends TouchableOpacityProps {
  icon: ElementType<IconProps>
}

export function ButtonIcon({ icon: Icon, ...rest }: ButtonIconProps) {
  return (
    <Container activeOpacity={0.7} {...rest}>
      <Icon size={24} color={THEME.COLORS.BRAND_MID} />
    </Container>
  )
}
