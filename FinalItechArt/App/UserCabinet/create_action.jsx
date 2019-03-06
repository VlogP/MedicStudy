import axios from 'axios';

export const requestForError = (data) => {

    return { type: 'REQUESTED_ERROR', error: data}
  
  };

  export const requestForSucsess = () => {

    return { type: 'REQUESTED_SUCСESS'}
  
  };
  export const requestForInitial = (data) => {

    return { type: 'REQUESTED_INITIAL',info:data}
  
  };

  axios.defaults.headers.common['Authorization'] = 
  'Bearer ' + sessionStorage.getItem('token');

  export function InitialRequest(){
      return axios.get('cabinet/getdata',)
          .then(response=>{
           
          return response.data;
          })
          .catch(error=>{
            console.log(error);
          return "Error there is no such user or password is not correct";
          });   
      
  
     
  }