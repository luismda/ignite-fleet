import { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'

import { THEME } from '@/theme/default'

import { Container, Input, Label } from './styles'

interface LicensePlateInputProps extends TextInputProps {
  label: string
}

export const LicensePlateInput = forwardRef<TextInput, LicensePlateInputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <Container>
        <Label>{label}</Label>

        <Input
          ref={ref}
          maxLength={7}
          autoCapitalize="characters"
          cursorColor={THEME.COLORS.BRAND_LIGHT}
          placeholderTextColor={THEME.COLORS.GRAY_400}
          {...rest}
        />
      </Container>
    )
  },
)

LicensePlateInput.displayName = 'LicensePlateInput'
