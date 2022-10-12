import axios from 'axios';
import CITIESAPI from './cities';

export interface ICreateCityData {
  name: string;
  uf: string;
}

export interface IUpdateCityData {
  guid: string;
  name?: string;
  uf?: string;
}

export interface ICityData {
  guid: string;
  name: string;
  uf: string;
}

const createCity = async (data: ICreateCityData): Promise<ICityData> => {
  try {
    const response = await axios.post(CITIESAPI, data, {
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

const getAllCities = async (): Promise<ICityData[]> => {
  try {
    const response = await axios.get(CITIESAPI, {
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

const getCityByGuid = async (guid: string): Promise<ICityData> => {
  try {
    const response = await axios.get(`${CITIESAPI}/${guid}`, {
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

const updateCity = async (guid: string, data: IUpdateCityData): Promise<void> => {
  try {
    await axios.put(`${CITIESAPI}/${guid}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const deleteCity = async (guid: string): Promise<void> => {
  try {
    await axios.delete(`${CITIESAPI}/${guid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const CitiesService = {
  createCity,
  getAllCities,
  getCityByGuid,
  updateCity,
  deleteCity
};
