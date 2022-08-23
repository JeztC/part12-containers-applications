import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch} from 'react-redux'
import { useState } from 'react'
import { setLogin } from '../reducers/loginReducer'
import '../index.css'
import Notification from './Notification'

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username,
                password: password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(setLogin(user))
            setUsername('')
            setPassword('')
        } catch (exception) {
            props.sendNotificationMessageTimeout({
                message: 'Wrong username or password',
                type: 'error',
            })
        }
    }

    return (
        <div className="container-fluid ps-md-0">
            <Notification />
            <div className="row g-0">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    <h3 className="login-heading mb-4">
                                        Welcome to Blog App!
                                    </h3>
                                    <form onSubmit={handleLogin}>
                                        <div className="form-floating mb-3">
                                            <input
                                                value={username}
                                                type="text"
                                                className="form-control"
                                                id="floatingInput"
                                                onChange={({ target }) =>
                                                    setUsername(target.value)
                                                }
                                            />
                                            <label htmlFor="floatingInput">
                                                Username
                                            </label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="floatingPassword"
                                                value={password}
                                                onChange={({ target }) =>
                                                    setPassword(target.value)
                                                }
                                            />
                                            <label htmlFor="floatingPassword">
                                                Password
                                            </label>
                                        </div>

                                        <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={password}
                                                id="rememberPasswordCheck"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="rememberPasswordCheck"
                                            >
                                                Remember password
                                            </label>
                                        </div>
                                        <div className="d-grid">
                                            <button
                                                className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                                                type="submit"
                                                id="login-button"
                                            >
                                                Sign in
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

LoginForm.displayName = 'LoginForm'

export default LoginForm
