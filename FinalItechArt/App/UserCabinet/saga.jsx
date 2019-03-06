import {put, call,takeEvery} from 'redux-saga/effects';
import {requestForInitial,InitialRequest} from './create_action.jsx';

export function* watchCabinet() {

    yield takeEvery('CHECK_CABINET', CabinetSaga); 

  
  }
  
  
  
  function* CabinetSaga() {
  
    try {
     
     var error=yield call(InitialRequest);
      
      console.log(error)
      yield put(requestForInitial(error));
    } catch (error) {
  
     
  
    }
  
  }