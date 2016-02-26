const {List, ListItem, SelectField, MenuItem} = MUI;

RADIUS = 50;
   
Directory = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {            
        let obj = _.findWhere(AppObj.communities, {name: this.state.location});
        let box = getBoundingBox([obj.location.coordinates[1], obj.location.coordinates[0]], RADIUS);
        BOX = { sw: {lat: box[1], lon: box[0]}, ne: {lat: box[3], lon: box[2]} }; 
            
        //handle = Meteor.subscribe('entries', BOX);
        //this.rebuildMap(this.state.category);
        
        let data = {
            isLoading: (!handle ? true: !handle.ready()),
            //box: BOX,
            //cursor: Entries.find({category: this.state.category}, {sort: {name: 1}}),
            entries: Entries.find({category: this.state.category}, {sort: {name: 1}}).fetch()
        };

        return data;
    },
    
    
    getInitialState() {
        return {
            location: "New York",
            category: "Restaurants"
        }
    },

    getEntries() {
        return Entries.find({category: this.state.category}, {sort: {name: 1}});
    },
    
    setEntries() {
        this.setState({
                entries: Entries.find({category: this.state.category}, {sort: {name: 1}})
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
        
        map.on('moveend', function(e) {
            if (map) {
                let sw = map.getBounds().getSouthWest();
                let ne = map.getBounds().getNorthEast();
                let box = {sw: {lat: sw.lat, lon: sw.lng}, ne: {lat: ne.lat, lon: ne.lng}};
                
                if (handle) handle.stop();
                handle = Meteor.subscribe('entries', box);
                
            } else {
                if (handle) handle.stop();
                handle = Meteor.subscribe('entries', BOX);
            }
        });
        
   
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                detectRetina: true
            }).addTo(map);
        
        /*
        //this.getEntries().observeChanges({
        this.data.cursor.observeChanges({
            added: function(id, entry) {                
                var marker = L.marker([
                    entry.location.coordinates[1],
                    entry.location.coordinates[0]
                ]);
                
                marker.entry = entry;
                marker.entry._id = id;
                
                marker.on('click', function(e) {
                    handleMarkerClick(e);
                });
                marker.addTo(map);
                layers[id] = marker;
                
                console.log("--ADD marker ", marker);
            },
            
            removed: function(id) {
                console.log("--REMOVE layer ", id);
                
                map.removeLayer(layers[id]);
                delete layers[id]; 
            }
        }); 
        */
        
        subscribeWithBounds(null);
        //this.rebuildMap(this.state.category);        
    },

    

    rebuildMap(category) {
        let createMarker = function(entry) {
            let marker = L.marker([
                entry.location.coordinates[1],
                entry.location.coordinates[0]
            ]);
            
            marker.entry = entry;
            marker.on('click', function(e) {
                handleMarkerClick(e);
            });
            return marker;
        }
        
        let deleteLayers = function() {
            if (layers && typeof layers === 'object') {
                Object.keys(layers).forEach(function(l) {map.removeLayer(layers[l]);});
                layers = {};
            }            
        }
        
        deleteLayers();

        let arr = Entries.find({category: category}, {sort: {name: 1}}).fetch();

        arr.forEach(function(entry) {
            let marker = createMarker(entry);
            marker.addTo(map);
            layers[entry._id] = marker;
        });
    },
    
    
    changeLocation(event, index, value) {
        this.setState({
            location: value
        });
        
        let obj = _.findWhere(AppObj.communities, {name: value});  
        let box = getBoundingBox([obj.location.coordinates[1], obj.location.coordinates[0]], RADIUS);
        BOX = { sw: {lat: box[1], lon: box[0]}, ne: {lat: box[3], lon: box[2]} }; 
        
        map.fitBounds([
            [BOX.sw.lat, BOX.sw.lon], 
            [BOX.ne.lat, BOX.ne.lon]
        ]);
        
        subscribeWithBounds(event);
        ///this.rebuildMap(value);
    },
    
    changeCategory(event, index, value) {
        this.setState({
            category: value
        });
        
        subscribeWithBounds(event);
        //this.rebuildMap(value);
    },
    
    componentDidUpdate() {
        this.rebuildMap(this.state.category);
    },
    
     
    render() {
        return (
            <div className="entries" 
                    style={{top: "0px", overflowX: "hidden", overflowY: "hidden", height:"calc(100vh - 72px)"}} >
                <div className="map-wrapper col lg-col-8" 
                        style={{height:"calc(100vh - 72px)"}} >
                    <div ref="map" id="map"></div>
                </div>
                <div className="col lg-col-4"
                        style={{height:"calc(100vh - 72px)"}} >
                    {/*<h1 className="mxn2 mt0 mb0 p2 fixed bg-blue white">Directory</h1>*/}
                    <Controller changeCategory={this.changeCategory} changeLocation={this.changeLocation} {...this.state} />
                    <DirectoryList entries={this.data.entries} />
                </div>
            </div>
        )
    }
});

DirectoryList= React.createClass({
    render() {
        let genEntries = function(entries) {
            return entries.map((entry) => {
                return (
                    <div data-mongodb-id={entry._id} className="entries p2 border-bottom"
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
                        { genEntries(this.props.entries) }
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
                            <SelectField value={this.props.category} 
                                    onChange={this.props.changeCategory}
                                    floatingLabelText="Type of Business">
                                {AppObj.businesses.map((c) => <MenuItem value={c.name} primaryText={c.name}/>)}
                            </SelectField>
                        </div>
                    </div>
                </div>)
    }
});

