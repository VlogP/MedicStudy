const initialState = {

    Firstname:'',
  Lastname:'',
  Initials:'',
  NewPassword:'',
    error:''  
     
  };
  
  export default function   CabinetReducer  (state = initialState, action) {
  
    switch (action.type) { 
  
      case 'REQUESTED_ERROR':
  
        return {
  
          error:action.error
  
        };
        case 'REQUESTED_SUCСESS':
  
        return {
  
          error:state.error
  
        };
        
  
      default:
  
        return state;
  
    }
  
  };