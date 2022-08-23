import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import {
    resetNotification,
    sendNotification,
} from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { loginUser, logout } from './reducers/loginReducer'
import UsersForm from './components/UsersForm'
import { setAllUsers } from './reducers/usersReducer'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import BlogList from './components/BlogList'
import User from './components/User'
import HomePage from './components/HomePage'
import Blog from './components/Blog'

const App = () => {
    const [createBlogVisible, setCreateBlogVisible] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.login)

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(loginUser())
        dispatch(setAllUsers())
    }, [dispatch])

    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

    const handleLogout = async () => dispatch(logout())

    const sendNotificationMessageTimeout = ({ message, type }) => {
        dispatch(sendNotification(message, type))
        setTimeout(() => {
            dispatch(resetNotification())
        }, 2000)
    }

    if (user === null) {
        return (
            <div>
                <LoginForm
                    sendNotificationMessageTimeout={
                        sendNotificationMessageTimeout
                    }
                />
            </div>
        )
    }

    return (
        <BrowserRouter>
            <div
                style={{
                    background: 'lightgray',
                }}
            >
                <Link to="/">home</Link> <Link to="/users">users</Link>{' '}
                <Link to="/blogs">blogs</Link> {user.username} logged in{' '}
                <button onClick={() => handleLogout()} type="submit">
                    logout
                </button>
            </div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            hideWhenVisible={hideWhenVisible}
                            showWhenVisible={showWhenVisible}
                            setCreateBlogVisible={setCreateBlogVisible}
                            sendNotificationMessageTimeout={
                                sendNotificationMessageTimeout
                            }
                        />
                    }
                />
                <Route path="/users" element={<UsersForm />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs" element={<BlogList />} />
                <Route
                    path="/blogs/:id"
                    element={
                        <Blog
                            sendNotificationMessageTimeout={
                                sendNotificationMessageTimeout
                            }
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

App.displayName = 'App'

export default App
