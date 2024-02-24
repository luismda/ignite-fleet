import { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'

import { THEME } from '@/theme/default'

import { Container, Input, Label } from './styles'

interface TextAreaInputProps extends TextInputProps {
  label: string
}

export const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <Container>
        <Label>{label}</Label>

        <Input
          ref={ref}
          multiline
          autoCapitalize="sentences"
          cursorColor={THEME.COLORS.BRAND_LIGHT}
          placeholderTextColor={THEME.COLORS.GRAY_400}
          {...rest}
        />
      </Container>
    )
  },
)

TextAreaInput.displayName = 'TextAreaInput'
