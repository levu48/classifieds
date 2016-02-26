const {List, ListItem, SelectField, MenuItem} = MUI;
   
Directory = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {    
        let obj = _.findWhere(AppObj.communities, {name: this.state.location});
        let box = getBoundingBox([obj.location.coordinates[1], obj.location.coordinates[0]], 20);
        BOX = { sw: {lat: box[1], lon: box[0]}, ne: {lat: box[3], lon: box[2]} }; 
            
        handle = Meteor.subscribe('restaurants', BOX);
        
            
        let data = {
            isLoading: !handle.ready(),
            restaurants: Restaurants.find({}, {sort: {name: 1}}).fetch()
        };

        return data;
    },
    
    
    getInitialState() {
        return {
            location: "New York",
            business: "Restaurants"
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

        map.fitBounds([
            [BOX.sw.lat, BOX.sw.lon], 
            [BOX.ne.lat, BOX.ne.lon]
        ]);
                   
        map.on('load', function(e) {
            subscribeWithBounds(e);
        });
        
   
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                detectRetina: true
            }).addTo(map);
        
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
    
    changeLocation(event, index, value) {
        this.setState({
            location: value
        });
        
        let obj = _.findWhere(AppObj.communities, {name: value});  
        let box = getBoundingBox([obj.location.coordinates[1], obj.location.coordinates[0]],10);
        BOX = { sw: {lat: box[1], lon: box[0]}, ne: {lat: box[3], lon: box[2]} }; 
        
        map.fitBounds([
            [BOX.sw.lat, BOX.sw.lon], 
            [BOX.ne.lat, BOX.ne.lon]
        ]);
    },
    
    changeBusiness(event, index, value) {
        this.setState({
            business: value
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
                    <Controller changeBusiness={this.changeBusiness} changeLocation={this.changeLocation} {...this.state} />
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


Controller = React.createClass({
    render() {
        return (<div className="form-group">
                    <div className="row" style={{paddingLeft: "10px", width: "100px"}}>
                        <div className="col-xs-4" style={Utils.styles.styleLeft}>
                            <SelectField value={this.props.location} 
                                    onChange={this.props.changeLocation}
                                    floatingLabelText="Community Location">
                                    {AppObj.communities.map((c) => <MenuItem value={c.name} primaryText={c.name}/>)}
                            </SelectField>
                        </div>
                     </div>
                     <div className="row" style={{paddingLeft: "10px"}}>
                        <div className="col-xs-4" style={Utils.styles.styleLeft}>
                            <SelectField value={this.props.business} 
                                    onChange={this.props.changeBusiness}
                                    floatingLabelText="Type of Business">
                                {AppObj.businesses.map((c) => <MenuItem value={c.name} primaryText={c.name}/>)}
                            </SelectField>
                        </div>
                    </div>
                </div>)
    }
});

