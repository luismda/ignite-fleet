import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@ignite-fleet:last_sync_date'

export async function saveLastSyncTimestamp() {
  const timestamp = new Date().getTime()
  await AsyncStorage.setItem(STORAGE_KEY, timestamp.toString())

  return timestamp
}

export async function getLastSyncTimestamp() {
  const response = await AsyncStorage.getItem(STORAGE_KEY)
  return Number(response)
}
