import axios from 'axios';
import API from './auth';

interface IAuth {
  token: string
}

const auth = async (encode: string): Promise<IAuth | Error> => {
  try {
    const response = await axios.post(API, {
      data: {
        encode,
      }
    });

    if (!response) new Error('Login error');

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const AuthService = {
  auth,
};
