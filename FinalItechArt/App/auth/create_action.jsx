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
            sessionStorage.setItem("role",response.data.role);
            sessionStorage.setItem("token",response.data.token);
            console.log(sessionStorage.getItem("token"));
            
          return "";
          })
          .catch(error=>{
            console.log(error);
          return "Error there is no such user or password is not correct";
          });   
      
  
     
  }