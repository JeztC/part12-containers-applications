import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notifications)

    if (notification.message === '') {
        return null
    }

    return <div className={notification.type}>{notification.message}</div>
}

Notification.displayName = 'Notification'

export default Notification
