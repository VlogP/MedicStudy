import {put, call,takeEvery} from 'redux-saga/effects';
import {requestForError,AuthRequest} from './create_action.jsx';

export function* watchAuthorize() {

    yield takeEvery('CHECK_AUTH', Authorize); 
  
  }
  
  
  
  function* Authorize(e) {
  
    try {
     
     var error=yield call(AuthRequest,{Info:e});
      yield put(requestForError(error));
      console.log(error);
    } catch (error) {
  
     
  
    }
  
  }