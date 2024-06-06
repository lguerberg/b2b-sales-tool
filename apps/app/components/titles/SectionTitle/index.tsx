import { SectionTitleProps } from './types'

export default function SectionTitle({ children }: SectionTitleProps) {
  return <p className="text-xl lg:text-2xl font-extrabold">{children}</p>
}
