export type CompanyResponse = {
  id: number;
  name: string;
  projects: number;
}

export type CompanyRequest = {
  name: string;
  tags: string[];
}

export type CompanySummaryResponseModel = {
  id: number;
  name: string;
  projectCount: number;
  tags: string[];
}