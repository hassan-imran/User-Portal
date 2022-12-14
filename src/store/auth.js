import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: false,
    },
    reducers: {
        updateAuth: (state, {payload}) => {
            state.value = payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateAuth } = authSlice.actions

export default authSlice.reducer