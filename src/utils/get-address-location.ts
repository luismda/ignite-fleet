import { reverseGeocodeAsync } from 'expo-location'

type Coords = {
  latitude: number
  longitude: number
}

export async function getAddressLocation({ latitude, longitude }: Coords) {
  try {
    const [addressResponse] = await reverseGeocodeAsync({ latitude, longitude })
    return addressResponse?.street
  } catch (error) {
    console.debug(error)
    return null
  }
}
