'use client'

import { LoginSchema, loginSchema } from '@app/lib/schemas/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import useLogin from '../mutations/useLogin'

export default function useLoginForm() {
  const { mutate: login, isPending } = useLogin()
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: LoginSchema) => login(values)

  return { form, loading: isPending, onSubmit }
}
