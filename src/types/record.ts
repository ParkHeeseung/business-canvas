export interface MemberRecord {
  id: string
  name: string
  address?: string
  memo?: string
  joinedAt: string
  job?: string // TODO: enum으로 분리
  newsletter?: boolean
}
