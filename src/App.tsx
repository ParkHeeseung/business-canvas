import { Button, ConfigProvider, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { MemberRecord } from './types/record'
import './App.css'

const dataSource = [
  {
    id: '1',
    name: 'John Doe',
    address: '서울 강남구',
    memo: '외국인',
    joinedAt: '2024-10-02',
    job: '개발자',
    newsletter: true,
  },
  {
    id: '2',
    name: 'Foo Bar',
    address: '서울 서초구',
    memo: '한국인',
    joinedAt: '2024-10-01',
    job: 'PO',
    newsletter: false,
  },
]

const columns: ColumnsType<MemberRecord> = [
  { title: '이름', dataIndex: 'name', key: 'name' },
  { title: '주소', dataIndex: 'address', key: 'address' },
  { title: '메모', dataIndex: 'memo', key: 'memo' },
  { title: '가입일', dataIndex: 'joinedAt', key: 'joinedAt' },
  { title: '직업', dataIndex: 'job', key: 'job' },
  {
    title: '이메일 수신 동의',
    dataIndex: 'newsletter',
    key: 'newsletter',
    render: (val: boolean) => (val ? '✓' : ''),
  },
]

function App() {
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
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>
            회원 목록
          </h1>
          <Button type="primary">+ 추가</Button>
        </div>
        <Table<MemberRecord>
          rowKey="id"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
        />
      </div>
    </ConfigProvider>
  )
}

export default App
