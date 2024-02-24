import { TouchableOpacityProps } from 'react-native'
import { Key, Car } from 'phosphor-react-native'

import { THEME } from '@/theme/default'

import { Container, IconBox, Message, TextHighlight } from './styles'

interface CarStatusProps extends TouchableOpacityProps {
  licensePlate?: string | null
}

export function CarStatus({ licensePlate = null, ...rest }: CarStatusProps) {
  const Icon = licensePlate ? Car : Key

  const message = licensePlate
    ? `Veículo ${licensePlate} em uso. `
    : `Nenhum veículo em uso. `

  const status = licensePlate ? 'chegada' : 'saída'

  return (
    <Container activeOpacity={0.7} {...rest}>
      <IconBox>
        <Icon size={32} color={THEME.COLORS.BRAND_LIGHT} />
      </IconBox>

      <Message style={{ textAlignVertical: 'center' }}>
        {message}

        <TextHighlight>Toque aqui para registrar a {status}.</TextHighlight>
      </Message>
    </Container>
  )
}
