import axios from 'axios';
import PEOPLEAPI from './people';

export interface IUpsertPeopleData {
  name: string;
  last_name: string;
  email: string;
  cpf: string;
  birth_date: string;
  city_guid: string;
}

export interface IPeopleData {
  guid: string;
  name: string;
  last_name: string;
  email: string;
  cpf: string;
  birth_date: string;
  city_guid: string;
  city: string;
}

const createPeople = async (data: IUpsertPeopleData): Promise<IUpsertPeopleData> => {
  try {
    const response = await axios.post(PEOPLEAPI, data);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const getAllPeople = async (): Promise<IPeopleData[]> => {
  try {
    const response = await axios.get(PEOPLEAPI);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const getPeopleByGuid = async (guid: string): Promise<IPeopleData> => {
  try {
    const response = await axios.get(`${PEOPLEAPI}/${guid}`);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const updatePeople = async (guid: string, data: IUpsertPeopleData): Promise<void> => {
  try {
    await axios.put(`${PEOPLEAPI}/${guid}`, data);
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const deletePeople = async (guid: string): Promise<void> => {
  try {
    await axios.delete(`${PEOPLEAPI}/${guid}`);
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const PeopleService = {
  createPeople,
  getAllPeople,
  getPeopleByGuid,
  updatePeople,
  deletePeople
};
