import 'styled-components/native'

import { THEME } from '@/theme/default'

declare module 'styled-components/native' {
  type ThemeType = typeof THEME

  export interface DefaultTheme extends ThemeType {}
}
