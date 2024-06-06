'use client'

import HeaderItem from './components/HeaderItem'
import MobileMenu from './components/MobileMenu'
import { HEADER_ITEMS } from './constants'

export default function LayoutHeader() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {HEADER_ITEMS.map(item => (
          <HeaderItem key={item.id} isActive={true} {...item} />
        ))}
      </nav>
      <MobileMenu />
    </header>
  )
}
