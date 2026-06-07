export interface AuthUser {
  id: number
  name: string
  email: string
  role: string
}

export interface AuthState {
    token: string | null
    user: AuthUser | null
}