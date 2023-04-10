import { CompanyRequest, CompanyResponse } from "../../@types";
import axios from 'axios';
import { ErrorResponse } from "../ErrorResponse";
import { getAxiosConfig, getUrl } from "../configs/axiosConfig";

const getCompanies = async (token: string): Promise<CompanyResponse[] | ErrorResponse> => {
  const url = getUrl('/company');
  const config = getAxiosConfig(token);

  try {
    const response = await axios.get<CompanyResponse[]>(url, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return { message: (e as any).toString() };
  }
}

const getCompanyById = async (id: number, token: string): Promise<CompanyResponse | ErrorResponse> => {
  const url = getUrl('/company/${id}');
  const config = getAxiosConfig(token);

  try {
    const response = await axios.get<CompanyResponse>(url, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return { message: (e as any).toString() };
  }
}

const createCompany = async (company: CompanyRequest, token: string): Promise<CompanyResponse | ErrorResponse> => {
  const url = getUrl('/company');
  const config = getAxiosConfig(token);

  try {
    const response = await axios.post<CompanyResponse>(url, company, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return { message: (e as any).toString() };
  }
}

export { getCompanies, getCompanyById, createCompany }
