import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '@/screens/home'
import { Arrival } from '@/screens/arrival'
import { Departure } from '@/screens/departure'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="arrival" component={Arrival} />
      <Screen name="departure" component={Departure} />
    </Navigator>
  )
}
