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
            state.value = [...state.value, payload];
        },
        removeEmployee: (state, { payload }) => {
            let newList = [];
            // console.log(payload.userName);
            newList = state.value.filter(item => item.userName !== payload);
            state.value = [...newList];
        },
    },
})

// Action creators are generated for each case reducer function
export const { addEmployee, removeEmployee } = employeeSlice.actions

export default employeeSlice.reducer