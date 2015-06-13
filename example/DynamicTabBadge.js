'use strict';

import _     from 'lodash';
import React from 'react/addons';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';


class DynamicTabContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      badgeCount: 0
    };
  }

  componentDidMount(){
    this.startTimer();
  }

  startTimer(){
    setInterval(() => {
      this.setState({
        badgeCount: this.state.badgeCount + 1
      });
    }, 3000);
  }

  render() {
    return (<NotificationBadge count={this.state.badgeCount} effect={Effect.SCALE} style={{top: '-2px', right: ''}} />);
  }
};

export default DynamicTabContent;
