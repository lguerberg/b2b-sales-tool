import { SectionSubtitleProps } from './types'

export default function SectionSubtitle({ children }: SectionSubtitleProps) {
  return <p className="text-l lg:text-xl font-bold">{children}</p>
}
