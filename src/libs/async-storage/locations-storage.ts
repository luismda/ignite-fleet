import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@ignite-fleet:locations-tracking'

type Location = {
  latitude: number
  longitude: number
  timestamp: number
}

export async function getLocations() {
  const storage = await AsyncStorage.getItem(STORAGE_KEY)
  const response: Location[] = storage ? JSON.parse(storage) : []

  return response
}

export async function saveLocation(location: Location) {
  const locations = await getLocations()
  const newLocations = [...locations, location]

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newLocations))
}

export async function removeLocations() {
  await AsyncStorage.removeItem(STORAGE_KEY)
}
