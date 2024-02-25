import { TouchableOpacityProps } from 'react-native'
import { Check, ClockClockwise } from 'phosphor-react-native'

import { THEME } from '@/theme/default'

import { Container, Departure, Info, LicensePlate } from './styles'

export type HistoryData = {
  id: string
  isSync: boolean
  createdAt: string
  licensePlate: string
}

interface HistoryCardProps extends TouchableOpacityProps {
  data: HistoryData
}

export function HistoryCard({ data, ...rest }: HistoryCardProps) {
  return (
    <Container activeOpacity={0.7} {...rest}>
      <Info>
        <LicensePlate>{data.licensePlate}</LicensePlate>
        <Departure>{data.createdAt}</Departure>
      </Info>

      {data.isSync ? (
        <Check size={24} color={THEME.COLORS.BRAND_LIGHT} />
      ) : (
        <ClockClockwise size={24} color={THEME.COLORS.GRAY_400} />
      )}
    </Container>
  )
}
