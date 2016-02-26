PostEdit = React.createClass({
    componentDidMount() {
        if (this.props.post.lat && this.props.post.lng) {                
                let map = new google.maps.Map(document.getElementById('map3'), {
                        center: new google.maps.LatLng(this.props.post.lat, this.props.post.lng),
                        zoom: 10
                    });
                
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(this.props.post.lat, this.props.post.lng),
                    map: map
                });
                
                /*
                google.maps.event.addListener(map, 'click', function(event, marker) {
                        //var markers = $('#map3').gmap('get','markers');
                        //markers.forEach((marker) => marker.setMap(null));
                        
                        placeMarker(event.latLng, marker);
                    });
                
                function placeMarker(location, oldMarker) {
                    let newMarker = new google.maps.Marker({
                            position: location,
                            map: map,
                            animation: google.maps.Animation.DROP
                        });

                    if (oldMarker != undefined){
                        oldMarker.setMap(null);
                    }
                    
                    oldMarker = newMarker;                  
                    map.setCenter(location);
                }
                */
        }
    },
    
    handleChangeAddress() {
        Tracker.autorun(function() {
            $('#address').geocomplete({ map: '#map3', details: '#addressDetails'});
        });
    },
    
        
    handleUpdate(e) {
		e.preventDefault();

		var thisPostId = this.props.post._id;


		// var imageData = function () {
		// 	if (Session.get('imageData')) {
		// 		var path = Session.get('imageData');
		// 		return '/upload/' + path;
		// 	} else return '/file_icon.png';
		// 	};

		var postUpdate = {
			// image: imageData(),
			category: $(e.target).find('[name=category]').val(),
			price: $(e.target).find('[name=price]').val(),
			title: $(e.target).find('[name=title]').val(),
            contact: $(e.target).find('[name=contact]').val(),
			phone: $(e.target).find('[name=phone]').val(),
            email: $(e.target).find('[name=email]').val(),
			description: $(e.target).find('[name=description]').val(),
            address: $(e.target).find('[name=address]').val(),
            city: $(e.target).find('[name=locality]').val(),
			state: $(e.target).find('[name=administrative_area_level_1]').val(),
			country: $(e.target).find('[name=country]').val(),
            lat: $(e.target).find('[name=lat]').val(),
            lng: $(e.target).find('[name=lng]').val(),
			//name: function () { return Meteor.user().username; },
			// anonymous: $(e.target).find('[name=anon]').val()
			//flags: 0
		};


		// var errors = validatePost(post);
		// if (errors.title || errors.category || errors.price || errors.number || errors.description || errors.location) {
		// 	return alert(errors[0]);
		// };

		Posts.update(thisPostId, {$set: postUpdate}, function(error) {
			if (error) {
				//display the error to the user
				alert('error');
                console.log(error);
                
			} else {
				FlowRouter.go('post', {_id: thisPostId});
			}
		});        
    },
    
    
    render() {
        const styleLeft = { textAlign: "left" };
        const styleRight = { textAlign: "right" };
        
        let cats = Utils.flattenCategories(AppObj.categories.slice(0));
        let catMenu = cats.map((cat) => {
            console.log(this.props.post.category, cat._id);
            if (this.props.post.category === cat._id) {
                return <option value={cat._id} selected >{cat.name}</option>;
            } else {
                return <option value={cat._id} >{cat.name}</option>;
            }
        });
        
        
        return (
            
            <div className="container">
            
                 <form id="post-form" clasNames="form-horizontal" onSubmit={this.handleUpdate}>
                    
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-2">
                                <img src={this.props.post.image ? this.props.post.image : "/resources/blue-camera-icon.png"} 
                                        id="preview" className="img-rounded holder" alt="" />
                                <p>Image can not be updated.</p>
                            </div>      
                        </div>
                    </div>    
                    
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={styleRight}>Category</label>
                            <div className="col-md-4">
                                <select type="text" id="category" name="category" className="form-control" >
                                    {catMenu}
                                </select>
                            </div>
                        </div>
                    </div>                      

                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-9 col-md-offset-2" style={styleLeft} >
                                <input type="checkbox" value="true" name="accept" checked />
                                Accept the terms and conditions
                            </label>
                        </div>
                    </div>  

                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={styleRight}>Contact person</label>
                            <div className="col-md-4">
                                <input type="text" id="contact" defaultValue={this.props.post.contact} className="form-control pull-left" name="contact" style={styleLeft}/>
                            </div>
                         </div>
                    </div> 
                    
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={styleRight}>Phone</label>
                            <div className="col-md-4">
                                <input type="text" id="phone"  defaultValue={this.props.post.phone} className="form-control pull-left" name="phone" style={styleLeft}/>
                            </div>
                         </div>
                    </div> 

                    <div className="form-group">
                         <div className="row">
                            <label className="col-md-2 control-label" style={styleRight} >Email</label>
                            <div className="col-md-9">
                                <input type="text" id="email"  defaultValue={this.props.post.email} className="form-control pull-left" name="email" style={styleLeft} />
                            </div>
                         </div>
                    </div>
                    
                    <div className="form-group">
                         <div className="row">
                            <label className="col-md-2 control-label" style={styleRight} >Price</label>
                            <div className="col-md-4">
                                <input type="text" id="price"  defaultValue={this.props.post.price} className="form-control pull-left" name="price" style={styleLeft} />
                            </div>
                         </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={styleRight}>Title</label>
                            <div className="col-md-9">
                                <input type="text" id="title"  defaultValue={this.props.post.title} className="form-control" style={styleLeft} name="title" />
                            </div>
                        </div>
                    </div> 
                    
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={styleRight}>Description</label>
                            <div className="col-md-9">
                                <textarea id="description"  defaultValue={this.props.post.description} className="form-control pull-left" rows="8" name="description"></textarea>
                            </div>
                        </div>
                    </div> 
                                            
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={styleRight}>Address</label>
                            <div className="col-md-9">
                                <input type="text" id="address"  defaultValue={this.props.post.address} 
                                        onChange={this.handleChangeAddress}
                                        className="form-control" name="address" style={styleLeft} />
                            </div>
                        </div>
                    </div>


                    <div id="addressDetails">
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-md-2 control-label" style={styleRight}>City</label>
                                    <div className="col-md-9">
                                        <input type="text" id="locality" defaultValue={this.props.post.city} className="form-control" name="locality" style={styleLeft} />
                                    </div>
                                </div>
                            </div>
                    
                    
                            <div className="form-group"> 
                                <div className="row">   
                                    <label className="col-md-2 control-label" style={styleRight}>State</label>                 
                                    <div className="col-md-3"><input name="administrative_area_level_1" defaultValue={this.props.post.state} className="form-control" disabled  style={styleLeft}/></div>
                                    <label className="col-md-2 control-label" style={styleRight}>State code</label>
                                    <div className="col-md-2"><input name="administrative_area_level_1_short" className="form-control" disabled  style={styleLeft}/></div>
                                    <label className="col-md-1 control-label" style={styleRight}>Zipcode</label>
                                    <div className="col-md-1"><input name="postal_code" className="form-control" disabled  style={styleLeft}/></div>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-md-2 control-label" style={styleRight}>Country</label>
                                    <div className="col-md-3"><input name="country" defaultValue={this.props.post.country} className="form-control" disabled style={styleLeft} /></div>
                                    <label className="col-md-2 control-label" style={styleRight}>Country code</label>
                                    <div className="col-md-2"><input name="country_short" className="form-control" disabled style={styleLeft} /></div>
                                </div>
                            </div>
                        
                            <div className="form-group">   
                                <div className="row">                         
                                    <label className="col-md-2 control-label" style={styleRight}>Lat</label>
                                    <div className="col-md-3"><input name="lat" defaultValue={this.props.post.lat} className="form-control" disabled style={styleLeft} /></div>

                                    <label className="col-md-2 control-label" style={styleRight}>Long</label>                 
                                    <div className="col-md-3"><input name="lng" defaultValue={this.props.post.lng} className="form-control" disabled style={styleLeft} /></div>
                                </div>
                            </div>
                                                   
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-md-2 control-label" style={styleRight}>Map</label>
                                    <div className="col-md-9">
                                        <div id="map3" className="mapCanvas" style={{width: "700px", height: "300px"}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4 col-md-offset-2">
                                    <button type="submit" className="btn btn-primary form-control">Submit</button>
                                </div>
                            </div>
                        </div>
            
                </form>
            </div>           
        );
    }
});