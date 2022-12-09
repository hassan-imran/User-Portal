import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        value: [
            {
                userName: 'admin',
                pass: 'admin123',
                firstName: 'Robot',
                lastName: 'Admin',
            },
            {
                userName: 'faheem',
                pass: 'faheem123',
                firstName: 'Muhammad',
                lastName: 'Faheem',
            },
        ],
    },
    reducers: {
        addEmployee: (state, { payload }) => {
            state.value = [...state.value, payload]
        },
    },
})

// Action creators are generated for each case reducer function
export const { addEmployee } = employeeSlice.actions

export default employeeSlice.reducer