import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../reducers/blogReducer'

const BlogForm = ({ sendNotificationMessageTimeout, setCreateBlogVisible }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const dispatch = useDispatch()

    const addBlog = async (event) => {
        event.preventDefault()
        try {
            dispatch(addNewBlog({ title, author, url }))
            sendNotificationMessageTimeout({
                message: `A new blog ${title} by ${author} added`,
                type: 'notification',
            })
            setTitle('')
            setAuthor('')
            setUrl('')
            setCreateBlogVisible(false)
        } catch (exception) {
            sendNotificationMessageTimeout({
                message: 'Error while adding a blog!',
                type: 'error',
            })
        }
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    <h2>Create new blog</h2>
                    Title:{' '}
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        id="blog-title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:{' '}
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        id="blog-author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Url:{' '}
                    <input
                        type="url"
                        value={url}
                        name="Url"
                        id="blog-url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id="create-new-blog" type="submit">
                    create
                </button>
            </form>
        </div>
    )
}

BlogForm.displayName = 'BlogForm'

BlogForm.propTypes = {
    setCreateBlogVisible: PropTypes.func.isRequired,
}

export default BlogForm
