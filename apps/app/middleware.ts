import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { ROUTES, USER_COOKIE } from './lib/constants'
import { isPrivatePath } from './lib/utils'

export function middleware(request: NextRequest) {
  const userToken = cookies().get(USER_COOKIE)

  if (userToken && request.nextUrl.pathname.startsWith(ROUTES.LOGIN.path)) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD.path, request.url))
  }

  const isPrivate = isPrivatePath(request.nextUrl.pathname)

  if (isPrivate === null) {
    return
  }

  if (!userToken && isPrivate) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN.path, request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
