import { Component, lazy } from 'solid-js';
import { Flex, Center, Box } from '@hope-ui/solid';
import { Route, Routes } from '@solidjs/router';
import Home from '../pages/Home';
const Companies = lazy(() => import('../pages/Companies'));
const Projects = lazy(() => import('../pages/Projects'));
const CreateCompany = lazy(() => import('../pages/CreateCompany'));
const CreateProject = lazy(() => import('../pages/CreateProject'));
// import Companies from '../pages/Companies';
// import Projects from '../pages/Projects';
// import CreateCompany from '../pages/CreateCompany';

export const ContentBody: Component = () => {
  return (
    <Flex flex={1} bg="$accent1">
      <Box css={{ width: '100%' }}>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/companies" component={Companies} />
          <Route path="/companies/create" component={CreateCompany} />
          <Route path="/projects" component={Projects} />
          <Route path="/projects/create" component={CreateProject} />
        </Routes>
      </Box >
    </Flex >
  );
};
