import { Checkbox } from 'antd'
import type { CheckboxOptionType } from 'antd/es/checkbox'
import type { MemberRecord } from '../types/record'
import type { FieldDefinition } from '../types/fields'

export type FilterValue = string | boolean

export type FilterState = {
  [fieldId: string]: FilterValue[]
}

interface Props {
  field: FieldDefinition
  records: MemberRecord[]
  selected: FilterValue[]
  onChange: (next: FilterValue[]) => void
}

export const FilterDropdown = ({
  field,
  records,
  selected,
  onChange,
}: Props) => {
  const uniqueValues = Array.from(
    new Set(
      records
        .map((r) => r[field.id as keyof MemberRecord])
        .filter((v) => v !== undefined)
    )
  )

  const options: CheckboxOptionType[] = uniqueValues.map((val) => ({
    label:
      field.type === 'checkbox'
        ? val === true
          ? '선택됨'
          : '선택 안함'
        : String(val),
    value: val,
  }))

  return (
    <div style={{ padding: 8, maxHeight: 200, overflowY: 'auto' }}>
      <Checkbox.Group
        style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
        options={options}
        value={selected}
        onChange={onChange}
      />
    </div>
  )
}
