import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import BlogList from './BlogList'
import userService from '../services/users'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const blog = {
    title: 'TestBlog',
    author: 'TestAuthor',
    url: 'https://localhost.com',
    likes: 50,
    user: {
        username: 'Tester',
        name: 'Tester',
        id: '62bd59c3a00c233604caeb35',
    },
    id: '62c707159ce88079156fa1f4',
}

test('only render blog title and author', async () => {
    /**
     * Avoids an error that happens if the user doesn't have localstorage.
     */
    const user = await userService.getAll()
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user[0]))

    render(<BlogList blog={blog} />)

    const authorTitle = screen.getByText(blog.title + ' ' + blog.author)
    const userName = screen.getByText(blog.user.username)
    const url = screen.getByText(blog.user.username)
    expect(authorTitle).not.toHaveStyle('display: none')
    expect(userName).toHaveStyle('display: none')
    expect(url).toHaveStyle('display: none')
})

test('renders url and likes when button is pressed', async () => {
    const loggedUser = await userService.getAll()
    window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser[0])
    )

    render(<BlogList blog={blog} />)
    const user = userEvent.setup()
    const username = screen.getByText(blog.user.username)
    const url = screen.getByText(blog.user.username)
    expect(username).toHaveStyle('display: none')
    expect(url).toHaveStyle('display: none')

    const button = screen.getByText('view')
    await user.click(button)
    expect(username).not.toHaveStyle('display: none')
    expect(url).not.toHaveStyle('display: none')
})

test('clicking the like button calls event handler twice', async () => {
    const loggedUser = await userService.getAll()
    window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser[0])
    )

    const mockHandler = jest.fn()

    render(<BlogList blog={blog} addLikes={mockHandler} />)

    const user = userEvent.setup()

    const sendButton = screen.getByText('view')
    await user.click(sendButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    screen.debug()
})

test('Blog returns the ', async () => {
    const loggedUser = await userService.getAll()
    window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser[0])
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    const loggedInUser = JSON.parse(loggedUserJSON)
    blogService.setToken(loggedInUser.token)

    const mockHandler = jest.fn()
    const { container } = render(
        <BlogForm setCreateBlogVisible={mockHandler} />
    )

    const user = userEvent.setup()
    const titleInput = container.querySelector('#blog-title')
    await user.type(titleInput, blog.title)
    const authorInput = container.querySelector('#blog-author')
    await user.type(authorInput, blog.author)
    const urlInput = container.querySelector('#blog-url')
    await user.type(urlInput, blog.url)
    const createButton = screen.getByText('create')
    await user.click(createButton)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].content).toBe(blog.title)
    screen.debug()
})
