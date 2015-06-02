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
        (<Tab key='tab3' title={'3rdTab'} >
          <div>
            <h1>TAB3!!!</h1>
          </div>
        </Tab>)
      ]
    };
  }


  handleTabSelect(e, key, currentTabs) {
    console.log('tabSelected key:', key);
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
      tabs: newTabs,
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

