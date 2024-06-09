import { LoginSchema } from '../schemas/login'

export const login = (values: LoginSchema) =>
  fetch(`${process.env.NEXT_API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })

export const logout = () =>
  fetch(`${process.env.NEXT_API_URL}/api/logout`, {
    method: 'POST',
  })
