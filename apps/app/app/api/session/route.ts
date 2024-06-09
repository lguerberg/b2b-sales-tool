import { USER_COOKIE } from '@app/lib/constants'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({ token: cookies().get(USER_COOKIE)?.value || '' })
  } catch (error) {
    return NextResponse.json('Error fetching session', { status: 400 })
  }
}
