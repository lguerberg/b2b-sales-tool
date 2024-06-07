import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ROUTES } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isPrivatePath(pathname: string) {
  const route = Object.values(ROUTES).find(route => route.path === pathname)
  if (!route) {
    return null
  }
  return route.private
}
