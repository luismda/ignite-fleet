import * as TaskManager from 'expo-task-manager'

import {
  Accuracy,
  stopLocationUpdatesAsync,
  startLocationUpdatesAsync,
  hasStartedLocationUpdatesAsync,
} from 'expo-location'

import {
  saveLocation,
  removeLocations,
} from '@/libs/async-storage/locations-storage'

const LOCATION_UPDATES_INTERVAL = 1000 * 1 // 1 second
export const BACKGROUND_TASK_NAME = '@ignite-fleet:location-tracking'

TaskManager.defineTask(BACKGROUND_TASK_NAME, async ({ data, error }: any) => { // eslint-disable-line
  try {
    if (error) {
      throw error
    }

    if (data) {
      const { coords, timestamp } = data.locations[0]

      const currentLocation = {
        timestamp,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }

      await saveLocation(currentLocation)
    }
  } catch (error) {
    console.debug(error)
    stopLocationTask()
  }
})

export async function startLocationTask() {
  try {
    const started = await hasStartedLocationUpdatesAsync(BACKGROUND_TASK_NAME)

    if (started) {
      await stopLocationTask()
    }

    await startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      distanceInterval: 1,
      accuracy: Accuracy.Highest,
      timeInterval: LOCATION_UPDATES_INTERVAL,
    })
  } catch (error) {
    console.debug(error)
  }
}

export async function stopLocationTask() {
  try {
    const started = await hasStartedLocationUpdatesAsync(BACKGROUND_TASK_NAME)

    if (started) {
      await stopLocationUpdatesAsync(BACKGROUND_TASK_NAME)
      await removeLocations()
    }
  } catch (error) {
    console.debug(error)
  }
}
