import type { Component } from 'solid-js';
import { HopeThemeConfig, HopeProvider } from '@hope-ui/solid'
import { Layout } from './components/Layout';
import { Router } from '@solidjs/router';
import { Auth0 } from '@afroze9/solid-auth0';

const config: HopeThemeConfig = {
  lightTheme: {
  }
}

const App: Component = () => {
  return (
    <Auth0
      domain='afrozeprojectmanagement.us.auth0.com'
      clientId='mIUsoezCpUuf9zcm7py5syzgtVvNQTvD'
      audience='company'
      logoutRedirectUri={`${window.location.origin}/`}
      loginRedirectUri={`${window.location.origin}/`}
      scope='openid profile email read:project write:project update:project delete:project read:company write:company update:company delete:company'
    >
      <Router>
        <HopeProvider config={config}>
          <Layout />
        </HopeProvider>
      </Router>
    </Auth0>
  );
};

export default App;
