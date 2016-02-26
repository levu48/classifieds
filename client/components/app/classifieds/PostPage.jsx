PostPage = React.createClass({
    render() {

        const styleLeft = { textAlign: "left" };
        const styleRight = { textAlign: "right" };
        
        return (

           <div className="container">
            
                <ol className="breadcrumb">
                    <li><a href="{{pathFor 'categories'}}">Home</a></li>
                    <li><a href="{{pathFor 'postsList'}}">{this.props.post.category}</a></li>
                    <li className="active">{this.props.post.title}</li>
                </ol>
                
                
                <div className="row">
                    <div className="col-md-6 col-md-offset-2">
                        <img style={{display:"inline-block"}} src={this.props.post.image} 
                                id="pic2" className="img-responsive" alt="image" />
                    </div>      
                </div>   
                
                <div className="row">
                    <label className="col-md-2 control-label" style={styleRight}>Category</label>
                    <div className="col-md-9" style={styleLeft}>
                        {this.props.post.category}
                    </div>
                </div>      
                
                <div className="row">
                    <label className="col-md-2 control-label" style={styleRight}>Title</label>
                    <div className="col-md-9">
                        {this.props.post.title}
                    </div>
                </div>  

                <div className="row">
                    <label className="col-md-2 control-label" style={styleRight}>Description</label>
                    <div className="col-md-9">
                        {this.props.post.description}
                    </div>
                </div>  
                

            </div>            
        );
    } 
});