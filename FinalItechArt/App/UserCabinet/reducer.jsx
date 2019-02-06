const initialState = {

    Email:'',
  
    error:''  
     
  };
  
  export default function   AuthReducer  (state = initialState, action) {
  
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