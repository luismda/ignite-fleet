import styled from 'styled-components/native'

import { THEME } from '@/theme/default'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${THEME.COLORS.GRAY_800};
`

export const LoadingIndicator = styled.ActivityIndicator.attrs(() => ({
  color: THEME.COLORS.BRAND_LIGHT,
}))``
