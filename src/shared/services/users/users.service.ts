import axios from 'axios';
import USERSAPI from './users';

export interface ICreateUserData {
  name: string;
  last_name?: string;
  email: string;
  cpf: string;
  birth_date: string;
  city_guid: string;
}

export interface IUpdateUserData {
  guid: string;
  name?: string;
  last_name?: string;
  email?: string;
  cpf?: string;
  birth_date?: string;
  city_guid?: string;
}

export interface IUserData {
  guid: string;
  name: string;
  last_name: string;
  email: string;
  cpf: string;
  birth_date: string;
  city_guid: string;
  city: string;
}

const createUser = async (data: ICreateUserData): Promise<IUserData> => {
  try {
    const response = await axios.post(USERSAPI, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const getAllUsers = async (): Promise<IUserData[]> => {
  try {
    const response = await axios.get(USERSAPI, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const getUserByGuid = async (guid: string): Promise<IUserData> => {
  try {
    const response = await axios.get(`${USERSAPI}/${guid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const updateUser = async (guid: string, data: IUpdateUserData): Promise<void> => {
  try {
    await axios.put(`${USERSAPI}/${guid}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const deleteUser = async (guid: string): Promise<void> => {
  try {
    await axios.delete(`${USERSAPI}/${guid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const UsersService = {
  createUser,
  getAllUsers,
  getUserByGuid,
  updateUser,
  deleteUser
};
