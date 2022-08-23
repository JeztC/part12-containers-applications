import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const addComment = async (id, newComment) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(
        `${baseUrl}/${id}/comments`,
        newComment,
        config
    )
    return response.data
}

const put = async (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
}

const deleteObject = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const get = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}`)
    return request.data
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { setToken, create, getAll, put, get, deleteObject, addComment }
