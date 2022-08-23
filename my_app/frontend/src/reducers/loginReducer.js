import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const loginSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        setLogin(state, action) {
            return action.payload
        },
        logout(state) {
            window.localStorage.clear()
            return (state = null)
        },
    },
})

export const loginUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setLogin(user))
            blogService.setToken(user.token)
        }
    }
}

export const { setLogin, logout } = loginSlice.actions
export default loginSlice.reducer
