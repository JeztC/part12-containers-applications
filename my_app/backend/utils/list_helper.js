const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs
        .map((blog) => blog.likes)
        .reduce((totalLikes, val) => totalLikes + val)
}

const favoriteBlog = (blogs) => {
    return blogs.find(
        (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
    )
}

const mostBlogs = (blogs) => {
    const values = _.countBy(blogs, (blogs) => blogs.author)
    return Object.entries(values)[
        blogs.findIndex(
            (p) =>
                p.author ===
                Object.keys(values).find(
                    (key) => values[key] === Math.max(...Object.values(values))
                )
        )
    ]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}
