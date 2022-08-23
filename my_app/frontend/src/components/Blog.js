import { useDispatch, useSelector } from 'react-redux'
import { addNewComment, addNewLike } from '../reducers/blogReducer'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import Notification from './Notification'

const Blog = ({ sendNotificationMessageTimeout }) => {
    const blogs = useSelector((state) => state.blogs)
    const dispatch = useDispatch()
    const id = useParams().id
    const blog = blogs.find((n) => n.id === id)
    const [comment, setComment] = useState('')

    if (!blog) {
        return null
    }

    const addLike = () => dispatch(addNewLike(blog.id))

    const addComment = async (e) => {
        e.preventDefault()
        if (comment.length === 0) {
            sendNotificationMessageTimeout({
                message: `Please enter a comment that is more than 0 characters in length.`,
                type: 'error',
            })
            return
        }
        dispatch(addNewComment(blog.id, comment))
        setComment('')
    }

    return (
        <div>
            <Notification />
            <h2>Blog App</h2>
            <h2>
                {blog.title} {blog.author}
            </h2>
            <div>
                <Link to={{ pathname: blog.url }}>{blog.url}</Link>
            </div>
            <p>
                {blog.likes} likes <button onClick={addLike}>Like</button>
            </p>
            <p>Added by {blog.author}</p>
            <h3>Comments</h3>
            <form onSubmit={addComment}>
                <div>
                    <input
                        type="text"
                        value={comment}
                        id="blog-url"
                        onChange={({ target }) => setComment(target.value)}
                    />{' '}
                    <button>Add comment</button>
                </div>
            </form>
            <ul>
                {blog.comments.map((comment) => (
                    <li>{comment}</li>
                ))}
            </ul>
        </div>
    )
}

export default Blog
