const {List, ListItem, SelectedField, MenuItem} = MUI;
   
Directory = React.createClass({
    mixins: [ReactMeteorData],

   
    getMeteorData() {
        handle = Meteor.subscribe('restaurants', [
                [BOX.sw.lat, BOX.sw.lon], 
                [BOX.ne.lat, BOX.ne.lon]
            ]);
            
        let data = {
            isLoading: !handle.ready(),
            restaurants: Restaurants.find({}, {sort: {name: 1}}).fetch()
        };

        return data;
    },
    
    
    getInitialState() {
        return {
            restaurants: (handle && handle.ready() 
                ? Restaurants.find({}, {sort: {name: 1}})
                : [])
        }
    },

    getRestaurants() {
        return Restaurants.find({}, {sort: {name: 1}});
    },
    
    setRestaurants() {
        this.setState({
            restaurants: Restaurants.find({}, {sort: {name: 1}})
            });
    },
    
    componentDidMount() {
        map = L.map('map');
        
        map.on('load', function(e) {
            subscribeWithBounds(e);
        });
        
        map.fitBounds([
            [BOX.sw.lat, BOX.sw.lon], 
            [BOX.ne.lat, BOX.ne.lon]
        ]);
                
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                detectRetina: true
            }).addTo(map);
            
            
        console.log("componentDidMount, this.data = ", this.data);
        
        this.getRestaurants().observeChanges({
            added: function(id, restaurant) {                
                var marker = L.marker([
                    restaurant.location.coordinates[1],
                    restaurant.location.coordinates[0],
                ]);
                
                marker.restaurant = restaurant;
                marker.restaurant._id = id;
                
                marker.on('click', function(e) {
                    handleMarkerClick(e);
                });
                marker.addTo(map);
                layers[id] = marker;
            },
            
            removed: function(id) {
                map.removeLayer(layers[id]);
                delete layers[id];
            }
        });

    },

    
    componentDidMount2() {        
        if (handle) handle.stop();
        handle = Meteor.subscribe('restaurants', getMapBounds(map));
        
        map = L.map('map');

        map.on('load', function(e) {
            subscribeWithBounds(e);
            this.setRestaurants();
            console.log('map.on load, handle: ', handle);
        }.bind(this));
           
                   
        map.fitBounds([
            [this.BOX.sw.lat, this.BOX.sw.lon], 
            [this.BOX.ne.lat, this.BOX.ne.lon]
        ]);
           
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                detectRetina: true
            }).addTo(map);
                
        map.on('moveend', function(e) {
            subscribeWithBounds(e);
            this.setRestaurants();
            console.log('map.on moveend, handle: ', handle);
        }.bind(this));  
        
        
       this.getRestaurants().observeChanges({
        //this.state.restaurants.observeChanges({
            added: function(id, restaurant) {                
                var marker = L.marker([
                    restaurant.location.coordinates[1],
                    restaurant.location.coordinates[0],
                ]);
                
                marker.restaurant = restaurant;
                marker.restaurant._id = id;
                
                marker.on('click', function(e) {
                    handleMarkerClick(e);
                });
                marker.addTo(map);
                layers[id] = marker;
            },
            
            removed: function(id) {
                map.removeLayer(layers[id]);
                delete layers[id];
            }
        });
    },
    
     
    render() {
        return (
            <div className="restaurants" 
                    style={{top: "0px", overflowX: "hidden", overflowY: "hidden", height:"calc(100vh - 72px)"}} >
                <div className="map-wrapper col lg-col-8" 
                        style={{height:"calc(100vh - 72px)"}} >
                    <div ref="map" id="map"></div>
                </div>
                <div className="col lg-col-4"
                        style={{height:"calc(100vh - 72px)"}} >
                    {/*<h1 className="mxn2 mt0 mb0 p2 fixed bg-blue white">Directory</h1>*/}
                    <Controller />
                    <DirectoryList entries={this.data.restaurants} />
                </div>
            </div>
        )
    }
});

DirectoryList= React.createClass({
    render() {
        let genRest = function(entries) {
            return entries.map((entry) => {
                return (
                    <div data-mongodb-id={entry._id} className="restaurant p2 border-bottom"
                            style={{paddingLeft: "20px"}} >
                        { entry.name }
                    </div>
                )
            });
        }
        
        return (
                <div className="listing"
                        style={{textAlign: "left", 
                                top: "0px",
                                overflowY: "scroll", 
                                overflowX: "hidden",
                                paddingLeft: "1px",
                                width: "100%", 
                                height: "calc(100vh - 240px)"}} >
                        { genRest(this.props.entries) }
                </div>
        )
    }
});


DirectoryList2 = React.createClass({
    getInitialState() {
        return {
            selectedIndex: 1
        }
    },
    
    handleUpdateSelectedIndex(e, index) {
        console.log("handleUpdateSelectedIndex, index = ", index);
        this.setState({
            selectedIndex: index
        });
    },
    
    handleSelectItem(e) {
        console.log("handleSelectItem ", e, e.target, this.refs);
    },
    
    render() {
        let generateEntries2 = function(entries) {
            if (entries) {
                return entries.map((entry) => {
                        return (<div data-mongodb-id={entry._id} id={entry._id} 
                                        className="restaurant p2 border-bottom" 
                                        style={Utils.styles.styleLeft}>
                                   <ListItem  key={entry._id} primaryText={entry.name} />
                            </div>)
                    });
                }
        }
        
        let generateEntries = function(entries) {
            let count = 1;
            if (entries) {
                return entries.map((entry) => {
                        return <ListItem  key={entry._id} 
                                ref={entry._id}
                                id={entry._id}
                                value={count++}
                                style={Utils.styles.styleLeft}
                                onTouchTap={this.handleSelectItem}
                                primaryText={entry.name} />
                    });
                }
        }
        
        
        return <div ref="list"
                        className="listing"
                        style={{overflowY: "scroll", height: "calc(100vh - 72px)"}}
                        >
                    <List valueLink={{
                            value: this.state.selectedIndex,
                            requestChange: this.handleUpdateSelectedIndex }}>
                        {generateEntries.call(this, this.props.entries)}
                    </List>
               </div>
    }
});

Controller = React.createClass({
    render() {
        return (<div className="form-group">
                    <div className="row" style={{paddingLeft: "10px", width: "100px"}}>
                        <div className="col-xs-4" style={Utils.styles.styleLeft}>
                            <MUI.SelectField value={'Orange County'} 
                                    floatingLabelText="Communities">
                                    {AppObj.communities.map((c) => <MenuItem value={c.name} primaryText={c.name}/>)}
                            </MUI.SelectField>
                        </div>
                     </div>
                     <div className="row" style={{paddingLeft: "10px"}}>
                        <div className="col-xs-4" style={Utils.styles.styleLeft}>
                            <MUI.SelectField value={"en"} 
                                    floatingLabelText="Type of Business">
                                <MUI.MenuItem value="en" primaryText="Restaurants"/>
                                <MUI.MenuItem value="vi" primaryText="Legals"/>
                                <MUI.MenuItem value="es" primaryText="Medical offices"/>
                                <MUI.MenuItem value="ko" primaryText="Dental offices"/>
                            </MUI.SelectField>
                        </div>
                    </div>
                </div>)
    }
});

