import {put, call,takeEvery} from 'redux-saga/effects';
import {requestForError,requestForSuccess,AuthRequest} from './create_action.jsx';


export function* watchAuthorize() {

    yield takeEvery('CHECK_AUTH', Authorize); 
  
  }
  
  
  
  function* Authorize(e) {
  
    try {
     
     var error=yield call(AuthRequest,{Info:e});
     console.log(error);
     if(error=="")
      yield put(requestForSuccess());
      
      yield put(requestForError(error));

    } catch (error) {

    }
  
  }