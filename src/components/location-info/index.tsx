import { Container, Description, Info, Label } from './styles'

import { IconBox, IconElementType } from '@/components/icon-box'

interface LocationInfoProps {
  label: string
  description: string
  icon: IconElementType
}

export function LocationInfo({ label, description, icon }: LocationInfoProps) {
  return (
    <Container>
      <IconBox icon={icon} />

      <Info>
        <Label numberOfLines={1}>{label}</Label>
        <Description numberOfLines={1}>{description}</Description>
      </Info>
    </Container>
  )
}
