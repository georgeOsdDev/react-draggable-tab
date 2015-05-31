'use strict';

import _     from 'lodash';
import React from 'react/addons';
import Draggable from 'react-draggable';

import TabStyles from '../helpers/TabStyles';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps() {
  }

  componentWillUpdate() {
  }

  handleStart(e) {
    console.log("onStart", e);
  }

  handleDrag(e, ui) {
    console.log("onDrag", e);
    console.log("onDrag", ui.position);
  }

  handleStop(e, ui) {
    console.log("onStop", e);

    // reset or exchange tab index


    this.setState({tabs:["bbb",'aaa']});
  }

  render() {

    let tabs = this.state.tabs || this.props.tabs;

    return (
      <div>
        <ul tabIndex="-1" style={TabStyles.tabBar}>
          {_.map(tabs, (title, n) => {
            return (
              <Draggable
                  key={'tabs_' + n }
                  axis="x"
                  handle=".handle"
                  start={{x: 0, y: 0}}
                  moveOnStartChange={true}
                  zIndex={100}
                  onStart={this.handleStart.bind(this)}
                  onDrag={this.handleDrag.bind(this)}
                  onStop={this.handleStop.bind(this)}>
                  <li styles={[TabStyles.tabBarTab, TabStyles.tabBarTabActive]}>
                    <span style={TabStyles.tabBarTabBefore}></span>
                    <div style={TabStyles.tabBarTabTitle} className="handle">{title}</div>
                    <div style={TabStyles.tabBarTabCloseicon}></div>
                    <span style={TabStyles.tabBarTabAfter}></span>
                  </li>
              </Draggable>);
          })}
          <li>
            <span style={TabStyles.tabBarTabAfter}></span>
          </li>
        </ul>
        <span style={TabStyles.tabBarAfter}></span>
      </div>
    );
  }
}

Tabs.defaultProps = {
};

Tabs.propTypes = {
  tabs: React.PropTypes.arrayOf(
    React.PropTypes.string
  ).isRequired,
  onTabSelected: React.PropTypes.func,
  onTabClosed: React.PropTypes.func,
  onAddButtonClicked: React.PropTypes.func,
  className: React.PropTypes.string,
  style: React.PropTypes.object
};

export default Tabs;
