import { useCallback, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { ThemeProvider } from 'styled-components/native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { THEME } from '@/theme/default'
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

      <ThemeProvider theme={THEME}>
        <SignIn />
      </ThemeProvider>
    </>
  )
}
