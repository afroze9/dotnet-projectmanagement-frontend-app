import type { Component } from 'solid-js';
import { Flex, Box, Button, Heading, Spacer, Anchor, Text, Center } from '@hope-ui/solid';
import { CONSTANTS } from '../constants';
import { Link } from '@solidjs/router';
import { useAuth0 } from '../auth/Auth0';
import { Auth0State } from '../auth/@types';

export const TopNav: Component = () => {
  const auth0: Auth0State | undefined = useAuth0();
  console.log(auth0?.isAuthenticated())

  return (
    <Flex bg="$accent12">
      <Box p="$2">
        <Anchor as={Link} href='/'>
          <Heading size="xl" fontWeight="$bold" color="$accent1">
            {CONSTANTS.APP_NAME}
          </Heading>
        </Anchor>
      </Box>
      <Spacer />
      <Box p="$2">
        {
          auth0?.isAuthenticated() ?
            <Flex>
              <Center color="$accent1" mr="$6">
                {auth0?.user()?.name}
              </Center>
              <Button
                color="$accent1"
                onClick={() => {
                  console.log('logging out');
                  auth0?.logout();
                }}
              >Log out</Button>
            </Flex>
            :
            <Button
              color="$accent1"
              onClick={() => {
                console.log('logging in');
                auth0?.loginWithRedirect();
              }}
            >Log in</Button>
        }
      </Box>
    </Flex>
  );
};
