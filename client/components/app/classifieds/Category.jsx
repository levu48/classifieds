const {GridList} = MUI;

Category = React.createClass({
    getCols() {
        let cols = 4;
        if (window.innerWidth <= 400) cols = 1;
        else if (window.innerWidth <= 800) cols = 2;
        else if (window.innerWidth <= 1200) cols = 3;
        else cols = 4;
        return cols;
    }, 
    
    mixins: [ReactMeteorData],
    
    getMeteorData() {
        let handle = Meteor.subscribe('posts');
        return {
            posts: Posts.find({category: this.props.category}).fetch()
        }
    },
    
    getInitialState() {
        return {
            cols: this.getCols()
        }
    },
    
    handleResize(e) {
        this.setState({cols: this.getCols()});
    },
    
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    },
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    
    render() {        
        let posts = this.data.posts;
        let category = null;
       
        for (let i=0; i<AppObj.categories.length; i++) {
            let cat = AppObj.categories[i];
            if (cat._id === this.props.category) {
                category = cat;
                break;
            }
            
            if (cat.categories && cat.categories.length >0) {
                for (let j=0; j<cat.categories.length; j++) {
                    if (cat.categories[j]._id === this.props.category) {
                        category = cat.categories[j];
                        break;
                    }
                }
            }
        }
       
        const gridListStyle = {width: "100%", height: "100%", overflowY: 'auto', marginBottom: 24};
        
        let genCat = function() {
                return (
                    <div>
                        <h1 style={{ textAlign: "center"}} >{ category ? <Tran>{category.name}</Tran> : "unknown category" }</h1>
                        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                            <GridList
                                    cols={this.state.cols}
                                    cellHeight='100%'
                                    style={gridListStyle} >
                                { posts.map((post) => {
                                    return <PostCard post={post} />;
                                })}
                            </GridList>
                        </div>   
                    </div>
                );
        }
        
        return genCat.apply(this);

    }
});