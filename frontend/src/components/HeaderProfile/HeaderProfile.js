import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/slices/authSlice";
import "./HeaderProfile.css";

const HeaderProfile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [disappearance, setDisappearance] = useState(false);
  const [username, setUsername] = useState(user && (user.userName || ""));
  const dispatch = useDispatch();

  function handleDisappearance(e) {
    //if disappearance (edit section) is true
    if (disappearance) {
      //reset username
      setUsername(user && (user.userName || ""));
    }
    //reverse state
    setDisappearance((prev) => !prev);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userName: username }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(updateUser(data.body));
      } else {
        console.error("failed: ", data.message);
      }
    } catch (error) {
      console.error("Error: ", error);
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
                value={username}
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
              <button className="edit-button" type="submit">Save</button>
              <button className="edit-button" type="button" onClick={handleDisappearance}>
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
