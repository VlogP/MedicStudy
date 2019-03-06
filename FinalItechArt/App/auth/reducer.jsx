const initialState = {

    IsSuccess:false,
    error:''  
     
  };
  
  export default function   AuthReducer  (state = initialState, action) {
  
    switch (action.type) { 
  
      case 'REQUESTED_ERROR':
  
        return {
  
          error:action.error,
          
        };
        case 'REQUESTED_SUCСESS':
  
        return {
  
          IsSuccess:true
  
        };
        
  
      default:
  
        return state;
  
    }
  
  };