import { SectionTitleProps } from './types'

export default function SectionTitle({ children, className }: SectionTitleProps) {
  return <p className={`text-xl lg:text-2xl font-extrabold ${className}`}>{children}</p>
}
