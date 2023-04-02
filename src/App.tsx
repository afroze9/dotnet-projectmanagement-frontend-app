import type { Component } from 'solid-js';
import { HopeThemeConfig, HopeProvider } from '@hope-ui/solid'
import { Layout } from './components/Layout';
import { Router } from '@solidjs/router';

const config: HopeThemeConfig = {
  lightTheme: {
  }
}

const App: Component = () => {
  return (
    <Router>
      <HopeProvider config={config}>
        <Layout />
      </HopeProvider>
    </Router>
  );
};

export default App;
