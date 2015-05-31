/* Inspired from Atom
  https://github.com/atom/tabs
  https://github.com/atom/atom-dark-ui
*/
'use strict';

let StyleSheet = require('react-style');

const TabStyles = StyleSheet.create({
  tabBar: {
    'display': '-webkit-flex',
    WebkitUserSelect: 'none',
    margin: 0
  },

  tabBarAfter: {
    content: '',
    position: 'absolute',
    bottom: '0',
    height: '5px',
    left: '0',
    right: '0',
    backgroundColor: '#222222',
    borderTop: '1px solid #484848',
    borderBottom: '1px solid #111111',
    pointerEvents: 'none'
  },

  tabBarTab: {
    backgroundImage: '-webkit-linear-gradient(top, #454545, #333333)',
    height: '26px',
    fontSize: '11px',
    position: 'relative',
    paddingLeft: '10px',
    paddingRight: '24px',
    WebkitFlex: 1,
    maxWidth: '175px',
    minWidth: '40px'
  },

  tabBarTabBefore: {
    content: '',
    position: 'absolute',
    top: '0px',
    width: '25px',
    height: '26px',

    left: '-14px',
    borderTopLeftRadius: '3px',
    boxShadow: 'inset 1px 1px 0 #484848, -4px 0px 4px rgba(0, 0, 0, 0.1)',
    WebkitTransform: 'skewX(-30deg)',
    backgroundImage: '-webkit-linear-gradient(top, #454545, #333333)'
  },

  tabBarTabAfter: {
    content: '',
    position: 'absolute',
    top: '0px',
    width: '25px',
    height: '26px',

    right: '-14px',
    borderTopRightRadius: '3px',
    boxShadow: 'inset -1px 1px 0 #484848, 4px 0px 4px rgba(0, 0, 0, 0.1)',
    WebkitTransform: 'skewX(30deg)',
    backgroundImage: '-webkit-linear-gradient(top, #454545, #333333)'
  },

  tabBarTabActive: {
    WebkitFlex: 2,
    width: '-webkit-fit-content',
    zIndex: 1,
    color: '#ffffff',
    boxShadow: 'inset -1px 1px 0 #484848, 4px -4px 4px rgba(0, 0, 0, 0.1)'
  },

  tabBarTabTitle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },

  tabBarTabTitleActive: {
    paddingRight: '10px'
  },

  tabBarTabCloseicon: {
    position: 'absolute',
    top: '1px',
    right: '10px',
    cursor: 'default',

    float: 'right',
    fontSize: '21px',
    fontWeight: 700,
    lineHeight: 1,
    color: '#000',
    textShadow: '0 1px 0 #fff',
    filter: 'alpha(opacity=20)',
    opacity: '.2'
  }

});

export default TabStyles;
