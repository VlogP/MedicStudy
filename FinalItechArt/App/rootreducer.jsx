import { combineReducers } from 'redux'
import AuthReducer from './auth/reducer.jsx'
import RegisterReducer from './register/reducer.jsx'

const appReducer = combineReducers({
    AuthReducer,
    RegisterReducer
});

const application = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }

    return appReducer(state, action);
};

export default application;