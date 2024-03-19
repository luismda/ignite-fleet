import { Platform, Linking } from 'react-native'

export function openDeviceSettings() {
  if (Platform.OS === 'ios') {
    return Linking.openURL('app-settings:')
  }

  if (Platform.OS === 'android') {
    return Linking.openSettings()
  }
}
