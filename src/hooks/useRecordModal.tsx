import { useState } from 'react'
import type { MemberRecord } from '../types/record'
import type { FieldDefinition } from '../types/fields'

import { Modal, Form, Input, DatePicker, Select, Checkbox } from 'antd'
import dayjs from 'dayjs'

interface UseRecordModalOptions {
  fields: FieldDefinition[]
  onSubmit: (record: MemberRecord) => void
}

export const useRecordModal = ({ fields, onSubmit }: UseRecordModalOptions) => {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<MemberRecord | null>(null)
  const [form] = Form.useForm()

  const show = (record?: MemberRecord) => {
    if (record) {
      setEditing(record)
      form.setFieldsValue({
        ...record,
        joinedAt: dayjs(record.joinedAt),
      })
    } else {
      setEditing(null)
      form.resetFields()
    }
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      const processed = { ...values }
      if (processed.joinedAt) {
        processed.joinedAt = processed.joinedAt.format('YYYY-MM-DD')
      }
      if (typeof processed.newsletter === 'undefined') {
        processed.newsletter = false
      }
      const final: MemberRecord = editing
        ? { ...editing, ...processed }
        : { id: crypto.randomUUID(), ...processed }
      onSubmit(final)
      close()
    })
  }

  const modal = (
    <Modal
      title={editing ? '회원 수정' : '회원 추가'}
      open={open}
      onCancel={close}
      onOk={handleOk}
      cancelText="취소"
      okText={editing ? '저장' : '추가'}
    >
      <Form form={form} layout="vertical">
        {fields.map((field) => (
          <Form.Item
            key={field.id}
            label={field.label}
            name={field.id}
            // https://ant.design/components/checkbox
            valuePropName={field.type === 'checkbox' ? 'checked' : 'value'}
            rules={[
              ...(field.required
                ? [
                    {
                      required: true,
                      message: `${field.label}은(는) 필수값입니다.`,
                    },
                  ]
                : []),
              ...(field.type === 'text' || field.type === 'textarea'
                ? [
                    {
                      max: field.maxLen,
                      message: `글자수 ${field.maxLen}을 초과할 수 없습니다.`,
                    },
                  ]
                : []),
            ]}
          >
            {(() => {
              switch (field.type) {
                case 'text':
                  return <Input />
                case 'textarea':
                  return <Input.TextArea rows={3} />
                case 'date':
                  return <DatePicker style={{ width: '100%' }} />
                case 'select':
                  return (
                    <Select
                      options={field.options?.map((o) => ({
                        label: o,
                        value: o,
                      }))}
                    />
                  )
                case 'checkbox':
                  return <Checkbox>동의</Checkbox>
                default:
                  return null
              }
            })()}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  )

  return { show, modal }
}
