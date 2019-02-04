import React from 'react'
import {reducer} from './register.jsx' 
import { render } from 'react-dom' 
import App from './app.jsx' 
import {createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {watchFetchDog} from './register.jsx';
import{Provider}from 'react-redux';

 const sagaMiddleware = createSagaMiddleware();

 const store = createStore(
   reducer,
   applyMiddleware(sagaMiddleware)
 );
 
 sagaMiddleware.run(watchFetchDog);

render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('content')
) 