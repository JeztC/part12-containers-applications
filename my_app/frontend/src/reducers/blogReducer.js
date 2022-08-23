import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        addBlog(state, action) {
            state.push(action.payload)
        },
        addLike(state, action) {
            const id = action.payload
            const blogToChange = state.find((n) => n.id === id)
            const changedBlog = {
                ...blogToChange,
                likes: blogToChange.likes + 1,
            }
            return state.map((blog) => (blog.id !== id ? blog : changedBlog))
        },
        addComment(state, action) {
            const payload = action.payload
            const id = payload.id
            const comment = payload.comment
            const blog = state.find((n) => n.id === id)
            const blogCopy = { ...blog }
            const newBlog = {
                ...blogCopy,
                comments: blogCopy.comments.concat(comment),
            }
            return state.map((blog) => (blog.id !== id ? blog : newBlog))
        },
        removeBlog(state, action) {
            const id = action.payload
            const blog = state.find((b) => b.id === id)
            state.pop(blog)
        },
        addAllBlogs(state, action) {
            return action.payload
        },
    },
})

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(addAllBlogs(blogs))
    }
}

export const addNewBlog = ({ title, author, url }) => {
    return async (dispatch) => {
        const blog = await blogService.create({ title, author, url })
        dispatch(addBlog(blog))
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogService.deleteObject(id)
        dispatch(removeBlog(id))
    }
}

export const addNewComment = (id, comment) => {
    return async (dispatch) => {
        await blogService.addComment(id, { comment })
        dispatch(addComment({ id, comment }))
    }
}

export const addNewLike = (id) => {
    return async (dispatch) => {
        const blog = await blogService.get(id)
        const blogToChange = {
            ...blog,
            likes: blog.likes + 1,
        }
        await blogService.put(id, blogToChange)
        dispatch(addLike(id))
    }
}

export const { addBlog, addAllBlogs, removeBlog, addLike, addComment } =
    blogSlice.actions
export default blogSlice.reducer
