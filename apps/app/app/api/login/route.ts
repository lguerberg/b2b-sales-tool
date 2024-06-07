import api, { ApiError } from '@app/lib/api'
import { USER_COOKIE } from '@app/lib/constants'
import { AxiosError } from 'axios'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

type LoginResponse = { token: string }

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  try {
    const result = await api.post<LoginResponse>('/auth/login', { email, password })
    cookies().set(USER_COOKIE, result.data.token)
    return NextResponse.json({ message: 'Login successful' })
  } catch (error) {
    const err = error as AxiosError<ApiError>
    return NextResponse.json(err.response?.data, { status: err.response?.status })
  }
}
