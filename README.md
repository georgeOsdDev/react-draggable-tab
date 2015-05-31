# wip


---

# React-draggable-tab

Chrome/Atom like draggable tab react component.


```javascript
  getContentByTitle(title) {
    switch (title) {
      case "tabA":
        return (<div>tabA</div>);
      case "tabA":
        return (<div>tabB</div>);
      case "tabC":
        return (<div>tabC</div>);
    }
  }

  onTabSelected(title){
    this.state.content = getContentByTitle(title);
  }

  render(){
    let tabs = ["tabA", "tabB", "tabC"];
    let content = this.state.content || getContentByTitle(tabs[0]);
    return(
      <div>
        <Tabs style={style}, tabs={tabs} onTabSelected={onTabSelected} onTabClosed={onTabClosed} onTabAddButtonClicked={} defaultTitle={"untitle"} />
        <div>
          {content}
        </div>
      </div>
    );
  }
```