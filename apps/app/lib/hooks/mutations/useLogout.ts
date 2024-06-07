'use client'

import { useToast } from '@app/components/ui/use-toast'
import { logout } from '@app/lib/api/login'
import { ROUTES } from '@app/lib/constants'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function useLogout() {
  const { toast } = useToast()
  const router = useRouter()

  return useMutation({
    mutationKey: ['Logout'],
    mutationFn: async () => {
      const res = await logout()

      if (!res.ok) {
        toast({
          title: 'Error',
          description: 'Error logging out',
          variant: 'destructive',
        })
      }

      return res.json()
    },
    onSuccess: () => {
      router.push(ROUTES.LOGIN.path)
    },
  })
}
