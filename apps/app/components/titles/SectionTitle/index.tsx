import { Skeleton } from '@app/components/ui/skeleton'

import { SectionTitleProps } from './types'

export default function SectionTitle({ children, className, isLoading = false }: SectionTitleProps) {
  return isLoading ? (
    <Skeleton className="w-[500px] h-[28px] lg:h-[32px] rounded" />
  ) : (
    <p className={`text-xl lg:text-2xl font-extrabold ${className}`}>{children}</p>
  )
}
