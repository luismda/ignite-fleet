import '@/libs/dayjs'
import 'react-native-get-random-values'

import { useCallback, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { WifiSlash } from 'phosphor-react-native'
import * as SplashScreen from 'expo-splash-screen'
import { ThemeProvider } from 'styled-components/native'
import { AppProvider, UserProvider } from '@realm/react'
import { useNetInfo } from '@react-native-community/netinfo'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { THEME } from '@/theme/default'
import { RealmProvider, syncConfig } from '@/libs/realm'

import { Routes } from '@/routes'
import { SignIn } from '@/screens/sign-in'
import { Loading } from '@/components/loading'
import { TopMessage } from '@/components/top-message'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const netInfo = useNetInfo()

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
            {!netInfo.isConnected && (
              <TopMessage title="Você está off-line." icon={WifiSlash} />
            )}

            <UserProvider fallback={SignIn}>
              <RealmProvider sync={syncConfig} fallback={Loading}>
                <Routes />
              </RealmProvider>
            </UserProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </AppProvider>
    </>
  )
}
