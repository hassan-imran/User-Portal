import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './employeeList'

export default configureStore({
  reducer: {
    employees: employeeReducer,
  },
})