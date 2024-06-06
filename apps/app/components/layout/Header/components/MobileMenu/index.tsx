import { Button } from '@app/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@app/components/ui/sheet'
import { Menu } from 'lucide-react'

import { HEADER_ITEMS } from '../../constants'
import HeaderItem from '../HeaderItem'

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          {HEADER_ITEMS.map(item => (
            <HeaderItem key={item.id} isActive={true} {...item} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
