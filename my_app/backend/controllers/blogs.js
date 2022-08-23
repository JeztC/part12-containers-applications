const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user
    if (blog.user.toString() === user.id) {
        await Blog.findByIdAndRemove(request.params.id)
        console.log(request.token)
        response.status(204).end()
    } else {
        response.status(400).json({
            error: 'Invalid token',
        })
    }
})

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const newComment = request.body.comment
    if (newComment.length === 0) {
        response.status(204).end()
    } else {
        const newBlog = { ...blog, comments: blog.comments.push(newComment) }
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            newBlog,
            { new: false }
        )
        response.status(201).json(updatedBlog)
    }
})

blogsRouter.get('/:id/comments', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog.comments)
    } else {
        response.status(404).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = { ...body }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    })
    response.json(updatedBlog)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = request.user

    const blog = new Blog({
        ...body,
        likes: body.likes === undefined ? 0 : body.likes,
    })

    if (blog.title === undefined && blog.url === undefined) {
        return response.status(400).json({
            error: 'Bad Request',
        })
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter
