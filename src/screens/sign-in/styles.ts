import { styled, css } from 'styled-components/native'

export const Container = styled.ImageBackground`
  flex: 1;
  justify-content: center;

  padding: 52px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`

export const Title = styled.Text`
  text-align: center;

  ${({ theme }) => css`
    color: ${theme.COLORS.BRAND_LIGHT};

    font-size: ${theme.FONT_SIZE.XXXL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`

export const Slogan = styled.Text`
  text-align: center;
  margin-bottom: 32px;

  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};

    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`
