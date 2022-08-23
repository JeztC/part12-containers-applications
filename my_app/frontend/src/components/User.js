import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
    const id = useParams().id
    const users = useSelector((state) => state.users)
    const blogs = useSelector((state) => state.blogs)
    const user = users.find((n) => n.id === id)
    if (!user) {
        return null
    }
    return (
        <div>
            <h2>{user.username}</h2>
            <h4>Added blogs</h4>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>
                        {blogs.find((blogs) => blogs.id === blog.id).title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default User
