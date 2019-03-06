import { combineReducers } from 'redux'
import AuthReducer from './auth/reducer.jsx'
import RegisterReducer from './register/reducer.jsx'
import CabinetReducer from './UserCabinet/reducer.jsx'
export default  combineReducers({ auth: AuthReducer, register: RegisterReducer,CabinetReducer:CabinetReducer});

