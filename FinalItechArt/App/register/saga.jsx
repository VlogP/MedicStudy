import {put, call,takeEvery} from 'redux-saga/effects';
import {requestForErrors,validatePassword,validateName,validateInitials,validateConfirmPassword,validateEmail,RegisterRequest} from './create_action.jsx';

export function* watchRegistration() {

    yield takeEvery('VALIDATE', Validation); 
  
  }
  
  
  
  function* Validation(e) {
  
    try {
  
      var errors=["","","","","","",""];
      var IsReadyToSend=true;
      
  
      var IsOk = yield call(validatePassword,{Password:e.Password});
  
      if(!IsOk){errors[4]="Password must be 8-16 characters and include both numbers";IsReadyToSend==false;}	
  
      
  
      IsOk = yield call(validateConfirmPassword,{Password:e.Password,ConfirmPassword:e.ConfirmPassword});
  
      if(!IsOk){errors[5]="Not confirm password";IsReadyToSend=false;}
  
      
  
      IsOk = yield call(validateEmail,{Email:e.Email});
  
      if(!IsOk){errors[3]="Not right email";IsReadyToSend=false;}		
  
      
  
       IsOk = yield call(validateInitials,{Initials:e.Initials});
  
       if(!IsOk){errors[2]="Must be in form {A.A}";IsReadyToSend=false;}
      
  
       IsOk = yield call(validateName,{Name:e.FirstName});
  
      if(!IsOk){errors[0]="Consist only of letters";IsReadyToSend=false;	}
      
       IsOk = yield call(validateName,{Name:e.Lastname});
  
      if(!IsOk){errors[1]="Consist only of letters";IsReadyToSend=false;}	
  
      
      if(IsReadyToSend){
      errors[6]=yield call(RegisterRequest,{Info:e});
      }
    
      yield put(requestForErrors(errors));
    } catch (error) {
  
      console.log(error);
  
    }
  
  }
  