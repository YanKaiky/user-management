import axios from 'axios';
import STATESAPI from './states';

export interface ICreateStateData {
  name: string;
  uf: string;
  country_guid: string;
}

export interface IUpdateStateData {
  guid: string;
  name?: string;
  uf?: string;
  country_guid?: string;
}

export interface IStateData {
  guid: string;
  name: string;
  uf: string;
  country_guid: string;
  country: string;
}

const createState = async (data: ICreateStateData): Promise<IStateData> => {
  try {
    const response = await axios.post(STATESAPI, data, {
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

const getAllStates = async (): Promise<IStateData[]> => {
  try {
    const response = await axios.get(STATESAPI, {
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

const getStateByGuid = async (guid: string): Promise<IStateData> => {
  try {
    const response = await axios.get(`${STATESAPI}/${guid}`, {
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

const updateState = async (guid: string, data: IUpdateStateData): Promise<void> => {
  try {
    await axios.put(`${STATESAPI}/${guid}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const deleteState = async (guid: string): Promise<void> => {
  try {
    await axios.delete(`${STATESAPI}/${guid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const StatesService = {
  createState,
  getAllStates,
  getStateByGuid,
  updateState,
  deleteState
};
