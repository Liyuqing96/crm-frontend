export type User = {
  id: number
  name: string
  email: string
  role?: string
}

export type UserListResponse = {
  code: number
  data: User[]
  message: string
}
