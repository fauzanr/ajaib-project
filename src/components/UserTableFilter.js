import { Form, Input, Select, Space, Button } from 'antd'
import { useEffect } from 'react'
const { Search } = Input
const { Option } = Select

const UserTableFilter = (props) => {
  const [form] = Form.useForm()

  useEffect(() => form.setFieldsValue(), [])
  
  const onSearch = (value) => {
    form.setFieldsValue({ keyword: value || undefined })
    props.updateQuery(form.getFieldsValue())
  }
  
  const onSelect = (value) => {
    form.setFieldsValue({ gender: value || undefined })
    props.updateQuery(form.getFieldsValue())
  }
  
  const resetForm = () => {
    form.resetFields()
    props.updateQuery(form.getFieldsValue())
  }

  return (
    <Form form={form} layout="vertical">
      <Space align="end">
        <Form.Item name="keyword" label="Search">
          <Search placeholder="Search..." enterButton onSearch={onSearch} />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Select placeholder="All" style={{ width: 200 }} onSelect={onSelect}>
            <Option value="">All</Option>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={resetForm}>Reset Filter</Button>
        </Form.Item>
      </Space>
    </Form>
  )
}

export default UserTableFilter