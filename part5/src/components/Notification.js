const Notification = ({ notification: { message, isError } }) => {
  const color = isError ? "error" : "notification"

  return message === null ? null : <h2 className={color}>{message}</h2>
}

export default Notification
