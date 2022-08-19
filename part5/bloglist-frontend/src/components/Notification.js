const Notification = ({ message, isError }) => {

  if (message === null) {
    return null;
  }

  let messageColor = "notification";
  if (isError) {
    messageColor = "error";
  }

  return <div className={messageColor}>
    {message}
  </div>;
};

export default Notification;
