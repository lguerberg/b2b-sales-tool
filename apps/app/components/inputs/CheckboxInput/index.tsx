import { Checkbox } from '@app/components/ui/checkbox'

import { CheckboxInputProps } from './types'

export function CheckboxInput({ value, onChange }: CheckboxInputProps) {
  return <Checkbox checked={value} onCheckedChange={onChange} />
}
