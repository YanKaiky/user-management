import axios from 'axios';
import DASHBOARDAPI from './dashboard';

export interface IDashboardData {
  people: number;
  cities: number;
  ufs: number;
}

const getValues = async (): Promise<IDashboardData> => {
  try {
    const response = await axios.get(DASHBOARDAPI, {
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

export const DashboardService = {
  getValues,
};
