import axios from 'axios';
import COUNTRIESAPI from './countries';

export interface ICreateCountryData {
  name: string;
  continent_guid: string;
}

export interface IUpdateCountryData {
  guid: string;
  name?: string;
  continent_guid?: string;
}

export interface ICountryData {
  guid: string;
  name: string;
  continent_guid: string;
}

const createCountry = async (data: ICreateCountryData): Promise<ICountryData> => {
  try {
    const response = await axios.post(COUNTRIESAPI, data, {
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

const getAllCountries = async (): Promise<ICountryData[]> => {
  try {
    const response = await axios.get(COUNTRIESAPI, {
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

const getCountryByGuid = async (guid: string): Promise<ICountryData> => {
  try {
    const response = await axios.get(`${COUNTRIESAPI}/${guid}`, {
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

const updateCountry = async (guid: string, data: IUpdateCountryData): Promise<void> => {
  try {
    await axios.put(`${COUNTRIESAPI}/${guid}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const deleteCountry = async (guid: string): Promise<void> => {
  try {
    await axios.delete(`${COUNTRIESAPI}/${guid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
      }
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const CountriesService = {
  createCountry,
  getAllCountries,
  getCountryByGuid,
  updateCountry,
  deleteCountry
};
