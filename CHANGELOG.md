## Change Log

### Ver 0.10.1

  * #101 [Received `false` for a non-boolean attribute `uncloseable`](https://github.com/georgeOsdDev/react-draggable-tab/issues/101)
### Ver 0.10.0

  * #99 [Fix this.unbindShortcuts is not a function](https://github.com/georgeOsdDev/react-draggable-tab/issues/99)
  * Fix falling unit tests

### Ver 0.9.0

  This version contains a breaking change. The name of the Tab 'disableClose' property,
  which shadowed a standard property name and resulted in a React warning, has been changed
  to 'unclosable'.

  **TESTS ARE BROKEN**. `react-addons-test-utils` has a hard dependency on React 15. For
  React 16, Facebook has moved the utilities into `react-dom/test-utils` and
  `react-test-renderer/shallow`, and they are quite a bit different.

  * #73 [Invariant Violation: addComponentAsRefTo(...): ...](https://github.com/georgeOsdDev/react-draggable-tab/issues/73)
  may be better. The React version has been updated, but react-draggable-tab is still using string refs, which is deprecated.
  * #90 [React.PropTypes should be replaced by just PropTypes](https://github.com/georgeOsdDev/react-draggable-tab/issues/90)
  * #92 [Update to React v16](https://github.com/georgeOsdDev/react-draggable-tab/issues/92)
  Updated all libraries. Uses React 16.2.0.
  * #93 [Resolve all eslint "airbnb" errors](https://github.com/georgeOsdDev/react-draggable-tab/issues/93)
  (except in tests)

### Ver 0.8.1

  * #80 [Fix tabAddButton position](https://github.com/georgeOsdDev/react-draggable-tab/issues/80)
  Thanks @warent
  * #81 [Added prop to disable the dragging of tabs]()https://github.com/georgeOsdDev/react-draggable-tab/issues/81
  Thanks @erangil2

### Ver 0.8.0

  * #77 [Add shouldTabClose](https://github.com/georgeOsdDev/react-draggable-tab/issues/77)

### Ver 0.7.0

  * #67 [Fix TypeError when using SVGs as title](https://github.com/georgeOsdDev/react-draggable-tab/issues/67)
  Thanks @HaNdTriX
  * #68 [Improve tab rendering perfomance](https://github.com/georgeOsdDev/react-draggable-tab/issues/68)

### Ver 0.6.1

  * #66 [Removes console warning in React15](https://github.com/georgeOsdDev/react-draggable-tab/issues/66)
    Thanks @uriklar

### Ver 0.6.0

  * #63 [React v15 support](https://github.com/georgeOsdDev/react-draggable-tab/issues/63)

### Ver 0.5.1
  * #59 [Allow overriding TabStyles.wrapper using props](https://github.com/georgeOsdDev/react-draggable-tab/issues/59)

### Ver 0.5.0
  * #53 [Context menu on right click](https://github.com/georgeOsdDev/react-draggable-tab/issues/53)
    `onTabDoubleClick`, `onTabMouseEnter` and `onTabMouseEnter` are removed from `Tabs`.
    All `onXXX` handler except `onClick` are now used on `Tab`.
  * Update dependencies libraries version [cf65dbc](https://github.com/georgeOsdDev/react-draggable-tab/commit/cf65dbc8f756561536f53f5e3960bf86afebdc73)

### Ver 0.4.3

  * #48 [When tab title is truncated onhover does not show whole title](https://github.com/georgeOsdDev/react-draggable-tab/issues/48)
  * #50 [Unable to add styles or css classes to the tab content div](https://github.com/georgeOsdDev/react-draggable-tab/issues/50)

### Ver 0.4.2

  * #45 [Unexpected diff between src and lib](https://github.com/georgeOsdDev/react-draggable-tab/issues/45)

### Ver 0.4.1

  * #33 [Add hover effect on mouseOver like chrome](https://github.com/georgeOsdDev/react-draggable-tab/issues/33)
  * #38 [Publish transpiled code](https://github.com/georgeOsdDev/react-draggable-tab/issues/38)
  * #40 [Tab start moving from strange position](https://github.com/georgeOsdDev/react-draggable-tab/issues/33)

### Ver 0.4.0

  This version updated react from ^0.13.3 to 0.14.X, react-draggable from ^0.8.0 to 1.1.X, and also other dependencies.
  Several changes have been made for adopting react v0.14.x.

  * #35 [Update dependencies](https://github.com/georgeOsdDev/react-draggable-tab/issues/35)
  * #32 [Add `keepSelectedTab` option](https://github.com/georgeOsdDev/react-draggable-tab/issues/32)

### Ver 0.3.3

  * #30 [Switch tab position while dragging](https://github.com/georgeOsdDev/react-draggable-tab/issues/30)

### Ver 0.3.2

  * #27 [Support keyboard shortcut](https://github.com/georgeOsdDev/react-draggable-tab/issues/27)

### Ver 0.3.1

  * #26 [Enable to use element for tab title](https://github.com/georgeOsdDev/react-draggable-tab/issues/26)

### Ver 0.3.0

  This release contains breaking change.

  * #20 [Remove 'ed' from event handler name](https://github.com/georgeOsdDev/react-draggable-tab/issues/20) (Breaking change)
  * #21 [Unexpected behavior with NODE_ENV=production](https://github.com/georgeOsdDev/react-draggable-tab/issues/21)

### Ver 0.2.3

  * #16 [Add doubleClick handler on tab title](https://github.com/georgeOsdDev/react-draggable-tab/issues/16)

### Ver 0.2.2

  * #13 [Improve tabBarAfter style](https://github.com/georgeOsdDev/react-draggable-tab/issues/13)

### Ver 0.2.1

  * #5 [Enable to add badge / favicon like chrome](https://github.com/georgeOsdDev/react-draggable-tab/issues/5)
  * #6 [Add style on parent div](https://github.com/georgeOsdDev/react-draggable-tab/issues/6)
  * #8 [Show closed tab when it supplied again with same key](https://github.com/georgeOsdDev/react-draggable-tab/issues/8)
  * #9 [Keep all tab content inside Tabs](https://github.com/georgeOsdDev/react-draggable-tab/issues/9)

### Ver 0.2.0

  * #1 [Improve tab title color](https://github.com/georgeOsdDev/react-draggable-tab/issues/1)
  * #2 [onTabSelected, onTabClosed, onTabPositionChanged should be called in setState callback](https://github.com/georgeOsdDev/react-draggable-tab/issues/2)
  * #3 [Enable to set style and class on each Tab](https://github.com/georgeOsdDev/react-draggable-tab/issues/3)

### Ver 0.1.0 Initial release
