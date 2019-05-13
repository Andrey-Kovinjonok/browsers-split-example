import React from 'react';

const MainBundle = React.lazy(() => import(
  /* webpackChunkName: 'main' */
  /* webpackPrefetch: 10 */
  './main'
));

export default () => (
  <React.Suspense fallback={ <h1>Loading...</h1> }>
    <MainBundle />
  </React.Suspense>
);
