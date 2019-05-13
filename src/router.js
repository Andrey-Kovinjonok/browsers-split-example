import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

export const PAGES = {
  MAIN: 'main',
  ABOUT: 'about'
};

const routes = [
  { name: PAGES.MAIN, path: '/' },
  { name: PAGES.ABOUT, path: '/about' }
];

export const router = createRouter(routes, { defaultRoute: PAGES.MAIN });

router.usePlugin(browserPlugin());
router.start();
