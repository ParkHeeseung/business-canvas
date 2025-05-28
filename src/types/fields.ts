export type FieldType = 'text' | 'textarea' | 'date' | 'select' | 'checkbox'

export interface BaseField<T extends FieldType> {
  id: string
  label: string
  type: T
  required: boolean
}

export interface SelectField extends BaseField<'select'> {
  options: string[]
}

export interface LimitedTextField extends BaseField<'text' | 'textarea'> {
  maxLen: number
}

export type FieldDefinition =
  | LimitedTextField
  | SelectField
  | BaseField<'date'>
  | BaseField<'checkbox'>
