export interface CoreMemberFields {
  id: string
  name: string
  address?: string
  memo?: string
  joinedAt: string
  job?: string
  newsletter?: boolean
}
export interface CustomFields {
  [customFieldId: string]: string | boolean | undefined
}

export type MemberRecord = CoreMemberFields & CustomFields
