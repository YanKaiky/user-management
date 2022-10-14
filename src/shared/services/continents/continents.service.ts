import axios from 'axios';
import CONTINENTS from './continents';

export interface ICreateContinentData {
  name: string;
}

export interface IUpdateContinentData {
  guid: string;
  name: string;
}

export interface IContinentData {
  guid: string;
  name: string;
}

const createContinent = async (data: ICreateContinentData): Promise<IContinentData> => {
  try {
    const response = await axios.post(CONTINENTS, data, {
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

const getAllContinents = async (): Promise<IContinentData[]> => {
  try {
    const response = await axios.get(CONTINENTS, {
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

const getContinentByGuid = async (guid: string): Promise<IContinentData> => {
  try {
    const response = await axios.get(`${CONTINENTS}/${guid}`, {
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

const updateContinent = async (guid: string, data: IUpdateContinentData): Promise<void> => {
  try {
    await axios.put(`${CONTINENTS}/${guid}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const deleteContinent = async (guid: string): Promise<void> => {
  try {
    await axios.delete(`${CONTINENTS}/${guid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const ContinentsService = {
  createContinent,
  getAllContinents,
  getContinentByGuid,
  updateContinent,
  deleteContinent
};
