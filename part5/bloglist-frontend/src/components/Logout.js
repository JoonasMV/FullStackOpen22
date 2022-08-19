const Logout = () => {

  const clearLocalStorage = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    window.location.reload(false)
  };

  return (
    <>
      <button onClick={clearLocalStorage}>logout</button>
    </>
  );
};

export default Logout;
