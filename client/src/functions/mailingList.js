import axios from 'axios';

export const addEmail = async (email) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/mailing-list/promo/add`,
    {
      email,
    }
  );
}

export const removeEmail = async (email) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/mailing-list/promo/remove`,
    {
      email,
    }
  );
}