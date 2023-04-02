import type { Component } from 'solid-js';
import { Flex, Center, Box } from '@hope-ui/solid';
import { Route, Routes } from '@solidjs/router';
import Home from '../pages/Home';
import Companies from '../pages/Companies';
import Projects from '../pages/Projects';

export const ContentBody: Component = () => {
  return (
    <Flex flex={1} bg="$accent1">
      <Box css={{ width: '100%' }}>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/companies" component={Companies} />
          <Route path="/projects" component={Projects} />
        </Routes>
      </Box >
    </Flex >
  );
};
