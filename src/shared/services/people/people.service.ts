import axios from 'axios';
import PEOPLEAPI from './people';

interface IPeopleData {
  name: string;
  last_name: string;
  email: string;
  cpf: string;
  birth_date: string;
}

// const createPeople = async (): Promise<IPeopleData> => { };
const getAllPeople = async (): Promise<IPeopleData> => {
  try {
    const response = await axios.get(PEOPLEAPI);

    console.log(response);
    
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
// const getPeopleByGuid = async (): Promise<IPeopleData> => { };
// const updatePeople = async (): Promise<IPeopleData> => { };
// const deletePeople = async (): Promise<string> => { };

export const PeopleService = {
  // createPeople,
  getAllPeople,
  // getPeopleByGuid,
  // updatePeople,
  // deletePeople
};
