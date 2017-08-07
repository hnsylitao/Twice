/**
 * Created by Li on 2017/8/7.
 */
import React from 'react';
import {Button} from 'antd';

class App extends React.Component {

  render() {
    return <Button>{this.props.children}</Button>;
  }

}

export default App
