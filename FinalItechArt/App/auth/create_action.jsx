import axios from 'axios';

export const requestForError = (data) => {

    return { type: 'REQUESTED_ERROR', error: data}
  
  };

  export const requestForSucsess = () => {

    return { type: 'REQUESTED_SUCСESS'}
  
  };

 
  export function AuthRequest(e){
  
      return axios.post('',{         
          Email:e.Info.Email,
          Password:e.Info.Password
          })
          .then(response=>{
            console.log(response);
          return "";
          })
          .catch(error=>{
            console.log(error);
          return "Error there is no such user or password is not correct";
          });   
      
  
     
  }