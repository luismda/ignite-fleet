import { Realm } from '@realm/react'
import { ObjectSchema } from 'realm'

export type CoordsSchema = {
  latitude: number
  longitude: number
  timestamp: number
}

export class Coords extends Realm.Object<Coords> {
  latitude!: number
  longitude!: number
  timestamp!: number

  static generate({ latitude, longitude, timestamp }: CoordsSchema) {
    return {
      latitude,
      longitude,
      timestamp,
    }
  }

  static schema: ObjectSchema = {
    name: 'coords',
    embedded: true,
    properties: {
      latitude: 'float',
      longitude: 'float',
      timestamp: 'int',
    },
  }
}
