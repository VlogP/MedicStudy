import axios from 'axios';

export const requestForError = (data) => {

    return { type: 'REQUESTED_ERROR', error: data}
  
  };

  export const requestForSucsess = () => {

    return { type: 'REQUESTED_SUCСESS'}
  
  };
  
  
     
  