import axios from "axios";
import API from "./auth";

interface IAuth {
  token: string
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const response = await axios.post(API, {
      data: {
        email,
        password,
      }
    });

    if (!response) new Error('Login error') 
    
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const AuthService = {
  auth,
}
