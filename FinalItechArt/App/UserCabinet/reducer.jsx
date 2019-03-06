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
        case 'REQUESTED_INITIAL':
  
        return {
          Firstname:action.info.firstname,
          Lastname:action.info.lastname,
          Initials:action.info.initials,
          error:state.error
  
        };
  
      default:
  
        return state;
  
    }
  
  };