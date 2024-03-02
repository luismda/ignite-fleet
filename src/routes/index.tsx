import Toast from 'react-native-toast-message'
import { NavigationContainer } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AppRoutes } from './app.routes'
import { TopMessage } from '@/components/top-message'

export function Routes() {
  const insets = useSafeAreaInsets()

  return (
    <NavigationContainer>
      <AppRoutes />

      <Toast
        topOffset={insets.top}
        config={{ info: ({ text1 }) => <TopMessage title={String(text1)} /> }}
      />
    </NavigationContainer>
  )
}
