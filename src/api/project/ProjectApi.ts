import { ProjectRequest, ProjectResponse } from "../../@types";
import axios from 'axios';
import { getUrl, getAxiosConfig } from "../configs/axiosConfig";
import { ErrorResponse } from "../ErrorResponse";

const getProjects = async (token: string): Promise<ProjectResponse[] | ErrorResponse> => {
  const url = getUrl('/project');
  const config = getAxiosConfig(await token);

  try {
    const response = await axios.get<ProjectResponse[]>(url, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return { message: (e as any).toString() };
  }
}

const getProjectById = async (id: number, token: string): Promise<ProjectResponse | ErrorResponse> => {
  const url = getUrl(`/project/${id}`);
  const config = getAxiosConfig(await token);

  try {
    const response = await axios.get<ProjectResponse>(url, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return { message: (e as any).toString() };
  }
}

const createProject = async (company: ProjectRequest, token: string): Promise<ProjectResponse | ErrorResponse> => {
  const url = getUrl('/project');
  const config = getAxiosConfig(token);

  try {
    const response = await axios.post<ProjectResponse>(url, company, config);
    return response.data;
  } catch (e) {
    console.error(e);
    return { message: (e as any).toString() };
  }
}

export { getProjects, getProjectById, createProject }
