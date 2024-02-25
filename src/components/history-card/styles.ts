import { styled, css } from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  flex-direction: row;
  align-items: center;

  border-radius: 6px;
  padding: 20px 16px;
  margin-bottom: 12px;
`

export const Info = styled.View`
  flex: 1;
`

export const LicensePlate = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};

    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`

export const Departure = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};

    font-size: ${theme.FONT_SIZE.XS}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}

  margin-top: 4px;
`
