import Realm, { SyncConfiguration } from 'realm'
import { createRealmContext } from '@realm/react'

import { History } from './schemas/history'

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
}

export const syncConfig: Partial<SyncConfiguration> = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
  existingRealmFileBehavior: realmAccessBehavior,
}

export const { useRealm, useQuery, useObject, RealmProvider } =
  createRealmContext({
    schema: [History],
  })
