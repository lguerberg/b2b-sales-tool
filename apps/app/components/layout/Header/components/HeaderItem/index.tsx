import Link from 'next/link'

import { HeaderItemProps } from './types'

export default function HeaderItem({ path, id, isActive }: HeaderItemProps) {
  return (
    <Link
      href={path}
      className={`text-${!isActive ? 'muted' : ''}-foreground transition-colors hover:text-foreground cursor-pointer`}
    >
      {id}
    </Link>
  )
}
