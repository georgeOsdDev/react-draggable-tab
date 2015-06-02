/* Inspired from Atom
  https://github.com/atom/tabs
  https://github.com/atom/atom-dark-ui
*/
'use strict';

let StyleSheet = require('react-style');

const TabStyles = StyleSheet.create({

  wrapper: {
    position: 'relative'
  },

  tabBar: {
    display: '-webkit-box',
    display: '-webkit-flex',
    display: '-ms-flexbox',
    display: 'flex',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    margin: 0,
    listStyle: 'none',
    outline: '0px'
  },

  tabBarAfter: {
    content: '',
    position: 'absolute',
    bottom: '0',
    height: '5px',
    left: '0',
    right: '0',
    zIndex: 100,
    backgroundColor: '#222222',
    borderBottom: '1px solid #111111',
    pointerEvents: 'none'
  },

  tab: {
    fontFamily: "'Lucida Grande', 'Segoe UI', Ubuntu, Cantarell, sans-serif",
    backgroundImage: 'linear-gradient(#454545, #333333)',
    height: '26px',
    fontSize: '11px',
    position: 'relative',
    marginLeft: '5px',
    paddingTop: '.5em',
    paddingLeft: '15px',
    paddingRight: '24px',
    WebkutBoxFlex: 1,
    WebkitFlex: 1,
    MozFlex: 1,
    msFlex: 1,
    flex: 1,
    maxWidth: '175px',
    minWidth: '40px'
  },

  tabBefore: {
    content: '',
    position: 'absolute',
    top: '0px',
    width: '25px',
    height: '26px',

    left: '-14px',
    borderTopLeftRadius: '3px',
    boxShadow: 'inset 1px 1px 0 #484848, -4px 0px 4px rgba(0, 0, 0, 0.1)',
    WebkitTransform: 'skewX(-30deg)',
    MozTransform: 'skewX(-30deg)',
    msTransform: 'skewX(-30deg)',
    transform: 'skewX(-30deg)',
    backgroundImage: 'linear-gradient(#454545, #333333)'
  },

  tabAfter: {
    content: '',
    position: 'absolute',
    top: '0px',
    width: '25px',
    height: '26px',

    right: '-14px',
    borderTopRightRadius: '3px',
    boxShadow: 'inset -1px 1px 0 #484848, 4px 0px 4px rgba(0, 0, 0, 0.1)',
    WebkitTransform: 'skewX(30deg)',
    MozTransform: 'skewX(30deg)',
    msTransform: 'skewX(30deg)',
    transform: 'skewX(30deg)',
    backgroundImage: 'linear-gradient(#454545, #333333)'
  },

  tabActive: {
    WebkutBoxFlex: 2,
    WebkitFlex: 2,
    MozFlex: 2,
    msFlex: 2,
    flex: 2,
    zIndex: 1,
    color: '#ffffff',
    paddingTop: '5px',
    fontSize: '13px',
    backgroundImage: 'linear-gradient(#343434, #222222)'
  },

  tabTitle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    top: '5px',
    float: 'left',
    textAlign: 'center',
    postion: 'relative',
    width: '70%'
  },

  tabTitleActive: {
    paddingRight: '10px',
    lineHeight: '1.5em'
  },

  tabCloseIcon:{
    cursor: 'pointer',
    font: '14px/100% arial, sans-serif',
    right: '5px',
    textDecoration: 'none',
    textShadow: '0 1px 0 #fff',
    top: '5px',

    float: 'right',
    fontSize: '1.5em',
    lineHeight: '1em',
    filter: 'alpha(opacity=20)',
    opacity: '.2'
  },

  tabCloseIconOnHover:{
    textShadow: '0 1px 0 #red',
    color:'red'
  },

  tabAddButton: {
    cursor: 'pointer',
    fontFamily: "'Lucida Grande', 'Segoe UI', Ubuntu, Cantarell, sans-serif",
    fontSize: '20px',
    textShadow: 'rgb(255, 255, 255) 0px 1px 0px',
    position: 'relative',
    width: '25px',
    height: '26px',
    marginLeft: '20px'
  }

});

export default TabStyles;
