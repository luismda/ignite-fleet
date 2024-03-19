import { Realm } from '@realm/react'
import { ObjectSchema } from 'realm'

import { CoordsSchema } from './coords'

type HistorySchema = {
  user_id: string
  description: string
  license_plate: string
  coords: CoordsSchema[]
}

export class History extends Realm.Object<History> {
  _id!: string
  user_id!: string
  license_plate!: string
  description!: string
  status!: string
  coords!: CoordsSchema[]
  created_at!: Date
  updated_at!: Date

  static generate({
    coords,
    user_id,
    description,
    license_plate,
  }: HistorySchema) {
    return {
      _id: new Realm.BSON.UUID(),
      coords,
      user_id,
      description,
      license_plate,
      status: 'departure',
      created_at: new Date(),
      updated_at: new Date(),
    }
  }

  static schema: ObjectSchema = {
    name: 'history',
    primaryKey: '_id',

    properties: {
      _id: 'uuid',
      user_id: {
        type: 'string',
        indexed: true,
      },
      license_plate: 'string',
      description: 'string',
      status: 'string',
      coords: {
        type: 'list',
        objectType: 'coords',
      },
      created_at: 'date',
      updated_at: 'date',
    },
  }
}
