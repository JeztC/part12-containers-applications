import { useSelector } from 'react-redux'
import {
    Routes,
    Route,
    Link,
} from 'react-router-dom'
import User from './User'

const UsersForm = () => {
    const users = useSelector((state) => state.users)
    return (
        <div>
            <h2>Users</h2>
            <tr>
                <td />
                <td>
                    <h4>Blogs created</h4>
                </td>
            </tr>
            {users
                .filter((user) => user.blogs.length !== 0)
                .map((user) => (
                    <tr key={user.id}>
                        <td>
                            <Link to={`/users/${user.id}`}>
                                {user.username}
                            </Link>
                            <Routes>
                                <Route path="/users/:id" element={<User />} />
                            </Routes>
                        </td>
                        <td>
                            {
                                users.find(
                                    (mapUser) =>
                                        mapUser.username === user.username
                                ).blogs.length
                            }
                        </td>
                    </tr>
                ))}
        </div>
    )
}

export default UsersForm
