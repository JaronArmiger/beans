import axios from 'axios';

export const createOrUpdateUser = async (authtoken) => {
  // empty braces are for body
  // third arg is headers
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`, 
    {}, 
    {
      headers: {
        authtoken
      }
    },
  );
}