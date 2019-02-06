
  const initialState = {

    FirstName:'',
  
    Lastname:'',
  
    Initials:'',
  
    Email:'',
  
    Password:'',
  
    ConfirmPassword:'',
    IsSuccess:false,
  
    errors:["","","","","","","",""]
  
     
  
  };
  
  export default function  RegisterReducer (state = initialState, action) {
  
    switch (action.type) { 
  
      case 'REQUESTED_ERRORS':
  
        return {
  
          errors:action.errors,
          IsSuccess:false
  
        };
        case 'REQUESTED_SUCCESS':
  
        return {
  
          IsSuccess:true
  
        };
  
      default:
  
        return state;
  
    }
  
  };