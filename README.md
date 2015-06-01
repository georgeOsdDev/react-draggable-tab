# wip


---

# React-draggable-tab

Chrome/Atom like draggable tab react component.


```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs:[
        (<Tab key='tab0' title={'fixedTab'} disableClose={true} >
          <div>
            <h1>This tab cannot close fixed</h1>
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


  handleTabSelect(key, currentTabs) {
    console.log('tabSelected key:', key);
  }

  handleTabClose(key, currentTabs) {
    console.log('tabClosed key:', key);
  }

  handleTabPositionChange(key, currentTabs) {
    console.log('tabPositionChanged key:', key);
  }

  handleTabAddButtonClick(currentTabs) {
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