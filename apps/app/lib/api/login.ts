import { LoginSchema } from '../schemas/login'

export const login = (values: LoginSchema) =>
  fetch(`/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })

export const logout = () =>
  fetch(`/api/logout`, {
    method: 'POST',
  })
