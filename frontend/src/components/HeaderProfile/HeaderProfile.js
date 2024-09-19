import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HeaderProfile.css";
import { editUser } from "../../store/thunks/editUser";

const HeaderProfile = () => {
  const { user, token, status } = useSelector((state) => state.auth);
  //state for sections to disappear
  const [disappearance, setDisappearance] = useState(false);
  const [username, setUsername] = useState(user ? user.userName : "");
  const dispatch = useDispatch();

  function handleDisappearance(e) {
    //if disappearance (edit section) is true
    if (disappearance) {
      //reset username
      setUsername(user ? user.userName : "");
    }
    //reverse state
    setDisappearance((prev) => !prev);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const storedToken = localStorage.getItem("token");
    await dispatch(editUser({ token, storedToken, username })).unwrap();

    //if a token is stored in local storage
    if (storedToken) {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      storedUser.userName = username;
      localStorage.setItem("user", JSON.stringify(storedUser));
    }
  }

  return (
    <>
      {disappearance === false ? (
        <div className="header">
          <h2>
            Welcome back
            <br />
            {user && `${user.firstName} ${user.lastName}`}!
          </h2>
          <button className="edit-button" onClick={handleDisappearance}>
            Edit Name
          </button>
        </div>
      ) : (
        <div className="header">
          <h2>Edit user info</h2>
          <form className="form-edit-user" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">User name: </label>
              <input
                type="text"
                id="username"
                className="input-edit-user"
                value={username || (user && user.userName) || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="firstname">First name: </label>
              <input
                className="input-edit-user"
                type="text"
                id="firstname"
                placeholder={user && user.firstName}
                disabled
              />
            </div>
            <div>
              <label htmlFor="lastname">Last name: </label>
              <input
                className="input-edit-user"
                type="text"
                id="lastname"
                placeholder={user && user.lastName}
                disabled
              />
            </div>
            <div className="container-edit-button">
              <button
                className={`edit-button ${status === "loading" && "button-disabled"}`}
                type="submit"
                disabled={status === "loading"}
              >
                Save
              </button>
              <button
                className="edit-button"
                type="button"
                onClick={handleDisappearance}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default HeaderProfile;
