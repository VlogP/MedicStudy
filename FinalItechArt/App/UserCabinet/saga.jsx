import {put, call,takeEvery} from 'redux-saga/effects';


export function* watchCabinet() {

    yield takeEvery('CHECK_CABINET', CabinetSaga); 

  
  }
  
  
  
  function* CabinetSaga() {
  
    try {
     
  
      
      console.log(error)
  
    } catch (error) {
  
     
  
    }
  
  }