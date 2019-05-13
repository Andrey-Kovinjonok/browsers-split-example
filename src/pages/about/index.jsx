import React from 'react';

const AboutBundle = React.lazy(() => import(
  /* webpackChunkName: 'about' */
  /* webpackPrefetch: 9 */
  './about'
));

export default () => (
  <React.Suspense fallback={ <h1>Loading...</h1> }>
    <AboutBundle />
  </React.Suspense>
);
