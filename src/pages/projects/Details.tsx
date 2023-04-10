import { Protected, useAuth0 } from "@afroze9/solid-auth0";
import { Container, Flex, Heading } from "@hope-ui/solid";
import { useNavigate, useParams } from "@solidjs/router";
import { Component, createResource } from "solid-js";
import { CompanyResponse, ProjectResponse } from "../../@types";
import { getProjectById } from "../../api/project/ProjectApi";
import { isErrorReponse } from "../../api/ErrorResponse";
import { getCompanyById } from "../../api/company/CompanyApi";

const ProjectDetails: Component = () => {
  const auth0 = useAuth0();
  const params = useParams();
  const navigate = useNavigate();

  const getProject = async (id: number): Promise<ProjectResponse> => {
    const response = await getProjectById(id, await auth0.getToken());
    if (!isErrorReponse(response)) {
      let project = response as ProjectResponse;
      return project;
    }

    return {
      id: 0,
      name: '',
      tasks: 0,
      companyId: 0,
    }
  }

  const getCompany = async (id: number): Promise<CompanyResponse> => {
    if (project() === undefined) {
      return {
        id: 0,
        name: '',
        projects: 0,
      };
    }

    const response = await getCompanyById(project()!.companyId, await auth0.getToken());
    if (!isErrorReponse(response)) {
      let company = response as CompanyResponse;
      return company;
    }

    return {
      id: 0,
      name: '',
      projects: 0,
    }
  }

  const [project] = createResource(+params.id, getProject);
  const [company] = createResource(project()?.companyId, getCompany);

  return (
    <Container p="$2">
      <Flex>
        <Heading size="xl">
          Project - {project()?.name}
        </Heading>
        <div>{company()?.name}</div>
      </Flex>
      <Container mt="$4">

      </Container>
    </Container>
  );
}

export default () => (
  <Protected onRedirecting={<>Loading</>}>
    <ProjectDetails />
  </Protected>
)
