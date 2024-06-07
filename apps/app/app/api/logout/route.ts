import { USER_COOKIE } from '@app/lib/constants'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    cookies().delete(USER_COOKIE)
    return NextResponse.json({ message: 'Logged out successful' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error logging out' }, { status: 400 })
  }
}
