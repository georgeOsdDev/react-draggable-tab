'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* Inspired from Atom
  https://github.com/atom/tabs
  https://github.com/atom/atom-dark-ui
*/
var TabStyles = {

  tabWrapper: {
    height: '100%',
    width: '100%',
    position: 'relative'
  },

  tabBar: {
    // @TODO safari needs prefix. Style should be define in CSS.
    // Can't use duprecated key's for inline-style.
    // See https://github.com/facebook/react/issues/2020
    // display: '-webkit-flex',
    // display: '-ms-flexbox',
    display: 'flex',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    margin: 0,
    listStyle: 'none',
    outline: '0px',
    overflowY: 'hidden',
    overflowX: 'hidden',
    minWidth: '95%',
    maxWidth: '99%',
    paddingRight: '35px'
  },

  tabBarAfter: {
    content: '',
    position: 'absolute',
    top: '26px',
    height: '5px',
    left: 0,
    right: 0,
    zIndex: 2,
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
    marginLeft: '30px',
    paddingLeft: '15px',
    paddingRight: '24px',
    WebkutBoxFlex: 1,
    WebkitFlex: 1,
    MozFlex: 1,
    msFlex: 1,
    flex: 1,
    maxWidth: '175px',
    minWidth: '0px',
    transform: 'translate(0px, 0px)'
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
    backgroundImage: 'linear-gradient(#454545, #333333)',
    borderRadius: '7.5px 0 0 0'
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
    backgroundImage: 'linear-gradient(#454545, #333333)',
    borderRadius: '0 7.5px 0 0'
  },

  tabTitle: {
    cursor: 'default',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginTop: '8px',
    float: 'left',
    textAlign: 'center',
    postion: 'relative',
    width: '90%',
    color: 'rgb(170, 170, 170)'
  },

  tabActive: {
    WebkutBoxFlex: 2,
    WebkitFlex: 2,
    MozFlex: 2,
    msFlex: 2,
    flex: 2,
    zIndex: 1,
    color: '#ffffff',
    fontSize: '13px',
    backgroundImage: 'linear-gradient(#343434, #222222)'
  },

  tabBeforeActive: {
    backgroundImage: 'linear-gradient(#343434, #222222)'
  },

  tabAfterActive: {
    backgroundImage: 'linear-gradient(#343434, #222222)'
  },

  tabTitleActive: {
    lineHeight: '1.5em',
    color: 'rgb(255, 255, 255)',
    marginTop: '6px'
  },

  tabOnHover: {
    backgroundImage: 'linear-gradient(#333333, #222222)'
  },

  tabBeforeOnHover: {
    backgroundImage: 'linear-gradient(#333333, #222222)'
  },

  tabAfterOnHover: {
    backgroundImage: 'linear-gradient(#333333, #222222)'
  },

  tabTitleOnHover: {
    filter: 'alpha(opacity=20)'
  },

  tabCloseIcon: {
    position: 'absolute',
    cursor: 'pointer',
    font: '16px arial, sans-serif',
    right: '-2px',
    marginTop: '8px',
    textDecoration: 'none',
    textShadow: '0 1px 0 #fff',
    lineHeight: '1em',
    filter: 'alpha(opacity=20)',
    opacity: '.2',
    width: '16px',
    height: '16px',
    textAlign: 'center',
    WebkitBorderRadius: '8px',
    MozBorderRadius: '8px',
    borderRadius: '8px',
    zIndex: 999
  },

  tabCloseIconOnHover: {
    filter: 'none',
    backgroundColor: 'red',
    color: 'white'
  },

  tabAddButton: {
    cursor: 'pointer',
    fontFamily: "'Lucida Grande', 'Segoe UI', Ubuntu, Cantarell, sans-serif",
    fontSize: '20px',
    textShadow: 'rgb(255, 255, 255) 0px 1px 0px',
    position: 'relative',
    width: '25px',
    height: '26px',
    marginLeft: '20px',
    zIndex: 2
  },

  beforeTitle: {
    position: 'absolute',
    top: '8px',
    left: '-8px',
    zIndex: 2
  },

  afterTitle: {
    position: 'absolute',
    top: '8px',
    right: '16px',
    zIndex: 2
  }
};

exports.default = TabStyles;