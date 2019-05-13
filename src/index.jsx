import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, Route } from 'react-router5';

import Main from './pages/main';
import About from './pages/about';
import { router, PAGES } from './router';

import './globalStyles';

function App({ route }) {
  switch (route.name) {
    case PAGES.MAIN:
      return <Main />;
    case PAGES.ABOUT:
      return <About />;
    default:
      return <Main />;
  }
}

ReactDOM.render(
  <RouterProvider router={ router }>
    <Route>
      { ({ route }) => <App route={ route } /> }
    </Route>
  </RouterProvider>,
  document.getElementById('app')
);
