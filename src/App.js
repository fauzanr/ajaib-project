import UserTable from "./components/UserTable";
import UserTableFilter from "./components/UserTableFIlter";
import { useEffect, useState } from "react";
import qs from 'qs'
import 'antd/dist/antd.css'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [userQuery, setuserQuery] = useState({
    page: 1,
    pageSize: 10,
  })
  
  useEffect(() => {
    getUsers()
  }, [userQuery])

  const updateQuery = data => {
    setuserQuery(userQuery => ({ ...userQuery, ...data }))
  }

  const getUsers = async () => {
    setLoading(true)
    const query = qs.stringify({ ...userQuery });
    try {
      const res = await fetch(`https://randomuser.me/api?results=10${query ? ('&' + query) : ''}`)
      const data = await res.json()

      data.results.map(user => {
        user.key = user.login.uuid
        user.username = user.login.username
        user.fullname = user.name.first + ' ' + user.name.last
        user.registerdate = user.registered.date
        return user
      })
      
      setUsers(data.results)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <UserTableFilter updateQuery={updateQuery} />
      <UserTable users={users} loading={loading} updateQuery={updateQuery} />
    </div>
  );
}

export default App;
