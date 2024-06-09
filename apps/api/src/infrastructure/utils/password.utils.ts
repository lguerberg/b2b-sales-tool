import { compare } from 'bcryptjs'
import { hash } from 'bcryptjs'

export const comparePasswords = async (password: string, passwordToCompare: string) =>
  compare(password, passwordToCompare)

export const hashPassword = async (password: string) => hash(password, 10)
