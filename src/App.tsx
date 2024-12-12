import { useState } from 'react';
import { Router, routes } from 'src/Router';

import { GlobalContextProvider } from './GlobalContext';
// core styles are required for all packages
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...

const theme = createTheme({
  primaryColor: 'teal'
  /** Put your mantine theme override here */
});
export const App = () => {
  const currentPath = window.location.pathname;

  const [name, setName] = useState('Unknown Name');

  return (
    <MantineProvider theme={theme}>
      <GlobalContextProvider value={{ name, setName }}>
        <header className='site-header'>
          <ul className='site-header-links'>
            {routes.map(route => (
              <li
                key={route.path}
                className={currentPath === route.path ? 'active' : ''}>
                <a href={route.path}>{route.name}</a>
              </li>
            ))}
          </ul>
        </header>

        <Router />
      </GlobalContextProvider>
    </MantineProvider>
  );
};
