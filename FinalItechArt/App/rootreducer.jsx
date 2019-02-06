import { combineReducers } from 'redux'
import AuthReducer from './auth/reducer.jsx'
import RegisterReducer from './register/reducer.jsx'

export default  combineReducers({ auth: AuthReducer, register: RegisterReducer});

