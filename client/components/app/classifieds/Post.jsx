Post = React.createClass({
    
    componentDidMount() {
        if (this.props.post.lat && this.props.post.lng) {
            //Tracker.autorun(function() {
                /*
                let map2 = GoogleMaps.create({
                    name: 'map',
                    element: document.getElementById('map2'),
                    options: {
                        center: new google.maps.LatLng(this.props.post.lat, this.props.post.lng),
                        zoom: 10
                    }
                });
                */
                
                let map = new google.maps.Map(document.getElementById('map2'), {
                        center: new google.maps.LatLng(this.props.post.lat, this.props.post.lng),
                        zoom: 12
                    });
                
                
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(this.props.post.lat, this.props.post.lng),
                    map: map
                });
                
            //}.bind(this));
        }
    },
    
    
    render() {
        const styleLeft = { textAlign: "left" };
        const styleRight = { textAlign: "right" };
        
        const displayMap = function(post) {
            if (post && post.lat && post.lng) {
                return (
                    <div className="row">
                        <label className="col-md-2 control-label" style={styleRight}>Map</label>
                        <div className="col-md-9">
                            <div id="map2" className="mapCanvas" style={{width: "700px", height: "300px"}}></div>
                        </div>
                    </div>
                );
                
            } else {
                return <div></div>
            }
        }
     
        return (
            <div className="container">
            
                <ol className="breadcrumb">
                    <li><a href="/">Home</a></li>
                    <li><a href={"/cat/" + this.props.post.category}>{this.props.post.category}</a></li>
                    <li className="active">{this.props.post.title}</li>
                </ol>

                <div className="row">
                    <div className="col-md-7">
                        <img style={{display:"inline-block"}} src={this.props.post.image ? this.props.post.image : "/resources/blue-camera-icon.png"} 
                                id="pic2" className="img-responsive" alt="image" />
                    </div>  
                    
                    <div className="col-md-5">    
                        <div className="row">
                            <label className="col-md-3 control-label" style={styleRight}>Category</label>
                            <div className="col-md-9" style={styleLeft}>
                                {this.props.post.category}
                            </div>
                        </div>    
                        
                        <div className="row">
                            <label className="col-md-3 control-label" style={styleRight}>Price</label>
                            <div className="col-md-9" style={styleLeft}>
                                {this.props.post.price}
                            </div>
                        </div>      

                        <div className="row">
                            <label className="col-md-3 control-label" style={styleRight}>Contact</label>
                            <div className="col-md-9" style={styleLeft}>
                                {this.props.post.contact}
                            </div>
                        </div>  
                        
                        <div className="row">
                            <label className="col-md-3 control-label" style={styleRight}>Phone</label>
                            <div className="col-md-9" style={styleLeft}>
                                {this.props.post.phone}
                            </div>
                        </div> 
                        
                        <div className="row">
                            <label className="col-md-3 control-label" style={styleRight}>Email</label>
                            <div className="col-md-9" style={styleLeft}>
                                {this.props.post.email}
                            </div>
                        </div> 

                        <div className="row">
                            <label className="col-md-3 control-label" style={styleRight}>Address</label>
                            <div className="col-md-9" style={styleLeft}>
                                {this.props.post.address}
                            </div>
                        </div> 
                        
                        <div className="row">
                            <label className="col-md-3 control-label" style={styleRight}>City</label>
                            <div className="col-md-9" style={styleLeft}>
                                {this.props.post.city}
                            </div>
                        </div> 
                        
                        <div className="row">
                            <label className="col-md-3 control-label" style={styleRight}>State</label>
                            <div className="col-md-9" style={styleLeft}>
                                {this.props.post.state}
                            </div>
                        </div> 
                        
                        <div className="row">
                            <label className="col-md-3 control-label" style={styleRight}>Country</label>
                            <div className="col-md-9" style={styleLeft}>
                                {this.props.post.country}
                            </div>
                        </div>                  
                                            
                    </div>                 
                </div>      
                
                <br/><br/>
                <div className="row">
                    <label className="col-md-2 control-label" style={styleRight}>Title</label>
                    <div className="col-md-9" style={styleLeft}>
                        <span style={{ fontSize: "18px", fontWeight: "bold"}}>{this.props.post.title}</span>
                    </div>
                </div>  
                     
                          
                <div className="row">
                    <label className="col-md-2 control-label" style={styleRight}>Description</label>
                    <div className="col-md-9" style={styleLeft}>
                        <span style={{ fontSize: "14px"}}>{this.props.post.description}</span>
                    </div>
                </div>  

                <br/><br/>
                <div className="form-group">
                    {displayMap(this.props.post)}
                </div>

            </div>            
        );
    } 
});