import { withAuthenticationRequired } from "@afroze9/solid-auth0";
import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-yup";
import { Container, Flex, Heading, VStack, FormControl, FormLabel, Input, FormErrorMessage, HStack, Button, Select, SelectContent, SelectIcon, SelectListbox, SelectOption, SelectOptionIndicator, SelectOptionText, SelectPlaceholder, SelectTrigger, SelectValue, SimpleOption, SimpleSelect } from "@hope-ui/solid";
import { useNavigate, Link } from "@solidjs/router";
import { Component, For } from "solid-js";
import { object, string, InferType, number } from "yup";
import { CompanyResponse } from "../@types";

const companies: CompanyResponse[] = [
  {
    id: 1,
    name: 'Acme Inc.',
    projects: 5
  },
  {
    id: 2,
    name: 'Globex Corporation',
    projects: 10
  },
  {
    id: 3,
    name: 'Initech',
    projects: 3
  },
  {
    id: 4,
    name: 'Umbrella Corporation',
    projects: 7
  },
  {
    id: 5,
    name: 'Stark Industries',
    projects: 15
  },
  {
    id: 6,
    name: 'Wayne Enterprises',
    projects: 12
  },
  {
    id: 7,
    name: 'Oscorp Industries',
    projects: 8
  },
  {
    id: 8,
    name: 'S.H.I.E.L.D.',
    projects: 4
  },
  {
    id: 9,
    name: 'Weyland-Yutani Corporation',
    projects: 6
  },
  {
    id: 10,
    name: 'Cyberdyne Systems Corporation',
    projects: 2
  },
  {
    id: 11,
    name: 'Staples Inc.',
    projects: 1
  },
  {
    id: 12,
    name: 'Walmart Inc.',
    projects: 20
  },
  {
    id: 13,
    name: 'Target Corporation',
    projects: 14
  },
  {
    id: 14,
    name: 'Microsoft Corporation',
    projects: 18
  },
  {
    id: 15,
    name: 'Amazon.com, Inc.',
    projects: 22
  }
]

const schema = object({
  name: string().min(5).required(),
  company: number().required(),
  tags: string().min(5).required(),
});

const CreateProject: Component = () => {
  const {
    form,
    errors,
    data,
    isValid,
    setFields
  } = createForm<InferType<typeof schema>>({
    extend: validator({ schema }),
    onSubmit: values => {
      saveProject();
    },
  });

  const navigate = useNavigate();

  const saveProject = async () => {
    setTimeout(() => {
      navigate('/projects');
    }, 1500);
  }

  return (
    <Container p="$2">
      <Flex>
        <Heading size="xl">
          Projects
        </Heading>
      </Flex>
      <Container mt="$4">
        <VStack
          as='form'
          ref={form}
          spacing="$5"
          alignItems="stretch"
          maxW="$96"
          mx="auto"
        >
          <FormControl required invalid={!!errors("name")}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" placeholder="Project Name" />
            <FormErrorMessage>{errors("name")?.[0]}</FormErrorMessage>
          </FormControl>
          <FormControl required invalid={!!errors("company")}>
            <FormLabel for="company">Company</FormLabel>
            <SimpleSelect
              placeholder="Choose a job title"
              onChange={value => setFields("company", value)}
            >
              <For each={companies}>
                {item => <SimpleOption value={item.id}>{item.name}</SimpleOption>}
              </For>
            </SimpleSelect>
            <FormErrorMessage>{errors("company")?.[0]}</FormErrorMessage>
          </FormControl>
          <FormControl required invalid={!!errors("tags")}>
            <FormLabel for="tags">Tags</FormLabel>
            <Input type="text" name="tags" placeholder="Tags" />
            <FormErrorMessage>{errors("tags")?.[0]}</FormErrorMessage>
          </FormControl>
          <HStack justifyContent="flex-end" spacing="$5">
            <Button type="button" colorScheme="danger" as={Link} href='/companies'>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid()}>
              Create
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Container>
  );
}

export default withAuthenticationRequired(CreateProject, {
  onRedirecting: () => <>Loading</>
});
