import apiService from "./apiService";

const companyApi = {
  getCompanies: async (params) => {
    const url = `/companies`;
    try {
      const data = await apiService.get(url, { params });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getCompanyDetails: async (movieId) => {
    const url = `/companies/${movieId}`;
    try {
      const data = await apiService.get(url);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  postCompany: async (params) => {
    const url = `/companies`;
    try {
      const response = await apiService.post(url, { params });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  putCompanyId: async (companyId) => {
    const url = `/companies/${companyId}`;
    try {
      const response = await apiService.post(url);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteCompanyId: async (companyId) => {
    const url = `/companies/${companyId}`;
    try {
      const response = await apiService.delete(url);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default companyApi;
