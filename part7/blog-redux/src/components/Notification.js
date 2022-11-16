import { useSelector } from "react-redux"

const Notification = () => {
  const { message, isError } = useSelector(state => state.notification)
  
  const color = isError ? "error" : "notification"

  return message === ""
    ? null 
    : <h2 className={color}>{message}</h2>
}

export default Notification
