import Realm, { SyncConfiguration } from 'realm'
import { createRealmContext } from '@realm/react'

import { Coords } from './schemas/coords'
import { History } from './schemas/history'

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.DownloadBeforeOpen,
}

export const syncConfig: Partial<SyncConfiguration> = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
  existingRealmFileBehavior: realmAccessBehavior,
}

export const { useRealm, useQuery, useObject, RealmProvider } =
  createRealmContext({
    schema: [History, Coords],
  })
