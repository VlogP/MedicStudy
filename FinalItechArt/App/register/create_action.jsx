import axios from 'axios';

export const requestForErrors = (data) => {

    return { type: 'REQUESTED_ERRORS', errors: data}
  
  };

 
  
  
  
  
  export function validatePassword(e){
  
       var reqular = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[!-+.@#$%^&*]).{8,16}$/;
      
      return reqular.test(e.Password);
  
  }
  
  export function validateName(e){
  
       var reqular = /^[a-zA-Z]{3,}$/;
  
      if(e.Name===undefined)return false;
  
      return reqular.test(e.Name);
  
  }
  
  
  export  function validateInitials(e){
  
       var reqular = /^[A-Z][.][A-Z]$/;
  
      return reqular.test(e.Initials);
  
  }
  
  export function validateConfirmPassword(e){
  
      return e.Password==e.ConfirmPassword;
  
  }
  
  export function validateEmail(e){
  
      var reqular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
      return reqular.test(e.Email);
  }
  export function RegisterRequest(e){
  
      return axios.post('',{
          Firstname:e.Info.FirstName,   
          Lastname:e.Info.Lastname,   
          Initials:e.Info.Initials,  
          Email:e.Info.Email,
          Password:e.Info.Password
          })
          .then(response=>{
          return "";
          })
          .catch(error=>{
          return "Error user with this Email already is";
          });   
      
  
     
  }