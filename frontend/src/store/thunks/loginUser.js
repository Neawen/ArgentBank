import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    // action name
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
              });

              const data = await response.json();

              if (!response.ok) {
                return rejectWithValue(data.message);
              }

              return data.body;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)