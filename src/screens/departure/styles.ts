import { styled, css } from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`

export const Content = styled.View`
  flex: 1;
  gap: 16px;
  padding: 32px;
  margin-top: 16px;
`

export const MessageContent = styled.View`
  flex: 1;
  gap: 44px;
  padding: 32px;

  justify-content: center;
`

export const Message = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_400};

    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}

  text-align: center;
`
