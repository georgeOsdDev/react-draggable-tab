# wip

Not yet released.


---

# React-draggable-tab [![Build Status](https://travis-ci.org/georgeOsdDev/react-draggable-tab.svg?branch=develop)](https://travis-ci.org/georgeOsdDev/react-draggable-tab)


[![Gyazo](http://i.gyazo.com/1ca47462f2b7a8657dcfea9fa8fc5533.gif)](http://gyazo.com/1ca47462f2b7a8657dcfea9fa8fc5533)


Atom like draggable tab react component.

## Demo

[View Demo](http://georgeosddev.github.io/react-draggable-tab/example/)

## Installation

**Not yet released!!**

```bash
npm install --save react-draggable-tab
```

## API

### `Tab`

`Tab` is just a case class to check props.
`props.children` will rendered into content area.

  * `key`: *unique* key in `TabList`.
    `React.PropTypes.string.isRequired`

  * `title`: string to show in tab.
    `React.PropTypes.string.isRequired`

  * `disableClose`: If `true`, closeButton will not be appeared in tab.
    `React.PropTypes.bool` (Default `false`)

### `Tabs`


## Usage example

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs:[
        (<Tab key='tab0' title={'fixedTab'} disableClose={true} >
          <div>
            <h1>This tab cannot close</h1>
          </div>
        </Tab>),
        (<Tab key='tab1' title={'1stTab'} >
          <div>
            <h1>This is tab1</h1>
          </div>
        </Tab>),
        (<Tab key='tab2' title={'2ndTab Too long Toooooooooooooooooo long'} >
          <div>
            <pre>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            </pre>
          </div>
        </Tab>),
        this._getDynamicTab()
      ],
      textvalue: ''
    };
  }

  // Trick
  // `Tabs` do not care change in content
  // Dynamically changing tab content should be managed at app side.
  _getDynamicTab() {
    return (
    <Tab key='tab3' title={'3rdTab'} >
      <div>
        <h1>TAB3!!! This tab dynamically change</h1>
        <textarea value={this.state ? this.state.textValue: ''} onChange={this._handleTextChange.bind(this)}></textarea>
      </div>
    </Tab>);
  }

  _handleTextChange(e) {
    this.setState({textValue: e.target.value});
  }

  // Update current contents
  _replaceDynamicTab(tabs) {
    return _.map(tabs, (tab) => {
      if(tab.key === 'tab3') {
        return this._getDynamicTab();
      } else {
        return tab;
      }
    });
  }

  handleTabSelect(e, key, currentTabs) {
    console.log('tabSelected key:', key);
    this.setState({selectedTab: key, tabs: this._replaceDynamicTab(currentTabs)});
  }

  handleTabClose(e, key, currentTabs) {
    console.log('tabClosed key:', key);
  }

  handleTabPositionChange(e, key, currentTabs) {
    console.log('tabPositionChanged key:', key);
  }

  handleTabAddButtonClick(e, currentTabs) {
    // key must be unique
    var key = 'newTab_' + Date.now();
    var newTab = (<Tab key={key} title='untitle'>
                    <div>
                      <h1>New Empty Tab</h1>
                    </div>
                  </Tab>);
    var newTabs = currentTabs.concat([newTab]);

    this.setState({
      tabs: this._replaceDynamicTab(newTabs),
      selectedTab: key
    });
  }

  render() {
    return (
      <Tabs
        tabClassNames={tabClassNames}
        tabStyles={tabStyles}
        selectedTab={this.state.selectedTab ? this.state.selectedTab : "tab2"}
        onTabSelected={this.handleTabSelect.bind(this)}
        onTabClosed={this.handleTabClose.bind(this)}
        onTabAddButtonClicked={this.handleTabAddButtonClick.bind(this)}
        onTabPositionChanged={this.handleTabPositionChange.bind(this)}
        tabs={this.state.tabs}>
      </Tabs>
    )
  }
};


React.render(<App/>, document.getElementById('tabs'));
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

## Known Issue

* Dynamic tab content.

`Tabs` do not care any change in `Tab` content.
`tabs` needs update by your application side.
See `3rdTab` in example.


* `flex` style should be define in CSS for safari.
See https://github.com/facebook/react/issues/2020

In application, class `rdTabBar` or your custom class of `TabBar` needs `display: -webkit-flex` in CSS like below.
```css
.myTabBar {
  display: -webkit-flex;
}

