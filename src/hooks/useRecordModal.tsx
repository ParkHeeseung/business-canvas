import { useState } from 'react'
import type { MemberRecord } from '../types/record'
import type { FieldDefinition } from '../types/fields'

import { Modal, Form, Input, DatePicker, Select, Checkbox } from 'antd'

interface UseRecordModalOptions {
  fields: FieldDefinition[]
  onSubmit: (record: MemberRecord) => void
}

export const useRecordModal = ({ fields, onSubmit }: UseRecordModalOptions) => {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const show = () => {
    form.resetFields()
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
      onSubmit({ id: crypto.randomUUID(), ...processed })
      close()
    })
  }

  const modal = (
    <Modal
      title="회원 추가"
      open={open}
      onCancel={close}
      onOk={handleOk}
      cancelText="취소"
      okText="추가"
    >
      <Form form={form} layout="vertical">
        {fields.map((field) => (
          <Form.Item
            key={field.id}
            label={field.label}
            name={field.id}
            // https://ant.design/components/checkbox
            valuePropName={field.type === 'checkbox' ? 'checked' : 'value'}
            rules={
              field.required
                ? [
                    {
                      required: true,
                      message: `${field.label}을 입력해주세요.`,
                    },
                  ]
                : []
            }
          >
            {(() => {
              switch (field.type) {
                case 'text':
                  return <Input maxLength={field.maxLen} />
                case 'textarea':
                  return <Input.TextArea maxLength={field.maxLen} rows={3} />
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
