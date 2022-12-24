import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
}

export const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployee: (state, { payload }) => {
            state.value.push(payload);
        },
        removeEmployee: (state, { payload }) => {
            let newList = [];
            newList = state.value.filter(item => item.userName !== payload);
            state.value = [...newList];
        },
    },
})


export const { addEmployee, removeEmployee } = employeeSlice.actions

export default employeeSlice.reducer