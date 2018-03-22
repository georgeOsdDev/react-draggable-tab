'use strict';

import React from 'react';
import NotificationBadge, {Effect} from 'react-notification-badge';

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
    return (<NotificationBadge count={this.state.badgeCount} effect={Effect.SCALE}/>);
  }
}

export default DynamicTabContent;
