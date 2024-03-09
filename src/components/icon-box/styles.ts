import { styled, css } from 'styled-components/native'

export type Size = 'SMALL' | 'DEFAULT'

interface ContainerProps {
  size: Size
}

const makeSizeVariantStyle = (size: Size) =>
  ({
    SMALL: css`
      width: 32px;
      height: 32px;
    `,
    DEFAULT: css`
      width: 46px;
      height: 46px;
    `,
  })[size]

export const Container = styled.View<ContainerProps>`
  margin-right: 12px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  align-items: center;
  justify-content: center;

  ${({ size }) => makeSizeVariantStyle(size)}
`
