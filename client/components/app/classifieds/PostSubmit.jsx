PostSubmit = React.createClass({
    
    handleClickImage(event) {
		// MeteorCamera.getPicture([options], callback)
		$('#fileInput').click();
		$('#fileInput').change(function () {
			encodeImageFileAsURL();
		});
    },
    
    handleSubmit(e) {
        e.preventDefault();
        console.log("post submit");
        
        var imageData = function () {
			if (Session.get('imageData')) {
				var path = Session.get('imageData');
				return '/upload/' + path;
			} else 
                return '/file_icon.png';
        };


		var post = {
			image: $('#preview').attr('src'),//imageData(),
			category: $(e.target).find('[name=category]').val(),
            contact: $(e.target).find('[name=contact]').val(),
            phone: $(e.target).find('[name=phone]').val(),
            email: $(e.target).find('[name=email]').val(),
			price: $(e.target).find('[name=price]').val(),
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val(),
            address: $(e.target).find('[name=address]').val(),
            city: $(e.target).find('[name=locality]').val(),
			state: $(e.target).find('[name=administrative_area_level_1]').val(),
            country: $(e.target).find('[name=country]').val(),
            lat: $(e.target).find('[name=lat]').val(),
            lng: $(e.target).find('[name=lng]').val()
			//name: function () { return Meteor.user().username; },
			// anonymous: $(e.target).find('[name=anon]').val()
			//flags: 0
		};
        
        console.log(post);

		var errors = validatePost(post);
		if (errors.title || errors.category || errors.price || errors.number || errors.description || errors.location) {
			return Session.set('postSubmitErrors', errors);
		}

		Meteor.call('postInsert', post, function (error, result) {
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
        let catMenu = cats.map((cat) => {
            return <option value={cat._id} >{cat.name}</option>;
        });       
        
        const styleLeft = { textAlign: "left" };
        const styleRight = { textAlign: "right" };
        
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
                                <input type="text" id="contact" className="form-control pull-left" name="contact" style={styleLeft}/>
                            </div>
                         </div>
                    </div> 
                    
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={styleRight}>Phone</label>
                            <div className="col-md-4">
                                <input type="text" id="phone" className="form-control pull-left" name="phone" style={styleLeft}/>
                            </div>
                         </div>
                    </div> 

                    <div className="form-group">
                         <div className="row">
                            <label className="col-md-2 control-label" style={styleRight} >Email</label>
                            <div className="col-md-9">
                                <input type="text" id="email" className="form-control pull-left" name="email" style={styleLeft} />
                            </div>
                         </div>
                    </div>

                    <div className="form-group">
                         <div className="row">
                            <label className="col-md-2 control-label" style={styleRight} >Price</label>
                            <div className="col-md-4">
                                <input type="text" id="price" className="form-control pull-left" name="price" style={styleLeft} />
                            </div>
                         </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={styleRight}>Title</label>
                            <div className="col-md-9">
                                <input type="text" id="title" className="form-control" style={styleLeft} name="title" />
                            </div>
                        </div>
                    </div> 
                    
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={styleRight}>Description</label>
                            <div className="col-md-9">
                                <textarea id="description" className="form-control pull-left" rows="8" name="description"></textarea>
                            </div>
                        </div>
                    </div> 
                                            
                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-2 control-label" style={styleRight}>Address</label>
                            <div className="col-md-9">
                                <input type="text" id="address" className="form-control" name="address" style={styleLeft} />
                            </div>
                        </div>
                    </div>

                    <div id="addressDetails">
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-md-2 control-label" style={styleRight}>City</label>
                                    <div className="col-md-9">
                                        <input type="text" id="locality" className="form-control" name="locality" style={styleLeft} />
                                    </div>
                                </div>
                            </div>
                    
                    
                            <div className="form-group"> 
                                <div className="row">   
                                    <label className="col-md-2 control-label" style={styleRight}>State</label>                 
                                    <div className="col-md-3"><input name="administrative_area_level_1" className="form-control" disabled  style={styleLeft}/></div>
                                    <label className="col-md-2 control-label" style={styleRight}>State code</label>
                                    <div className="col-md-2"><input name="administrative_area_level_1_short" className="form-control" disabled  style={styleLeft}/></div>
                                    <label className="col-md-1 control-label" style={styleRight}>Zipcode</label>
                                    <div className="col-md-1"><input name="postal_code" className="form-control" disabled  style={styleLeft}/></div>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-md-2 control-label" style={styleRight}>Country</label>
                                    <div className="col-md-3"><input name="country" className="form-control" disabled style={styleLeft} /></div>
                                    <label className="col-md-2 control-label" style={styleRight}>Country code</label>
                                    <div className="col-md-2"><input name="country_short" className="form-control" disabled style={styleLeft} /></div>
                                </div>
                            </div>
                        
                            <div className="form-group">   
                                <div className="row">                         
                                    <label className="col-md-2 control-label" style={styleRight}>Lat</label>
                                    <div className="col-md-3"><input name="lat" className="form-control" disabled style={styleLeft} /></div>

                                    <label className="col-md-2 control-label" style={styleRight}>Long</label>                 
                                    <div className="col-md-3"><input name="lng" className="form-control" disabled style={styleLeft} /></div>
                                </div>
                            </div>
                                                   
                            <div className="form-group">
                                <div className="row">
                                    <label className="col-md-2 control-label" style={styleRight}>Map</label>
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
    
    
