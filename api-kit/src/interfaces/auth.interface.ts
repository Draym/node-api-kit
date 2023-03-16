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

export interface AuthRawData {
  token: string | null
  apiKey: string | null
}

export interface CallerData {
  id: number
  uuid: string
  email?: string
}