const {List, ListItem, LeftNav, Divider, SelectableContainerEnhance} = MUI;

AppLeftNav = React.createClass({
    getInitialState() {
        return {
            open: false
        }
    },
    
    toggle() {
        this.refs.leftNav.toggle();
    },
    
    render() {
        const listItems = AppObj.categories.map((cat) => {
            if (cat.categories && cat.categories.length > 0) {
                return (
                        <ListItem
                            key={cat._id}
                            primaryText=<Tran>{cat.name}</Tran>
                            value={cat.link}
                            primaryTogglesNestedList={true}

                            nestedItems = { cat.categories ? 
                                cat.categories.map((cat2) => {
                                    return <ListItem 
                                                key={cat2._id}
                                                primaryText=<Tran>{cat2.name}</Tran> 
                                                value={cat2.link} 
                                                onTouchTap={function() { FlowRouter.go('/cat/' + cat2._id);}}
                                                />;
                                }) : [] }
                        />
                    );                
            } else {
                return (
                    <ListItem
                        primaryText=<Tran>{cat.name}</Tran>
                        value={cat.link}
                        onTouchTap={function() { FlowRouter.go('/cat/' + cat._id);}}
                    />
                );                
            }
        });
        
        return (
            <LeftNav 
                    style={{top: "70px" }} 
                    ref="leftNav" 
                    open={this.state.open} 
                    docked={false}
                    onRequestChange={open => this.setState({open})} >
                <List>
                    <ListItem primaryText=<Tran>classifiedAds</Tran> 
                            primaryTogglesNestedList={true}
                            nestedItems={listItems} />
                    <Divider />
                    <ListItem primaryText=<Tran>directory</Tran>
                            value="/directory"
                            onTouchTap={function() { FlowRouter.go('/directory');}} />
                    <Divider />
                </List>
            </LeftNav>
        );
    }
});
