import { Button, Checkbox, ConfigProvider, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { MemberRecord } from './types/record'
import type { FieldDefinition } from './types/fields'

import './App.css'
import { useState } from 'react'
import { useRecordModal } from './hooks/useRecordModal'

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

function App() {
  const [records, setRecords] = useState<MemberRecord[]>([])

  const { show, modal } = useRecordModal({
    fields: coreFields,
    onSubmit: (record) => {
      setRecords((prev) => [...prev, record])
    },
  })

  const columns: ColumnsType<MemberRecord> = coreFields.map((field) => ({
    title: field.label,
    dataIndex: field.id,
    key: field.id,
    render: (val) => {
      if (field.type === 'checkbox') {
        return <Checkbox checked={val} disabled />
      }
      return val
    },
  }))

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
          <Button type="primary" onClick={show}>
            + 추가
          </Button>
        </div>

        <Table<MemberRecord>
          rowKey="id"
          columns={columns}
          dataSource={records}
          pagination={false}
          bordered
        />

        {modal}
      </div>
    </ConfigProvider>
  )
}

export default App
