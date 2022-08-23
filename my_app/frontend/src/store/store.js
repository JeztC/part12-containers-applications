import { configureStore } from '@reduxjs/toolkit'
import notifications from '../reducers/notificationReducer'
import blogs from '../reducers/blogReducer'
import login from '../reducers/loginReducer'
import users from '../reducers/usersReducer'

export const store = configureStore({
    reducer: {
        notifications,
        blogs,
        login,
        users,
    },
})

export default store
