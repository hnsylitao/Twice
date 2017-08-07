/**
 * Created by Li on 2017/8/4.
 */
import styles from './app.less';
import Config from 'Config';
import React from 'react';
import {Button} from 'antd';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div className={styles.wrapper}>
    <Button>{JSON.stringify(Config)}</Button>
  </div>,
  document.getElementById('app')
);