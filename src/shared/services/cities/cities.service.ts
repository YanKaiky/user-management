import axios from 'axios';
import CITIESAPI from './cities';

export interface ICityData {
  guid: string;
  name: string;
  uf: string;
}

const createCity = async (data: Omit<ICityData, 'guid'>): Promise<ICityData> => {
  try {
    const response = await axios.post(CITIESAPI, data);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const getAllCities = async (): Promise<ICityData[]> => {
  try {
    const response = await axios.get(CITIESAPI);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const getCityByGuid = async (guid: string): Promise<ICityData> => {
  try {
    const response = await axios.get(`${CITIESAPI}/${guid}`);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const updateCity = async (guid: string, data: ICityData): Promise<void> => {
  try {
    await axios.put(`${CITIESAPI}/${guid}`, data);
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const deleteCity = async (guid: string): Promise<void> => {
  try {
    await axios.delete(`${CITIESAPI}/${guid}`);
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
