import { createForm } from "@felte/solid";
import { Container, Flex, Heading, Spacer, Button, Table, Thead, Tr, Th, Tbody, FormControl, FormHelperText, FormLabel, Input, VStack, FormErrorMessage, HStack } from "@hope-ui/solid";
import { Link, useNavigate } from "@solidjs/router";
import { flexRender } from "@tanstack/solid-table";
import { Component, createEffect, For } from "solid-js";
import { boolean, InferType, mixed, object, string } from "yup";
import { validator } from '@felte/validator-yup';

const schema = object({
  name: string().min(5).required(),
  tags: string().min(5).required(),
});

const CreateCompany: Component = () => {
  const {
    form,
    errors,
    data,
    isValid,
    setFields
  } = createForm<InferType<typeof schema>>({
    extend: validator({ schema }),
    onSubmit: values => {
      saveCompany();
    },
  });

  const navigate = useNavigate();

  const saveCompany = async () => {
    setTimeout(() => {
      navigate('/companies');
    }, 1500);
  }

  return (
    <Container p="$2">
      <Flex>
        <Heading size="xl">
          Companies
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
            <Input type="text" name="name" placeholder="Company Name" />
            <FormErrorMessage>{errors("name")?.[0]}</FormErrorMessage>
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

export default CreateCompany;
