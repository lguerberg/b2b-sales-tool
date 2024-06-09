import { compare, hash } from 'bcrypt'

export const comparePasswords = async (password: string, passwordToCompare: string) =>
  compare(password, passwordToCompare)

export const hashPassword = async (password: string) => hash(password, 10)
