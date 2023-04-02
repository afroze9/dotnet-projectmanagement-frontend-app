import type { Component } from 'solid-js';
import { Flex, Box, Button, Heading, Spacer, Anchor } from '@hope-ui/solid';
import { CONSTANTS } from '../constants';
import { Link } from '@solidjs/router';

export const TopNav: Component = () => {
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
        <Button mr="$4" color="$accent1">Sign Up</Button>
        <Button color="$accent1">Log in</Button>
      </Box>
    </Flex>
  );
};
