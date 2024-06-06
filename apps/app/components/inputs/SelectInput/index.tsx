import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@app/components/ui/select'

import { SelectInputProps } from './types'

export function SelectInput({ options = [] }: SelectInputProps) {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.label}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
