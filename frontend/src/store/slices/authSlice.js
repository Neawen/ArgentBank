import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    // name of the slice for store
    name: "auth",

    initialState: {
        token: null,
        status: "idle",
        error: null,
        user: null,
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
        },
    }
})

export const { loginRequest, loginSuccess, loginFailure, logout, setUserProfile, updateUser } = authSlice.actions;
export default authSlice.reducer;