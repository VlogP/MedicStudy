import React from 'react'
import {watchRegistration} from './register/saga.jsx' 
import { render } from 'react-dom' 
import App from './app.jsx' 
import {createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import{Provider}from 'react-redux';
import rootreducer from './rootreducer.jsx';
import RegisterReducer from './register/reducer.jsx';
import AuthReducer from './auth/reducer.jsx';
import {watchAuthorize} from './auth/saga.jsx' 

 const sagaMiddleware = createSagaMiddleware();

 const store = createStore(
    rootreducer,
   applyMiddleware(sagaMiddleware)
 );
 
 sagaMiddleware.run(watchRegistration);
 sagaMiddleware.run(watchAuthorize);

render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('content')
) 