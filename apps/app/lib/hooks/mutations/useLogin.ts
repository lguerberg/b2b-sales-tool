'use client'

import { useToast } from '@app/components/ui/use-toast'
import { ApiError } from '@app/lib/api'
import { ROUTES } from '@app/lib/constants'
import { LoginSchema } from '@app/lib/schemas/login'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function useLogin() {
  const { toast } = useToast()
  const router = useRouter()

  return useMutation({
    mutationKey: ['Login'],
    mutationFn: async (values: LoginSchema) => {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const error: ApiError = await res.json()
        toast({
          title: 'Error',
          description: error.data.errors.join(', '),
          variant: 'destructive',
        })
      }

      return res.json()
    },
    onSuccess: () => {
      router.push(ROUTES.DASHBOARD.path)
    },
  })
}
