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
            console.log(payload);
            // console.log(state.userName);

            let newList = [];
            // state.value.forEach((user) => {
            //     if (payload !== user.userName) {
            //         newList.push(user);
            //     }
            // })
            newList = state.value.filter(item => item.userName !== payload);

            // console.log(newList);
            state.value = [...newList];
        },
    },
})

// Action creators are generated for each case reducer function
export const { addEmployee, removeEmployee } = employeeSlice.actions

export default employeeSlice.reducer