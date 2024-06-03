import * as bcrypt from 'bcrypt'

export const comparePasswords = async (password: string, passwordToCompare: string) =>
  bcrypt.compare(password, passwordToCompare)

export const hashPassword = async (password: string) => bcrypt.hash(password, 10)
