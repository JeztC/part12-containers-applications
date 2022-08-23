const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are enough blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('The id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('check if can add blog if no authorization', async () => {
    const blog = {
        title: 'Blog',
        author: 'Author',
        url: 'https://www.blogger.com/about/',
        likes: 500,
    }
    const result = await api.post('/api/blogs').send(blog).expect(401)
    expect(result.body.error).toContain('Unauthorized')
})

test('check if can add blog if there is authorization', async () => {
    const blogsAtStart = await helper.blogsinDb()
    const blog = {
        title: 'Blog',
        author: 'Author',
        url: 'https://www.blogger.com/about/',
        likes: 500,
    }
    await api
        .post('/api/blogs')
        .set({ Authorization: process.env.AUTHORIZATION_TOKEN })
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsinDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
})

test('check likes', async () => {
    const blog = {
        title: 'TestBlog',
        author: 'Author',
        url: 'https://www.blogger.com/about/',
    }

    await api
        .post('/api/blogs')
        .set({ Authorization: process.env.AUTHORIZATION_TOKEN })
        .send(blog)

    const request = await api.get('/api/blogs')
    const contents = request.body.find(
        (r) =>
            r.title === blog.title &&
            r.author === blog.author &&
            r.url === blog.url
    )
    expect(contents['likes']).toEqual(0)
})

test('contains title and url', async () => {
    const blog = {
        author: 'Author',
    }

    await api
        .post('/api/blogs')
        .set({ Authorization: process.env.AUTHORIZATION_TOKEN })
        .send(blog)
        .expect(400)
})

test('can delete blogs', async () => {
    const blogsAtStart = await helper.blogsinDb()
    const array = blogsAtStart.map((blog) => blog.id)
    await api
        .delete(`/api/blogs/${array[Math.floor(Math.random() * array.length)]}`)
        .set({ Authorization: process.env.AUTHORIZATION_TOKEN })
        .expect(204)
})

test('update likes', async () => {
    const blogsAtStart = await helper.blogsinDb()
    const array = blogsAtStart.map((blog) => blog.id)
    const randomId = array[Math.floor(Math.random() * array.length)]

    const blog = {
        title: 'TestBlog',
        author: 'Author',
        url: 'https://www.blogger.com/about/',
        likes: 5000,
    }

    await api
        .put(`/api/blogs/${randomId}`)
        .set({ Authorization: process.env.AUTHORIZATION_TOKEN })
        .send(blog)

    const request = await api.get('/api/blogs')
    const contents = request.body.find((r) => r.id === randomId)
    expect(contents['likes']).toEqual(blog.likes)
})

describe('when there is initially one user at db', () => {
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'password',
        }

        const result = await api
            .post('/api/users')
            .set({ Authorization: process.env.AUTHORIZATION_TOKEN })
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
