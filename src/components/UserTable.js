import { Table } from 'antd'

const UserTable = (props) => {
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: true,
    },
    {
      title: 'Registered Date',
      dataIndex: 'registerdate',
      key: 'registerdate',
      sorter: true,
    },
  ];

  const handleTableUpdate = (pagination, filters, sorter) => {
    props.updateQuery({
      sortBy: sorter.column ? sorter.field : undefined,
      sortOrder: sorter.column ? sorter.order : undefined,
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
  }

  return (
    <Table
      columns={columns}
      dataSource={props.users}
      pagination={{ pageSize: 5 }}
      onChange={handleTableUpdate}
    />
  )
}

export default UserTable