import { configureStore } from '@reduxjs/toolkit'
import auth from './auth'
import employeeReducer from './employeeList'
import error from './error'

export default configureStore({
  reducer: {
    employees: employeeReducer,
    auth: auth,
    error: error,
  },
})