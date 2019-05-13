import React from 'react';
import { Link } from 'react-router5';
import { PAGES } from 'router';

import style from './style';

export default class Main extends React.Component {
  render() {
    const smile = '<(0_0)>';

    return (
      <div className={ style.page }>
        <h1>
          Main page { smile }
        </h1>
        <nav>
          <Link routeName={ PAGES.ABOUT }>
            about
          </Link>
        </nav>
      </div>
    );
  }
}
