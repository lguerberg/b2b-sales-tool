'use client'

import { Button } from '@app/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useMemo } from 'react'

import { TextButtonProps } from './types'

export default function TextButton({
  children,
  loading = false,
  disabled = false,
  type,
  className = '',
  onClick = () => {},
}: TextButtonProps) {
  const isDisabled = useMemo(() => loading || disabled, [loading, disabled])

  return (
    <Button onClick={onClick} type={type} className={className} disabled={isDisabled}>
      {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : children}
    </Button>
  )
}
