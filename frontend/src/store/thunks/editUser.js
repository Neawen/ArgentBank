import { createAsyncThunk } from "@reduxjs/toolkit";

export const editUser = createAsyncThunk(
  "auth/editUser",
  async ({ token, storedToken, username }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || storedToken}`,
          },
          body: JSON.stringify({ userName: username }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
