const Notification = ({ notification: {message, error}}) => {
    if (message === null) {
        return null
    }
    
    let notificationColor = "notification"
    if (error) {
        notificationColor = "error"
    }

    return (
        <div className={notificationColor}>
            {message}
        </div>
    )
}

export default Notification