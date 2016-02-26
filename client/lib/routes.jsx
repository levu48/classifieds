import Test from "../components/app/system/Test.jsx";

FlowRouter.route('/', {
    name: 'home',
    action() {
        ReactLayout.render(Main, { content: <Home /> });
    }
});

FlowRouter.route("/login", {
    name: 'login',
	action(params) {
        ReactLayout.render(Main, { content: <Accounts.ui.LoginFormSet redirect={() => FlowRouter.go('/')} /> });
	}
});

FlowRouter.route('/post/:_id', {
    name: 'post',
    action(params) {
        var post = Posts.findOne(params._id);
        ReactLayout.render(Main, { content: <Post post={post} />});
    }
});

FlowRouter.route('/adm/scrape', {
    name: 'scrape',
    action(params) {
        ReactLayout.render(Main, { content: <Scrape />});
    }
});


FlowRouter.route('/adm/pdf', {
    name: 'pdf',
    action(params) {
        ReactLayout.render(Main, { content: <Pdf />});
    }
});


FlowRouter.route("/account", {
    action(params) {
        ReactLayout.render(Main, { content: <MyAccount />});
    }
});

FlowRouter.route('/myposts/:_id/edit', {
	name: 'postEdit',
    action(params) {
		var post = Posts.findOne(params._id);
        ReactLayout.render(Main, { content: <PostEdit post={post} />});
	}
});

FlowRouter.route('/myposts/:_id/buy', {
	name: 'postBuy',
    action(params) {
		var post = Posts.findOne(params._id);
        ReactLayout.render(Main, { content: <PostBuy post={post} />});
	}
});



geocompleteInput = function() {
    if (GoogleMaps.loaded()) {
        $('#place').geocomplete();
        console.log('ROUTER: exec geocomplete');
    } else {
        console.log('ROUTER: GoogleMaps not loaded.');
    }
}


FlowRouter.route("/post", {
    name: 'postSubmit',
    action(params) {
        ReactLayout.render(Main, { content: <PostSubmit />});
        //ReactLayout.render(Main, { content: <PostSubmit />}, function() { $('#place').geocomplete(); });
        //ReactDOM.render(<Main />, function() { $('#place').geocomplete(); });
    }
});


FlowRouter.route('/cat/housing', {
    name: 'Housing',
    action(params) {
        ReactLayout.render(Main, { content: <SiblingCategories catId="house-rent" />});
    }
});


FlowRouter.route('/cat/jobs', {
    name: 'Jobs',
    action(params) {
        ReactLayout.render(Main, { content: <SiblingCategories catId="jobs-work" />});
    }
});


FlowRouter.route("/cat/:category", {
    name: 'category',
	action(params) {
	   ReactLayout.render(Main, { content: <Category category={params.category} />});
	}
});

FlowRouter.route("/directory/add", {
    name: 'directory submit',
	action(params) {
	   ReactLayout.render(Main, { content: <DirectorySubmit />});
	}
});

FlowRouter.route("/directory", {
    name: 'directory',
	action(params) {
	   ReactLayout.render(Main, { content: <Directory />});
	}
});

FlowRouter.route("/agents", {
    name: 'agents',
	action(params) {
	   ReactLayout.render(Main, { content: <Agent />});
	}
});


/// TESTING 

FlowRouter.route('/test/map4', {
    name: 'Test Map2',
    action(params) {
        BlazeLayout.render('map4', {});
    }
});


FlowRouter.route('/test/map3', {
    name: 'Test Map3',
    action(params) {
        BlazeLayout.render('map3', {});
    }
});

FlowRouter.route('/test/map2', {
    name: 'Test Map2',
    action(params) {
        BlazeLayout.render('map2', {});
    }
});


FlowRouter.route('/test/map', {
    name: 'Test Map',
    action(params) {
        BlazeLayout.render('map', {});
    }
});

FlowRouter.route('/test', {
    name: 'Test',
    action(params) {
        ReactLayout.render(Main, { content: <Test />});
    }
});


FlowRouter.route('/test/siblings', {
    name: 'Test',
    action(params) {
        ReactLayout.render(Main, { content: <SiblingCategories catId="room-rent" />});
    }
});



