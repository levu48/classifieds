DirectorySubmit = React.createClass({
    
    handleClickImage(event) {
		// MeteorCamera.getPicture([options], callback)
		$('#fileInput').click();
		$('#fileInput').change(function () {
			encodeImageFileAsURL();
		});
    },
    
    handleSubmit(e) {
        e.preventDefault();
        console.log("directory submit");
        
        var imageData = function () {
			if (Session.get('imageData')) {
				var path = Session.get('imageData');
				return '/upload/' + path;
			} else 
                return '/file_icon.png';
        };


		var entry = {
			image: $('#preview').attr('src'),//imageData(),
			category: $(e.target).find('[name=category]').val(),
            name: $(e.target).find('[name=name]').val(),
            contact: $(e.target).find('[name=contact]').val(),
            phone: $(e.target).find('[name=phone]').val(),
            email: $(e.target).find('[name=email]').val(),
            web: $(e.target).find('[name=web]').val(),
			language: $(e.target).find('[name=language]').val(),
			description: $(e.target).find('[name=description]').val(),
            address: $(e.target).find('[name=address]').val(),
            city: $(e.target).find('[name=locality]').val(),
			state: $(e.target).find('[name=administrative_area_level_1]').val(),
            country: $(e.target).find('[name=country]').val(),
            location: {
                coordinates: [
                        Number($(e.target).find('[name=lng]').val()), 
                        Number($(e.target).find('[name=lat]').val())
                    ],
                type: "Point"
            }
			//name: function () { return Meteor.user().username; },
			// anonymous: $(e.target).find('[name=anon]').val()
			//flags: 0
		};
        
        console.log(entry);

		var errors = validateEntry(entry);
		if (errors.name || errors.category || errors.language || errors.address || errors.location) {
			return Session.set('entrySubmitErrors', errors);
		}

		Meteor.call('entryInsert', entry, function (error, result) {
			// display error to user and abort
			if (error) {
				return throwError(error.reason);
			}

			Session.set('imageData', null);
			FlowRouter.go('home', {_id: result._id});
		});
    },
    
    componentDidMount() {
        Tracker.autorun(function() {
            $('#address').geocomplete({ map: '#map', details: '#addressDetails'});
        });
    },
    
    
    render() {    
        let cats = Utils.flattenCategories(AppObj.categories.slice(0));
        let catMenu = AppObj.businesses.map((cat) => <option value={cat.name} >{cat.name}</option>); 
        
        return (
            <div className="container">
            
                <form id="post-form" clasNames="form-horizontal" onSubmit={this.handleSubmit}>
                    
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-2">
                                <img src="/resources/blue-camera-icon.png" id="preview" onClick={this.handleClickImage} className="img-rounded holder" alt="" />
                                <div style={{display: "none"}} ><input type="file" id="fileInput" className="form-control" /></div>
                                <p>Tap to take a picture. Landscape for a better picture.</p>
                            </div>      
                        </div>
                    </div>  
                    
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={Utils.styles.styleRight}>Category</label>
                            <div className="col-md-4">
                                <select type="text" id="category" name="category" className="form-control" style={{height: "35px", fontSize: "14px"}}>
                                    {catMenu}
                                </select>
                            </div>
                        </div>
                    </div>  
                    
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={Utils.styles.styleRight}>Language</label>
                            <div className="col-md-4">
                                <select type="text" id="language" name="language" className="form-control" style={{height: "35px", fontSize: "14px"}}>
                                    <option value="en" >English</option>
                                    <option value="vi" >Vietnamese</option>
                                    <option value="es" >Spanish</option>
                                    <option value="ko" >Korean</option>
                                </select>
                            </div>
                        </div>
                    </div>  

                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-9 col-md-offset-2" style={Utils.styles.styleLeft} >
                                <input type="checkbox" value="true" name="accept" checked />
                                Accept the terms and conditions
                            </label>
                        </div>
                    </div>  
                    
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={Utils.styles.styleRight}>Business name</label>
                            <div className="col-md-4">
                                <input type="text" id="name" className="form-control pull-left" name="name" style={Utils.styles.styleLeft}/>
                            </div>
                         </div>
                    </div> 

                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={Utils.styles.styleRight}>Contact person</label>
                            <div className="col-md-4">
                                <input type="text" id="contact" className="form-control pull-left" name="contact" style={Utils.styles.styleLeft}/>
                            </div>
                         </div>
                    </div> 
                    
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={Utils.styles.styleRight}>Phone</label>
                            <div className="col-md-4">
                                <input type="text" id="phone" className="form-control pull-left" name="phone" style={Utils.styles.styleLeft}/>
                            </div>
                         </div>
                    </div> 

                    <div className="form-group">
                         <div className="row">
                            <label className="col-md-2 control-label" style={Utils.styles.styleRight} >Email</label>
                            <div className="col-md-9">
                                <input type="text" id="email" className="form-control pull-left" name="email" style={Utils.styles.styleLeft} />
                            </div>
                         </div>
                    </div>

                    <div className="form-group">
                         <div className="row">
                            <label className="col-md-2 control-label" style={Utils.styles.styleRight} >Web</label>
                            <div className="col-md-9">
                                <input type="text" id="web" className="form-control pull-left" name="web" style={Utils.styles.styleLeft} />
                            </div>
                         </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={Utils.styles.styleRight}>Description</label>
                            <div className="col-md-9">
                                <textarea id="description" className="form-control pull-left" rows="8" name="description"></textarea>
                            </div>
                        </div>
                    </div> 
                                            
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={Utils.styles.styleRight}>Address</label>
                            <div className="col-md-9">
                                <input type="text" id="address" className="form-control" name="address" style={Utils.styles.styleLeft} />
                            </div>
                        </div>
                    </div>

                    <div id="addressDetails">
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-md-2 control-label" style={Utils.styles.styleRight}>City</label>
                                    <div className="col-md-9">
                                        <input type="text" id="locality" className="form-control" name="locality" style={Utils.styles.styleLeft} />
                                    </div>
                                </div>
                            </div>
                    
                    
                            <div className="form-group"> 
                                <div className="row">   
                                    <label className="col-md-2 control-label" style={Utils.styles.styleRight}>State</label>                 
                                    <div className="col-md-3"><input name="administrative_area_level_1" className="form-control" disabled  style={Utils.styles.styleLeft}/></div>
                                    <label className="col-md-2 control-label" style={Utils.styles.styleRight}>State code</label>
                                    <div className="col-md-2"><input name="administrative_area_level_1_short" className="form-control" disabled  style={Utils.styles.styleLeft}/></div>
                                    <label className="col-md-1 control-label" style={Utils.styles.styleRight}>Zipcode</label>
                                    <div className="col-md-1"><input name="postal_code" className="form-control" disabled  style={Utils.styles.styleLeft}/></div>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-md-2 control-label" style={Utils.styles.styleRight}>Country</label>
                                    <div className="col-md-3"><input name="country" className="form-control" disabled style={Utils.styles.styleLeft} /></div>
                                    <label className="col-md-2 control-label" style={Utils.styles.styleRight}>Country code</label>
                                    <div className="col-md-2"><input name="country_short" className="form-control" disabled style={Utils.styles.styleLeft} /></div>
                                </div>
                            </div>
                        
                            <div className="form-group">   
                                <div className="row">                         
                                    <label className="col-md-2 control-label" style={Utils.styles.styleRight}>Lat</label>
                                    <div className="col-md-3"><input name="lat" className="form-control" disabled style={Utils.styles.styleLeft} /></div>

                                    <label className="col-md-2 control-label" style={Utils.styles.styleRight}>Long</label>                 
                                    <div className="col-md-3"><input name="lng" className="form-control" disabled style={Utils.styles.styleLeft} /></div>
                                </div>
                            </div>
                                                   
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-md-2 control-label" style={Utils.styles.styleRight}>Map</label>
                                    <div className="col-md-9">
                                        <div id="map" className="mapCanvas" style={{width: "700px", height: "300px"}}></div>
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
                            
                        </div>
                                      
                </form>   
        </div> 
        );
    }
});
    
    
