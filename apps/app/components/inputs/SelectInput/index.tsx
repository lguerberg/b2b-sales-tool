import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@app/components/ui/select'

import { SelectInputProps } from './types'

export function SelectInput({ options = [], onChange }: SelectInputProps) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, i) => (
          <SelectItem key={option.label} value={option.value.toString()}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
