
  const initialState = {

    FirstName:'',
  
    Lastname:'',
  
    Initials:'',
  
    Email:'',
  
    Password:'',
  
    ConfirmPassword:'',
  
    errors:["","","","","","","",""]
  
     
  
  };
  
  export default function  RegisterReducer (state = initialState, action) {
  
    switch (action.type) { 
  
      case 'REQUESTED_ERRORS':
  
        return {
  
          errors:action.errors
  
        };
        
  
      default:
  
        return state;
  
    }
  
  };