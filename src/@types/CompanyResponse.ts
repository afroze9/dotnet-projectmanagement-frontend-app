export type CompanyResponse = {
  id: number;
  name: string;
  projects: number;
}

export type CompanyRequest = {
  name: string;
  tags: string[];
}