const Note = require('../models/blog')
const User = require('../models/user')

const blogsinDb = async () => {
    const blogs = await Note.find({})
    return blogs.map((note) => note.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map((u) => u.toJSON())
}

module.exports = {
    blogsinDb,
    usersInDb,
}
