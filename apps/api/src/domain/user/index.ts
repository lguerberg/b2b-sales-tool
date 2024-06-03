import { Company } from '../company'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  password: string
  avatarUrl?: string
  company: Company
}
