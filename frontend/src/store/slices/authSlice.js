import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/loginUser";
import { getUserData } from "../thunks/getUserData";
import { editUser } from "../thunks/editUser";

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
        logout(state) {
            state.token = null;
            state.status = "idle";
            state.error = null;
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },

    extraReducers: (builder) => {
        // builder for login case
        builder
        .addCase(loginUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.token = action.payload.token;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || "Failed to login";
        });

        // builder to save user data
        builder
        .addCase(getUserData.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.user = action.payload;
        })
        .addCase(getUserData.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || "Failed to fetch user data";
        })

        // builder for editing user
        builder
        .addCase(editUser.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(editUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.user = { ...state.user, ...action.payload };
        })
        .addCase(editUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || "Failed to update user name";
        })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;