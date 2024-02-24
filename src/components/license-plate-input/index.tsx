import { TextInputProps } from 'react-native'

import { THEME } from '@/theme/default'

import { Container, Input, Label } from './styles'

interface LicensePlateInputProps extends TextInputProps {
  label: string
}

export function LicensePlateInput({ label, ...rest }: LicensePlateInputProps) {
  return (
    <Container>
      <Label>{label}</Label>

      <Input
        maxLength={7}
        autoCapitalize="characters"
        cursorColor={THEME.COLORS.BRAND_LIGHT}
        placeholderTextColor={THEME.COLORS.GRAY_400}
        {...rest}
      />
    </Container>
  )
}
