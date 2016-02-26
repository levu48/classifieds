var {Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody } = MUI;

const tab = function (posts) {
    return (
        <Table fixedHeader={true}>
            <TableHeader >
                <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Title</TableHeaderColumn>
                    <TableHeaderColumn>City</TableHeaderColumn>
                    <TableHeaderColumn>State</TableHeaderColumn>
                    <TableHeaderColumn style={{textAlign:"right"}}>Actions</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody stripedRows={true}>
                { posts.map(function(post) {
                    let handleEdit = function() {
                        FlowRouter.go("/myposts/" + post._id + "/edit");
                    }
    
                    let handleDelete = function() {
                        if (confirm('Delete this posting?')) {
                            Meteor.call('deletePost', post._id);
                        }
                    }
                    
                    return (
                        <TableRow>
                            <TableRowColumn>{post._id}</TableRowColumn>
                            <TableRowColumn>{post.title}</TableRowColumn>
                            <TableRowColumn>{post.city}</TableRowColumn>
                            <TableRowColumn>{post.state}</TableRowColumn>
                            <TableRowColumn >
                                <div  style={{float:"right"}}>
                                    <button type="button" id="edit" className="btn btn-info" 
                                            onClick={handleEdit} >
                                        <span className="glyphicon glyphicon-wrench"></span>
                                    </button>
                                    &nbsp;
                                    <button type="button" id="delete" className="btn btn-danger" 
                                            onClick={handleDelete} >
                                        <span className="glyphicon glyphicon-trash"></span>
                                    </button>
                                </div>
                            </TableRowColumn>
                        </TableRow>
                        )
                    }
                )}
                
            </TableBody>
        </Table>
    );
}

MyAccount = React.createClass({
    render() {       
        if (!Meteor.user()) {
            return <h4>Restricted area. Return to <a href="/">Home</a></h4>
        }
        
        var postings = Posts.find({author: Meteor.user().username}).fetch();
        return (
            <div>  		
                <h1 class="transparent-header" align="center">My Posts</h1>
                {tab(postings)}
            </div>
        );
    }
});


Postings = React.createClass({
    render() {
        return (
            <div class="container">
                { this.props.postings.map((posting) => {
                    return <Posting posting={posting} />
                })}
	       </div>
        );
    }
});


Posting = React.createClass({
    
    handleEdit(e) {
        FlowRouter.go("/myposts/" + this.props.posting._id + "/edit");
    },
    
    handleDelete(e) {
		if (confirm('Delete this posting?')) {
			Meteor.call('deletePost', this.props.posting._id);
		}
	},

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="media">
                        <div className="media-left col-xs-1 col-md-1">
                            <a href={"/post/" + this.props.posting._id} >
                                <img className="media-object post-image" src={this.props.posting.image} alt="" />
                            </a>
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading col-xs-offset-2">{this.props.posting.title} : {this.props.posting.price}
                                <div className="pull-right">
                                    <a href="/postedit">
                                        <button type="button" id="edit" className="btn btn-info" onClick={this.handleEdit} >
                                            <span className="glyphicon glyphicon-wrench"></span>
                                        </button>
                                    </a>
                                    &nbsp;
                                    <button type="button" id="delete" className="btn btn-danger" onClick={this.handleDelete} >
                                        <span className="glyphicon glyphicon-trash"></span>
                                    </button>
                                </div>
                            </h4>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
});

