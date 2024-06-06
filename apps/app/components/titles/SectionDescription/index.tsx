import { SectionDescriptionProps } from './types'

export default function SectionDescription({ children }: SectionDescriptionProps) {
  return <p className="text-l lg:text-lg font-semibold">{children}</p>
}
