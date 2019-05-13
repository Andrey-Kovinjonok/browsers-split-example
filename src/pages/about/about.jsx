import React from 'react';
import { Link } from 'react-router5';
import { PAGES } from 'router';

import style from './style';

export default class About extends React.Component {
  render() {
    const smile = '<(^_^)>';

    return (
      <div className={ style.page }>
        <h1>
          About page { smile }
        </h1>
        <nav>
          <Link routeName={ PAGES.MAIN }>
            main
          </Link>
        </nav>
      </div>
    );
  }
}
