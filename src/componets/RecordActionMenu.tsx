import { Dropdown, Button } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import type { MemberRecord } from '../types/record'
import type { MenuProps } from 'antd'

interface Props {
  record: MemberRecord
  onEdit: (record: MemberRecord) => void
  onDelete: (id: string) => void
}

export const RecordActionMenu = ({ record, onEdit, onDelete }: Props) => {
  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: '수정',
      onClick: () => onEdit(record),
    },
    {
      key: 'delete',
      label: '삭제',
      danger: true,
      onClick: () => onDelete(record.id),
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  )
}
