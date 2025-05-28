import { Button, Checkbox, ConfigProvider, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { MemberRecord } from './types/record'
import type { FieldDefinition } from './types/fields'

import './App.css'
import { useState } from 'react'
import { useRecordModal } from './hooks/useRecordModal'
import { RecordActionMenu } from './componets/RecordActionMenu'
import {
  FilterDropdown,
  type FilterState,
  type FilterValue,
} from './componets/FilterDropdown'
import { useStorage } from './hooks/useStorage'

const coreFields: FieldDefinition[] = [
  { id: 'name', label: '이름', type: 'text', required: true, maxLen: 20 },
  { id: 'address', label: '주소', type: 'text', required: false, maxLen: 20 },
  { id: 'memo', label: '메모', type: 'textarea', required: false, maxLen: 50 },
  { id: 'joinedAt', label: '가입일', type: 'date', required: true },
  {
    id: 'job',
    label: '직업',
    type: 'select',
    required: false,
    options: ['개발자', 'PO', '디자이너'],
  },
  {
    id: 'newsletter',
    label: '이메일 수신 동의',
    type: 'checkbox',
    required: false,
  },
]

const App = () => {
  const [records, setRecords] = useStorage<MemberRecord[]>('records', [])
  const [filters, setFilters] = useState<FilterState>({})

  const { show, modal } = useRecordModal({
    fields: coreFields,
    onSubmit: (record) => {
      setRecords((prev) => {
        const exists = prev.find((r) => r.id === record.id)
        return exists
          ? prev.map((r) => (r.id === record.id ? record : r))
          : [...prev, record]
      })
    },
  })

  const handleFilterChange = (fieldId: string, values: FilterValue[]) => {
    setFilters((prev) => ({ ...prev, [fieldId]: values }))
  }

  const filteredRecords = records.filter((record) =>
    Object.entries(filters).every(([fieldId, values]) => {
      if (values.length === 0) return true

      const val = record[fieldId as keyof MemberRecord]
      return val !== undefined && values.includes(val)
    })
  )

  const columns: ColumnsType<MemberRecord> = [
    ...coreFields.map((field) => ({
      title: field.label,
      dataIndex: field.id,
      key: field.id,
      render: (val: boolean) => {
        if (field.type === 'checkbox') {
          return <Checkbox checked={val} />
        }
        return val
      },
      filterDropdown: () => (
        <FilterDropdown
          field={field}
          records={records}
          selected={filters[field.id] || []}
          onChange={(next) => handleFilterChange(field.id, next)}
        />
      ),
    })),
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <RecordActionMenu
          record={record}
          onEdit={(rec) => {
            show(rec)
          }}
          onDelete={(id) => {
            setRecords((prev) => prev.filter((r) => r.id !== id))
          }}
        />
      ),
    },
  ]

  return (
    <ConfigProvider>
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              margin: 0,
            }}
          >
            회원 목록
          </h1>
          <Button type="primary" onClick={() => show()}>
            + 추가
          </Button>
        </div>

        <Table<MemberRecord>
          rowKey="id"
          columns={columns}
          dataSource={filteredRecords}
          pagination={false}
          bordered
        />

        {modal}
      </div>
    </ConfigProvider>
  )
}

export default App
