const {Card, CardMedia, CardText, CardActions, FlatButton, IconButton } = MUI;
const {SvgIcons} = MUI.Libs;


PostCard = React.createClass({    
    mixins: [ReactMeteorData],
    
    getMeteorData() {
        let handle = Meteor.subscribe('app-accounts');
        
        let isSaved = function(postId) {
            if (!Meteor.user()) return false;
            let rec = AppAccounts.find({userId: Meteor.user()._id}).fetch();
            if (!rec || rec.length === 0) return false;
            if (rec[0].saves.indexOf(postId) > -1) return true;
            return false;
        }
        
        return {
            saved: isSaved(this.props.post._id)
        }
    },
    
    saveEntry() {
        console.log("save entry " + this.props.post._id);
        Meteor.call('accountInsert', this.props.post._id, function(e,r) {
                if (e) {
                    console.log("error: ", e);
                    return;
                }
                console.log("result: ", r);
            });
    },
    
    deleteEntry(post) {
        if (confirm('Delete this posting?')) {
            Meteor.call('deletePost', post._id);
        }     
    },
    
    render() {

        let media = (function() {
            if (this.props.post && this.props.post.image) {
                return (
                    <a href={"/post/" + this.props.post._id}>
                        <CardMedia style={{ verticalAlign: 'top',
                                                maxWidth: '100px',
                                                minWidth: '100px',
                                                width: '100px',
                                                align: 'left'
                                                    }} >
                            <img style={{width: "100px", height:"70px", align:"left"}} src={this.props.post.image} />
                        </CardMedia>
                    </a>                   
                );
            } else {
                return <span />;
            }
        }).call(this);
        
        return (
            <Card  style={ this.data.saved ? { background: "#ccc"} : { background: "#eee"} } >
                {/* media */}
                <CustomCardHeader 
                        image = {this.props.post.image}
                        style={{fontSize: "10px"}} 
                        title={this.props.post.title}
                        subtitle={this.props.post.price} 
                        actAsExpander={true}
                        showExpandableButton={true}
                        />
                <CardText expandable={true}>{this.props.post.description}</CardText> 
                <CardActions expandable={true} style={{textAlign:"center"}}>
                    { Meteor.user() && Utils.ownsDocument(Meteor.user()._id, this.props.post)
                            ? (  <span>
                                    <IconButton linkButton={true} href={"/post/" + this.props.post._id} tooltip=<Tran>details</Tran> tooltipPosition="top-center"><SvgIcons.ActionVisibility/></IconButton>
                                    <IconButton onClick={this.saveEntry} tooltip=<Tran>save</Tran> tooltipPosition="top-center"><SvgIcons.ToggleStar/></IconButton>
                                    <IconButton linkButton={true} href={"/myposts/" + this.props.post._id + "/edit"} tooltip=<Tran>edit</Tran> tooltipPosition="top-center"><SvgIcons.ImageEdit/></IconButton>
                                    <IconButton onClick={this.deleteEntry.bind(this, this.props.post)} tooltip=<Tran>delete</Tran> tooltipPosition="top-center"><SvgIcons.ActionDelete/></IconButton>
                                    <IconButton linkButton={true} href={"/myposts/" + this.props.post._id + "/buy"} tooltip=<Tran>buy</Tran> tooltipPosition="top-center"><SvgIcons.EditorAttachMoney/></IconButton>
                                 </span> )
                            : Meteor.user() 
                                    ? (<span>
                                            <IconButton linkButton={true} href={"/post/" + this.props.post._id}  tooltip=<Tran>details</Tran> tooltipPosition="top-center"><SvgIcons.ActionVisibility/></IconButton>
                                            <IconButton onClick={this.saveEntry} tooltip=<Tran>save</Tran> tooltipPosition="top-center"><SvgIcons.ToggleStar/></IconButton>
                                       </span>)
                                    : <span><IconButton linkButton={true} href={"/post/" + this.props.post._id}  tooltip=<Tran>details</Tran> tooltipPosition="top-center"><SvgIcons.ActionVisibility/></IconButton></span>
                    }
                </CardActions>
            </Card>
        );
    }
});

