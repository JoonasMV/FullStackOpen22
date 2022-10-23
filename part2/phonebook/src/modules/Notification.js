const Notification = ({ notification: {message, error} }) => {
  if (message === null) return null

  let notificationType = "notification"
  if (error) notificationType = "error"

  return(
    <div className={notificationType}>
      {message}
    </div>
  )
}

export default Notification