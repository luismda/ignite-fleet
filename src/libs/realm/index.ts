import { createRealmContext } from '@realm/react'

import { History } from './schemas/history'

export const { useRealm, useQuery, useObject, RealmProvider } =
  createRealmContext({
    schema: [History],
  })
