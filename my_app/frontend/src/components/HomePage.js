import Notification from './Notification'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const HomePage = ({
    hideWhenVisible,
    showWhenVisible,
    setCreateBlogVisible,
    sendNotificationMessageTimeout,
}) => {
    return (
        <div>
            <h2>Blog App</h2>
            <Notification />
            <div style={hideWhenVisible}>
                <button
                    id="create-blog-button"
                    onClick={() => setCreateBlogVisible(true)}
                >
                    new blog
                </button>
            </div>
            <div style={showWhenVisible}>
                <BlogForm
                    sendNotificationMessageTimeout={
                        sendNotificationMessageTimeout
                    }
                    setCreateBlogVisible={setCreateBlogVisible}
                />
                <button onClick={() => setCreateBlogVisible(false)}>
                    cancel
                </button>
            </div>
            <BlogList />
        </div>
    )
}

export default HomePage
