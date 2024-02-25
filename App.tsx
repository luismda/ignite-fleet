import 'react-native-get-random-values'

import { useCallback, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { ThemeProvider } from 'styled-components/native'
import { AppProvider, UserProvider } from '@realm/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { THEME } from '@/theme/default'
import { RealmProvider } from '@/lib/realm'

import { Routes } from '@/routes'
import { SignIn } from '@/screens/sign-in'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  const hideSplashScreen = useCallback(async () => {
    if (hasLoadedFonts) {
      await SplashScreen.hideAsync()
    }
  }, [hasLoadedFonts])

  useEffect(() => {
    hideSplashScreen()
  }, [hideSplashScreen])

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <AppProvider id={process.env.EXPO_PUBLIC_REALM_APP_ID!}>
        <ThemeProvider theme={THEME}>
          <SafeAreaProvider
            style={{ flex: 1, backgroundColor: THEME.COLORS.GRAY_800 }}
          >
            <UserProvider fallback={SignIn}>
              <RealmProvider>
                <Routes />
              </RealmProvider>
            </UserProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </AppProvider>
    </>
  )
}
