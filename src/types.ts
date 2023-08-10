export interface Auth{
  fullName: string,
  email: string,
  password: string
}

export type LoginPreview = Pick<Auth, 'email' | 'password'>

