'use client'

import { Button } from '@app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@app/components/ui/dropdown-menu'
import { ROUTES } from '@app/lib/constants'
import useLogout from '@app/lib/hooks/mutations/useLogout'
import { CircleUser } from 'lucide-react'
import Link from 'next/link'

export default function ProfileDropdown() {
  const { mutate: logout } = useLogout()

  return (
    <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Link href={ROUTES.PROFILE.path}>Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
