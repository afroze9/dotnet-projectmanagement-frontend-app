export type ProjectResponse = {
  id: number;
  name: string;
  companyId: number;
  tasks: number;
}

export type ProjectRequest = {
  name: string;
  companyId: number;
}