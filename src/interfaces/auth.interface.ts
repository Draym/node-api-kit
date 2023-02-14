export interface DataStoredInToken {
  userId: number
  userUuid: string
  jti: string
}

export interface DataStoredInApiKey {
  appId: number
  ownerId: number
  ownerUuid: string
}

export interface AuthData {
  token: DataStoredInToken | null
  apiKey: DataStoredInApiKey | null
}

export interface CallerData {
  id: number
  uuid: string
}