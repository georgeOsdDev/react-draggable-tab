# React-draggable-tab [![Build Status](https://travis-ci.org/georgeOsdDev/react-draggable-tab.svg?branch=develop)](https://travis-ci.org/georgeOsdDev/react-draggable-tab) [![npm version](https://badge.fury.io/js/react-draggable-tab.svg)](http://badge.fury.io/js/react-draggable-tab)


[![Gyazo](http://i.gyazo.com/42d408d288292f62fbb8d650897acbc4.gif)](http://gyazo.com/42d408d288292f62fbb8d650897acbc4)

Atom like draggable tab react component.

## Demo

[View Demo](http://georgeosddev.github.io/react-draggable-tab/example/)

## Installation

```bash
npm install --save react-draggable-tab
```
React v0.14 is supported from react-draggable-tab v0.4.0.
For React v0.13.x, please use react-draggable-tab v0.3.3.

## API

### `Tab`

`Tab` is just a case class to check props.
`props.children` will rendered into content area.

#### Props

  * `key`: *unique* key in `TabList`.
    `PropTypes.string.isRequired`

  * `beforeTitle`: element to show in tab. eg icon.
    `PropTypes.element`

  * `title`: string or element to show in tab.
    `PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired`

  * `afterTitle`: element to show in tab. eg: notification badge
    `PropTypes.element`

  * `uncloseable`: If `true`, closeButton will not be appeared in tab.
    `PropTypes.bool` (Default `false`)

###### Style (for each tab)

  * `tabClassNames`: classNames which will be **added** to rendered elements.
   * `tab`: base `li` element of tab (defult: `rdTab`)
   * `tabBefore`: before element of `li` which emulate `:Before` selector (defult: `rdTabBefore`)
   * `tabAfter`: after element of `li` which emulate `:After` selector (defult: `rdTabAfter`)
   * `tabTitle`: `span` element of tab title (defult: `rdTabTitle`)
   * `tabBeforeTitle`: `span` element of tab before title (defult: `tabBeforeTitle`)
   * `tabAfterTitle`: `span` element of tab after title (defult: `tabAfterTitle`)
   * `tabCloseIcon`: base `span` element of close icon (defult: `rdCloseIcon`)
   * `tabActive`: selected tab's `li`, before, after (defult: `rdTabActive`)
   * `tabHover`: selected tab's `li`, before, after (defult: `rdTabHover`)

  * `tabStyles`: Inline styles which will be **overwritten** default and common-tabs inline styles.
   * `tab`: base `li` element of tab
   * `tabBefore`: before element of `li` which emulate `:Before` selector.
   * `tabAfter`: after element of `li` which emulate `:After` selector.
   * `tabTitle`: `span` element of tab title
   * `tabActive`: selected tab's `li`
   * `tabBeforeActive`: selected tab's `li` before
   * `tabAfterActive`: selected tab's `li` after
   * `tabTitleActive`: selected tab's title
   * `tabOnHover`: hovered tab's `li`
   * `tabBeforeOnHover`: hovered tab's `li` before
   * `tabAfterOnHover`: hovered tab's `li` after
   * `tabTitleOnHover`: hovered tab's title
   * `tabCloseIcon`: base `span` element of close icon
   * `tabCloseIconOnHover`: base `span` element of close icon when hover

  * `containerStyle`: style object which will be apply to container of rendered tab.

  * `hiddenContainerStyle`: style object which will be apply to container of hidden tab.


##### Events

  All other props like `onXX` handler set to `Tab` will be passed to rendered element except `onClick`
  You can use any `onXX` for [Supported events](https://facebook.github.io/react/docs/events.html#supported-events) for tab element.

### `Tabs`

`Tabs` is container for tab. it will render tabBar and content of selected element.

#### Props

  * `tabs`: Array of `Tab` elements.
    `PropTypes.arrayOf(PropTypes.element)`

  * `selectedTab`: key for selectedTab.
    `PropTypes.string` default to first tab.

  * `disableDrag`: disables the ability to drag the tabs.
    `React.PropTypes.bool` default is false.

  * `tabAddButton`: element for add button.
    `PropTypes.element`

  * `keepSelectedTab`: Prevent tab select on drag/move behind tab.
    `PropTypes.bool` default `false`.

  * `unclosable`: Disable tab to close.
    `PropTypes.bool` default `false`.

  * `shouldTabClose(e, key)`: will be called before tab close event, return false if you want to stop tab close process, default `true`;

###### Shortcut key binding
  * `shortCutKeys`: Short cut key bindings as [Mousetrap](https://craig.is/killing/mice) style.
   * `close`: key binding to close current tab (`onTabClose` will be called)
   * `create`: key binding to create tab (`onTabAddButtonClick` will be called)
   * `moveRight`: key binding to move right (`onTabSelect` will be called)
   * `moveLeft`: key binding to move left (`onTabSelect` will be called)

###### Style (All tabs will be apply these styles)

  * `tabsClassNames`: classNames which will be **added** to rendered elements.
   * `tabWrapper`: root wrapper `div` element (defult: `rdTabWrapper`)
   * `tabBar`: base `ul` element of tab bar (defult: `rdTabBar`)
   * `tabBarAfter`: after `span` element of tab bar which emulate `:After` selector (defult: `rdTabBarAfter`)
   * `tab`: base `li` element of tab (defult: `rdTab`)
   * `tabBefore`: before element of `li` which emulate `:Before` selector (defult: `rdTabBefore`)
   * `tabAfter`: after element of `li` which emulate `:After` selector (defult: `rdTabAfter`)
   * `tabTitle`: `span` element of tab title (defult: `rdTabTitle`)
   * `tabBeforeTitle`: `span` element of tab before title (defult: `rdTabBeforeTitle`)
   * `tabBeforeTitle`: `span` element of tab after title (defult: `rdTabAfterTitle`)
   * `tabCloseIcon`: base `span` element of close icon (defult: `rdCloseIcon`)
   * `tabActive`: selected tab's `li`, before, after (defult: `rdTabActive`)

  * `tabsStyles`: Inline styles which will be **overwritten** default inline styles.
   * `tabWrapper`: root wrapper `div` element
   * `tabBar`: base `ul` element of tab bar
   * `tabBarAfter`: after `span` element of tab bar which emulate `:After` selector
   * `tab`: base `li` element of tab
   * `tabBefore`: before element of `li` which emulate `:Before` selector.
   * `tabAfter`: after element of `li` which emulate `:After` selector.
   * `tabTitle`: `span` element of tab title
   * `tabActive`: selected tab's `li`
   * `tabBeforeActive`: selected tab's `li` before
   * `tabAfterActive`: selected tab's `li` after
   * `tabTitleActive`: selected tab's title
   * `tabCloseIcon`: base `span` element of close icon
   * `tabCloseIconOnHover`: base `span` element of close icon when hover

##### Events

  * `onTabSelect(e, key, currentTabs)`: Called when tab of key was selected.
    `currentTabs` is array of tabs elements sorted with current order.

  * `onTabClose(e, key, currentTabs)`: Called when tab of key was closed.
    `currentTabs` is array of tabs elements sorted with current order.

  * `onTabPositionChange(e, key, currentTabs)`: Called when tab of key was moved.
    `currentTabs` is array of tabs elements sorted with current order.

  * `onTabAddButtonClick(e, currentTabs)`: Called when `tab add button` was clicked.
    `currentTabs` is array of tabs elements sorted with current order.
    Basically you will concat `currentTabs` with new empty tab.

    ```javascript
    let newTabs = currentTabs.concat([newTab]);
    ```

  ~~* `onTabDoubleClick(e, key)`: Called when `title` was double clicked.~~ Removed from v0.5.0

  ~~* `onTabMouseEnter(e, key)`: Called when mouse enter to `tab`.~~ Removed from v0.5.0

  ~~* `onTabMouseLeave(e, key)`: Called when mouse leave from `tab`.~~ Removed from v0.5.0

## Usage example

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    let icon = (<image src='icon.png' style={{height:'13px'}}/>);
    let fonticon = (<icon className='icon-html5'/>);
    let badge = (<DynamicTabBadge />);

    this.state = {
      tabs:[
        (<Tab key={'tab0'} title={'unclosable tab'} unclosable={true} >
          <div>
            <h1>This tab cannot close</h1>
          </div>
        </Tab>),
        (<Tab key={'tab1'} title={'1stTab'} beforeTitle={icon} >
          <div>
            <h1>This is tab1</h1>
          </div>
        </Tab>),
        (<Tab key={'tab2'} title={'2ndTab Too long Toooooooooooooooooo long'} beforeTitle={fonticon} >
          <div>
            <pre>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            </pre>
          </div>
        </Tab>),
        (<Tab key={'tab3'} title={'Dynamic tab'} afterTitle={badge}>
          <DynamicTabContent/>
        </Tab>)
      ],
      badgeCount: 0
    };
  }

  handleTabSelect(e, key, currentTabs) {
    console.log('handleTabSelect key:', key);
    this.setState({selectedTab: key, tabs: currentTabs});
  }

  handleTabClose(e, key, currentTabs) {
    console.log('tabClosed key:', key);
    this.setState({tabs: currentTabs});
  }

  handleTabPositionChange(e, key, currentTabs) {
    console.log('tabPositionChanged key:', key);
    this.setState({tabs: currentTabs});
  }

  handleTabAddButtonClick(e, currentTabs) {
    // key must be unique
    const key = 'newTab_' + Date.now();
    let newTab = (<Tab key={key} title='untitled'>
                    <div>
                      <h1>New Empty Tab</h1>
                    </div>
                  </Tab>);
    let newTabs = currentTabs.concat([newTab]);

    this.setState({
      tabs: newTabs,
      selectedTab: key
    });
  }

  render() {

    return (
      <Tabs
        tabsClassNames={tabsClassNames}
        tabsStyles={tabsStyles}
        selectedTab={this.state.selectedTab ? this.state.selectedTab : "tab2"}
        onTabSelect={this.handleTabSelect.bind(this)}
        onTabClose={this.handleTabClose.bind(this)}
        onTabAddButtonClick={this.handleTabAddButtonClick.bind(this)}
        onTabPositionChange={this.handleTabPositionChange.bind(this)}
        tabs={this.state.tabs}
        shortCutKeys={
          {
            'close': ['alt+command+w', 'alt+ctrl+w'],
            'create': ['alt+command+t', 'alt+ctrl+t'],
            'moveRight': ['alt+command+tab', 'alt+ctrl+tab'],
            'moveLeft': ['shift+alt+command+tab', 'shift+alt+ctrl+tab']
          }
        }
      />
    )
  }
};
```

See also [example](https://github.com/georgeOsdDev/react-draggable-tab/tree/develop/example)


```bash
npm install
npm run start:example
```

## Tests

```bash
npm test
```

## Contributors

 See [list](https://github.com/georgeOsdDev/react-draggable-tab/graphs/contributors)

## Known Issue

* Dynamic tab content.

`Tabs` do not care any change in `Tab` content.
content needs update by your application side.
See `3rdTab` in example.


* `flex` style should be define in CSS for safari.
See https://github.com/facebook/react/issues/2020

In application, class `rdTabBar` or your custom class of `TabBar` needs `display: -webkit-flex` in CSS like below.
```css
.myTabBar {
  display: -webkit-flex;
}

