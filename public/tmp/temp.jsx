                <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="">Register</h4>
                        </div>
                        <div class="modal-body">
                            <Register />
                        </div>
                        <div class="modal-footer">
                        </div>
                        </div>
                    </div>
                </div>


                <div class="modal fade" id="signInModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Sign In</h4>
                        </div>
                        <div class="modal-body">
                            <SignIn />
                        </div>
                        <div class="modal-footer">
                        </div>
                        </div>
                    </div>
                </div>
                
                
                
                
                

uppercase = require('upper-case');
BS = require('react-bootstrap');
resolutions = require('browserify-resolutions');

browserify(options)
    .plugin(resolutions, '*')
    .bundle();
    
    
    
    
        const signInModal = (
            <BS.Modal show={this.state.showSignIn} onHide={this.closeSignIn}>
                <BS.Modal.Header closeButton>
                    <BS.Modal.Title>Sign in</BS.Modal.Title>
                </BS.Modal.Header>
                <BS.Modal.Body>
                    <SignIn closeSignIn={this.closeSignIn} openRegister={this.openRegister} />
                </BS.Modal.Body>
                <BS.Modal.Footer>
                    <BS.Button onClick={this.closeSignIn}>Close</BS.Button>
                </BS.Modal.Footer>
            </BS.Modal>
        );
        
        const registerModal = (
            <BS.Modal show={this.state.showRegister} onHide={this.closeRegister}>
                <BS.Modal.Header closeButton>
                    <BS.Modal.Title>Register</BS.Modal.Title>
                </BS.Modal.Header>
                <BS.Modal.Body>
                    <Register closeRegister={this.closeRegister} />
                </BS.Modal.Body>
                <BS.Modal.Footer>
                    <BS.Button onClick={this.closeRegister}>Close</BS.Button>
                </BS.Modal.Footer>
            </BS.Modal>         
        );
        
        
        
        
                                <DropDownMenu value={3}>
                            <MenuItem value={1} primaryText="For sale" />
                            <MenuItem value={2} primaryText="Housing" />
                            <MenuItem value={3} primaryText="Jobs" />
                            <MenuItem value={4} primaryText="Services" />
                            <MenuItem value={5} primaryText="Community" />
                            <MenuItem value={6} primaryText="Wanted" />
                        </DropDownMenu>
                        
                        
                        
                        
                <AppBar zDepth={2} title="BánMua.US" iconClassNameRight="muidocs-icon-navigation-expand-more"
                    iconElementRight={
                        <IconMenu 
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}} 
                                >
                            <MenuItem primaryText="Post" />
                            <MenuItem primaryText="My account" />
                        </IconMenu>
                     } />
                     
                     
                     
                     
            <AppCanvas>
                <AppBar title="BánMua.US" 
                    iconElementRight={
                    <IconMenu iconButtonElement={<IconButton style={{color: "black"}} iconClassName="muidocs-icon-custom-github" />} >
                        <MenuItem primaryText="Post" />
                        <MenuItem primaryText="My account" />
                        <MenuItem primaryText="Search" />
                        <MenuItem primaryText="Sign out" />
                    </IconMenu>
                    }
                />
                
                
  "transforms": {
    "externalify": {
      "global": true,
      "external": {
        "react": "React.require",
        "react-dom": "React.require"
      }
    }
  }



    <ToolbarGroup float="right">
      <ToolbarTitle text="Options" />
      <FontIcon className="muidocs-icon-custom-sort" />
      <IconMenu iconButtonElement={
        <IconButton touch={true}>
          <NavigationExpandMoreIcon />
        </IconButton>
      }>
        <MenuItem primaryText="Download" />
        <MenuItem primaryText="More Info" />
      </IconMenu>
      <ToolbarSeparator />
      <RaisedButton label="Create Broadcast" primary={true} />
    </ToolbarGroup>
    
    
    
    
                            <DropDownMenu value={this.state.rightValue}  onChange={this.handleChangeRightMenu}>
                            <MenuItem value={1}>Sign in</MenuItem>
                            <MenuItem value={2}>Register</MenuItem>
                            <MenuItem value={3}>My account</MenuItem>
                            <MenuItem value={4}>Post</MenuItem>
                            <MenuItem value={5}>Search</MenuItem>
                        </DropDownMenu>
                        
                        

                    <MenuItem >For sale</MenuItem>
                    <MenuItem>Housing</MenuItem>
                    <MenuItem>Jobs</MenuItem>
                    <MenuItem>Services</MenuItem>
                    <MenuItem>Community</MenuItem>
                    <MenuItem>Wanted</MenuItem>
                    <Divider />
                    <MenuItem
                            menuItems={[
                                <MenuItem primaryText="Show Level 2" />,
                                <MenuItem primaryText="Grid lines" checked={true} />,
                                <MenuItem primaryText="Page breaks" insetChildren={true} />,
                                <MenuItem primaryText="Rules" checked={true} />
                            ]}>Subcat</MenuItem>
                            
            
/// routes.jsx                 
                            
import React from 'react';
import {mount, withOptions, _getRootNode} from 'react-mounter';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

mount2 = mount;
getRootNode = _getRootNode;

FlowRouter.route('/', {
    name: 'home',
    action() {
        mount(Main, { content: <Home /> });
    }
});

FlowRouter.route("/login", {
    name: 'login',
	action(params) {
		//ReactLayout.render(Main, { content: <Accounts.ui.LoginFormSet redirect={()=>FlowRouter.go('/')} /> });
        mount(Main, { content: <Accounts.ui.LoginFormSet redirect={null} /> });
	}
});

FlowRouter.route("/cat/:category", {
    name: 'category',
	action(params) {
	   mount(Main, { content: <Category category={params.category} />});
	}
});

FlowRouter.route('/post/:_id', {
    name: 'post',
    action(params) {
        var posting = Posts.findOne(params._id);
        mount(Main, { content: <Post posting={posting} />});
    }
});

FlowRouter.route('/adm/scrape', {
    name: 'scrape',
    action(params) {
        mount(Main, { content: <Scrape />});
    }
});

                            //
/// routes.jsx , React-Router version

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

console.log(Main);

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={<Main />}>
            <Route path="login" component={<Account.ui.LoginFormSet />} />
        </Route>
    </Router>
), document.body);

/// 



import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const {Router, Route} = ReactRouter;
//const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)();
const history = ReactRouter.browserHistory;

Meteor.startup(function() {
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);
    
    ReactDOM.render((
        <Router history={ history }>
            <Route path="/" component={ Main } >

            </Route>
        </Router>
    ), root);
});



//// onStartup

Meteor.startup(function() {
    GoogleMaps.load({
        key: 'AIzaSyDQiIkUVqyUu_ev3QaOQFLqfCyR_wtLwTo',
        libraries: 'places'
    });
    console.log("startup loaded GoogleMaps");
    if (GoogleMaps.loaded()) console.log("loaded GoogleMaps SUCCESSFUL.");
    else console.log("loaded GoogleMaps UNSUCCESSFUL!");
});




    <script type="text/javascript" charset="UTF-8" src="http://maps.googleapis.com/maps-api-v3/api/js/23/5/common.js"></script>
    <script type="text/javascript" charset="UTF-8" src="http://maps.googleapis.com/maps-api-v3/api/js/23/5/util.js"></script>
    <script type="text/javascript" charset="UTF-8" src="http://maps.googleapis.com/maps-api-v3/api/js/23/5/controls.js"></script>
    <script type="text/javascript" charset="UTF-8" src="http://maps.googleapis.com/maps-api-v3/api/js/23/5/places_impl.js"></script>
    <script type="text/javascript" charset="UTF-8" src="http://maps.googleapis.com/maps-api-v3/api/js/23/5/geocoder.js"></script>
    <script type="text/javascript" charset="UTF-8" src="http://maps.googleapis.com/maps-api-v3/api/js/23/5/stats.js"></script>
    
    
    
<template name="map">
    <style type="text/css">
    .mapCanvas {
        width: 600px;
        height: 400px;
    }
    </style>

    <form id="addressForm" class="form-horizontal">
        <div class="form-group">
            <label class="col-xs-3 control-label">Address</label>
            <div class="col-xs-5">
                <input type="text" class="form-control" name="address" />
            </div>
        </div>

        <div class="form-group">
            <label class="col-xs-3 control-label">Map</label>
            <div class="col-xs-9">
                <div id="map" class="mapCanvas"></div>
            </div>
        </div>

        <div id="addressDetails" class="form-group">
            <input name="lat" class="form-control" />
            <input name="lng" class="form-control" />
        </div>

        <div class="form-group">
            <div class="col-xs-9 col-xs-offset-3">
                <button type="submit" class="btn btn-default">Submit</button>
            </div>
        </div>
    </form>

    <script>
        $(function() {
            $('#address').geocomplete();
        });
    </script>
    
</template>








                <div className="col-md-2"></div>
                <div className="post col-md-8">
                    <div className="row">
                        <div className="col-md-7" style={{display: "inline-block"}}>
                            <div className="post-holder" align="center" style={{display: "inline-block"}} >
                                <img style={{display: "inline-block"}} src={this.props.post.image} className="img-responsive" id="pic" alt="Image" />
                            </div>
                            <p className="text-center"><h2>{this.props.post.price} : {this.props.post.title}</h2></p>
                        </div>
                        <div className="col-md-4 pull-right">
                            <div className="checkbox has-error">
                            <label>
                                <input type="checkbox" id="flag" />
                                Flag this ad!
                            </label>
                            </div>
                            <p>Name: {this.props.post.author}</p>
                            <p>Phone: {this.props.post.phone}</p>
                            <p>Location: {this.props.post.city}, {this.props.post.state}, {this.props.post.country}</p>
                        </div>
                    </div>
                    
                    <div className="row">
                        {this.props.post.description}
                        
                    </div>
                </div>
                
                
                
                
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-3" style={styleRight}><label>Quantity per run</label></div>
                            <div className="col-xs-9" style={styleLeft}>
                                <MUI.DropDownMenu value={4} >
                                    <MUI.MenuItem value={1} primaryText="1000"/>
                                    <MUI.MenuItem value={2} primaryText="5000"/>
                                    <MUI.MenuItem value={3} primaryText="10000"/>
                                    <MUI.MenuItem value={4} primaryText="15000"/>
                                    <MUI.MenuItem value={5} primaryText="20000"/>
                                    <MUI.MenuItem value={6} primaryText="25000"/>
                                    <MUI.MenuItem value={7} primaryText="30000"/>
                                    <MUI.MenuItem value={8} primaryText="40000"/>
                                    <MUI.MenuItem value={9} primaryText="50000"/>
                                    <MUI.MenuItem value={10} primaryText="100000"/>
                                </MUI.DropDownMenu>
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-group">    
                        <div className="row">
                            <div className="col-xs-3" style={styleRight}><label>Repeat</label></div>
                            <div className="col-xs-9" style={styleLeft}>
                                <MUI.DropDownMenu value={1}>
                                    <MUI.MenuItem value={1} primaryText="Weekly, from the start date"/>
                                    <MUI.MenuItem value={2} primaryText="Weekly, weekends only"/>
                                    <MUI.MenuItem value={3} primaryText="Daily"/>
                                </MUI.DropDownMenu>
                            </div>
                        </div>
                    </div>
                                        
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-3" style={styleRight}><label>Start Date</label></div>
                            <div className="col-xs-9" style={styleLeft}><MUI.DatePicker hintText="start date"/></div>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-3" style={styleRight}><label>End Date</label></div>
                            <div className="col-xs-9" style={styleLeft}><MUI.DatePicker hintText="end date"/></div>
                        </div>
                    </div>
                    
                    
                    
                    
                    
                    <h1 className="mxn2 mt0 mb0 p2 fixed bg-blue white"
                            style={{color: "red"}} >
                        Directory</h1>     
                        
               
               
               
               {/*<div className="listing col lg-col-4 px2">*/}
                <div className="col lg-col-4">

                    {/*<ul className="list-reset mxn2">*/}
                        { genRest(this.data.restaurants) }
                    {/*</ul>*/}
                </div>           
                
                
                        {/*style={{overflowY: "scroll", height: "" + calc(100vh - 72) + "px"}} */}    