/**
 * Created by Li on 2017/8/4.
 */
import styles from './app.less';
import Config from 'Config';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Views/app';

ReactDOM.render(
  <div className={styles.wrapper}>
    <App>{JSON.stringify(Config)}</App>
  </div>,
  document.getElementById('app')
);