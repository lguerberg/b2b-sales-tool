import { Skeleton } from '@app/components/ui/skeleton'

import { SectionDescriptionProps } from './types'

export default function SectionDescription({ children, isLoading = false }: SectionDescriptionProps) {
  return isLoading ? (
    <Skeleton className="w-[500px] h-[20px] lg:h-[28px] rounded" />
  ) : (
    <p className="text-sm lg:text-lg">{children}</p>
  )
}
