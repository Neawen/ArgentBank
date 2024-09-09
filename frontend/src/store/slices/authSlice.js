import { createSlice } from "@reduxjs/toolkit";

// function to get user data from localstorage for initial state
const getUser = () => {
    const user = localStorage.getItem("user");
    try {
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("failed: ", error);
        return null;
    }
}

const authSlice = createSlice({
    // name of the slice for store
    name: "auth",

    initialState: {
        token: localStorage.getItem("token") || null,
        status: "idle",
        error: null,
        user: getUser(),
    },

    reducers:  {
        loginRequest(state) {
            state.status = "loading";
        },
        loginSuccess(state, action) {
            state.status = "succeeded";
            state.token = action.payload.token;
        },
        loginFailure(state, action) {
            state.status = "failed";
            state.error = action.payload;
        },
        setUserProfile(state, action) {
            state.user = action.payload;
        },
        updateUser(state, action) {
            state.user = { ...state.user, ...action.payload };
        },
        logout(state) {
            state.token = null;
            state.status = "idle";
            state.error = null;
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    }
})

export const { loginRequest, loginSuccess, loginFailure, logout, setUserProfile, updateUser } = authSlice.actions;
export default authSlice.reducer;