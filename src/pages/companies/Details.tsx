import { Protected, useAuth0 } from "@afroze9/solid-auth0";
import { Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, VStack } from "@hope-ui/solid";
import { Link, useNavigate, useParams } from "@solidjs/router";
import { Component, createEffect, createSignal } from "solid-js";
import { CompanyResponse } from "../../@types";
import { getCompanyById, updateCompany } from "../../api/company/CompanyApi";
import { ErrorResponse, isErrorReponse } from "../../api/ErrorResponse";
import { InferType, object, string } from "yup";
import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-yup";

type FormProps = {
  name: string;
  // tags: string;
};

const schema = object({
  name: string().min(5).required(),
  // tags: string().min(5).required(),
});


const CompanyDetails: Component = () => {
  const auth0 = useAuth0();
  const params = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = createSignal<CompanyResponse>({
    id: 0,
    name: '',
    projects: [],
    tags: [],
  });

  const form = createForm<InferType<typeof schema>>({
    extend: validator({ schema }),
    onSubmit: values => {
      saveCompany(values);
    },
  });

  createEffect(async () => {
    try {
      const data = await getCompany(+params.id);
      setCompany(data);
    } catch (error) {
      console.error(error);
    }
  })

  async function saveCompany(values: FormProps) {
    let updatedCompany = {
      id: +params.id,
      name: values.name,
      // tags: values.tags.split(',')
    };
    console.log(updatedCompany);

    let response = await updateCompany(+params.id, updatedCompany, await auth0.getToken());
    if (!isErrorReponse(response)) {
      navigate('/companies');
    } else {
      alert((response as ErrorResponse).message);
    }
  }

  async function getCompany(id: number): Promise<CompanyResponse> {
    const response = await getCompanyById(id, await auth0.getToken());
    if (!isErrorReponse(response)) {
      let company = response as CompanyResponse;
      return company;
    }

    return {
      id: 0,
      name: '',
      projects: [],
      tags: [],
    }
  }

  return (
    <Container p="$2">
      <Flex>
        <Heading size="xl">
          {company()?.name}
        </Heading>
      </Flex>
      <Container mt="$4">
        <VStack
          as='form'
          ref={form.form}
          spacing="$5"
          alignItems="stretch"
          maxW="$96"
          mx="auto"
        >
          <FormControl required invalid={!!form.errors("name")}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" placeholder="Company Name" value={company()?.name} />
            <FormErrorMessage>{form.errors("name")?.[0]}</FormErrorMessage>
          </FormControl>
          {/* <FormControl required invalid={!!form.errors("tags")}>
            <FormLabel for="tags">Tags</FormLabel>
            <Input type="text" name="tags" placeholder="Tags" value={company()?.tags?.map(x => x.name).join(', ')} />
            <FormErrorMessage>{form.errors("tags")?.[0]}</FormErrorMessage>
          </FormControl> */}
          <HStack justifyContent="flex-end" spacing="$5">
            <Button type="button" colorScheme="danger" as={Link} href='/companies'>
              Cancel
            </Button>
            <Button type="submit" disabled={!form.isValid()}>
              Update
            </Button>
          </HStack>
        </VStack>
      </Container>
      <Container>
        <ul>
          {company()?.projects?.map(x => <li>
            <a href={`/projects/${x.id}/details`} >{x.name}</a> - {x.taskCount} tasks
          </li>)}
        </ul>
      </Container>
    </Container>
  )
}

export default () => (
  <Protected onRedirecting={<>Loading</>}>
    <CompanyDetails />
  </Protected>
)
function bind(name: any): import("solid-js").JSX.IntrinsicAttributes & import("@hope-ui/solid").InputProps {
  throw new Error("Function not implemented.");
}

