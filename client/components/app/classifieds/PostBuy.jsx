var {Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody } = MUI;
const {SvgIcons} = MUI.Libs;

PostBuy = React.createClass({
    mixins: [ReactMeteorData],
    
    getMeteorData() {
        let handle = Meteor.subscribe('providers');
        return {
            providers: Providers.find({
                    distribution: this.state.location,
                    language: this.state.language
                }).fetch()
        }
    },
    
    getInitialState() {
        return {
            location: 'Orange County',
            language: 'vi'
        }
    },
    
    changeLocation(event, index, value) {
        this.setState({location: value});
    },
    
    changeLanguage(event, index, value) {
        this.setState({language: value});
    },
        
    render() {
        const styleLeft = { textAlign: "left" };
        const styleRight = { textAlign: "right", verticalAlign: "bottom" };
        
        
        let header = (<div className="form-group">
                        <div className="row">
                            <div className="col-xs-3" style={styleLeft}>
                                <MUI.SelectField value={this.state.location} 
                                        onChange={this.changeLocation}
                                        floatingLabelText="Location">
                                    <MUI.MenuItem value="Orange County" primaryText="Orange County"/>
                                    <MUI.MenuItem value="Los Angeles" primaryText="Los Angeles"/>
                                    <MUI.MenuItem value="Pomona" primaryText="Pomona"/>
                                    <MUI.MenuItem value="San Diego" primaryText="San Diego"/>
                                    <MUI.MenuItem value="San Jose" primaryText="San Jose"/>
                                    <MUI.MenuItem value="San Francisco" primaryText="San Francisco"/>
                                    <MUI.MenuItem value="Houston" primaryText="Houston"/>
                                    <MUI.MenuItem value="Dallas" primaryText="Dallas"/>
                                </MUI.SelectField>
                            </div>
                            <div className="col-xs-1"></div>
                            <div className="col-xs-3" style={styleLeft}>
                                <MUI.SelectField value={this.state.language} 
                                        onChange={this.changeLanguage}
                                        floatingLabelText="Language">
                                    <MUI.MenuItem value="en" primaryText="English"/>
                                    <MUI.MenuItem value="vi" primaryText="Vietnamese"/>
                                    <MUI.MenuItem value="es" primaryText="Spanish"/>
                                    <MUI.MenuItem value="ko" primaryText="Korean"/>
                                </MUI.SelectField>
                            </div>
                            <div className="col-xs-1"></div>
                            <div className="col-xs-4" style={Utils.styles.styleRight}>
                                <PostCard post={this.props.post} />
                            </div>
                        </div>
                    </div>);
                    
        
        const createProvider = function (p) {
               return (
                <TableRow>
                    <TableRowColumn style={{verticalAlign: "middle"}}>{p.name}</TableRowColumn>
                    <TableRowColumn style={{verticalAlign: "middle"}}>{p.location}</TableRowColumn>
                    <TableRowColumn style={{verticalAlign: "middle"}}>{p.distribution.join(', ')}</TableRowColumn>
                    <TableRowColumn style={{verticalAlign: "middle"}}>{p.price}</TableRowColumn>
                    <TableRowColumn style={{verticalAlign: "middle", textAlign: "right"}}><SvgIcons.ActionAddShoppingCart /></TableRowColumn>
                </TableRow>
            )
        }
        
        
        const createProvidersTable = function(providers) {
            return (
                <Table fixedHeader={true}>
                    <TableHeader >
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Location</TableHeaderColumn>
                            <TableHeaderColumn>Distribution</TableHeaderColumn>
                            <TableHeaderColumn>Price</TableHeaderColumn>
                            <TableHeaderColumn style={Utils.styles.styleRight}>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>        
                    <TableBody stripedRows={true}>
                        {providers.map((p)  => createProvider(p))}
                    </TableBody>
                </Table>
            )             
        }
            
        
        return (
            <div className="container">
                <h1>Post Buy</h1>
                <form>
                    {header}
                    {createProvidersTable(this.data.providers)}
                    
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-9 col-xs-offset-3" style={styleLeft}>
                                <MUI.RaisedButton label="Submit" primary={true} />
                            </div>
                        </div>
                    </div>
               
                </form>
            </div>
        );
    }
});


Provider = React.createClass({
    render() {
        const provider = this.props.provider;
        return (
                <TableRow>
                    <TableRowColumn>{provider.name}</TableRowColumn>
                    <TableRowColumn>{provider.location}</TableRowColumn>
                    <TableRowColumn>{provider.distribution.join(', ')}</TableRowColumn>
                    <TableRowColumn>{provider.price}</TableRowColumn>
                    <TableRowColumn style={Utils.styles.styleRight}><SvgIcons.ActionAddShoppingCart /></TableRowColumn>
                </TableRow>
            )
    }
});

ProvidersTable = React.createClass({
    render() {    
        let arr = (function() {
                return this.props.providers.map((p)  => <Provider provider={p} />);
            }.bind(this)());
        
        return (
            <Table fixedHeader={true}>
                <TableHeader >
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Location</TableHeaderColumn>
                        <TableHeaderColumn>Distribution</TableHeaderColumn>
                        <TableHeaderColumn>Price</TableHeaderColumn>
                        <TableHeaderColumn style={Utils.styles.styleRight}>Actions</TableHeaderColumn>
                    </TableRow>
                </TableHeader>        
                <TableBody stripedRows={true}>
                    {arr}
                </TableBody>
            </Table>
        )         
    }
});