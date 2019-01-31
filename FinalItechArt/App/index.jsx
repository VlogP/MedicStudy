import React from 'react';
import ReactDOM from 'react-dom';
import{Provider,connect}from 'react-redux';
import {createStore, applyMiddleware,compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {put, call,takeEvery} from 'redux-saga/effects';


// Reducer
const initialState = {
  Name:'',
  Password:'',
  error: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUESTED_DOG':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'REQUESTED_DOG_SUCCEEDED':
      return {
        Password: action.Password,
        error: false,
      };
    case 'REQUESTED_DOG_FAILED':
      return {
        url: '',
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

// Action Creators
const requestDog = () => {
  return { type: 'REQUESTED_DOG' }
};

const requestDogSuccess = (data) => {
  return { type: 'REQUESTED_DOG_SUCCEEDED', url: data.Password }
};

const requestDogError = () => {
  return { type: 'REQUESTED_DOG_FAILED' }
};


function validateAge(age){
  var myRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[!-+.@#$%^&*]).{8,15}$/;
  var myArray = myRe.test(age);
    return myArray;
}
function validateName(name){
    return name.length>2;
}
function onAgeChange(e) {
  var val = e.target.value;
  var valid = this.validateAge(val);
  this.setState({age: val, ageValid: valid});
}
function onNameChange(e) {
  var val = e.target.value;
  console.log(val);
  var valid = this.validateName(val);
  this.setState({name: val, nameValid: valid});
}

// Sagas
function* watchFetchDog() {
  yield takeEvery('FETCHED_DOG', PasswordAsync);

}

function* fetchDogAsync() {
  try {
    yield put(requestDog());
    const data = yield call(() => {
      return fetch('https://dog.ceo/api/breeds/image/random')
              .then(res => res.json())
      }
    );
    yield put(requestDogSuccess(data));
  } catch (error) {
    yield put(requestDogError());
  }
}

// Component
class App extends React.Component {
  
  componentWillMount(){

  }
  componentDidMount() {
   
};

  render () {
    return (
      <form onSubmit={this.props.fetchDog}>
      <p>
          <label>Имя:</label><br />
          <input type="text" value={this.state.Name} 
              onChange={this.onNameChange} style={{borderColor:nameColor}} />
      </p>
      <p>
          <label>Возраст:</label><br />
          <input type="text" value={this.state.age} 
              onChange={this.onAgeChange}  style={{borderColor:ageColor}} />
      </p>
      <input type="submit" value="Отправить" />
  </form>
    )
  }
}

// Store




const mapStateToProps = state => {
  return {
    url: state.url,
    loading: state.loading,
    error:state.error
  };
};

const mapDispatchToProps =dispatch =>{
  return{
  fetchDog: () => dispatch({ type: "FETCHED_DOG" })
  
  };
};


export default App=connect(mapStateToProps, mapDispatchToProps)(App); 





 const sagaMiddleware = createSagaMiddleware();

 const store = createStore(
   reducer,
   applyMiddleware(sagaMiddleware)
 );
 
 sagaMiddleware.run(watchFetchDog);

// Container component
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);