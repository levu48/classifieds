import React from 'react';

const {Card, CardMedia, CardTitle, GridList} = MUI;

Home = React.createClass({
    getCols() {
        let cols = 4;
        if (window.innerWidth <= 400) cols = 1;
        else if (window.innerWidth <= 800) cols = 2;
        else if (window.innerWidth <= 1200) cols = 3;
        else cols = 4;
        return cols;
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
        const gridListStyle = {width: "100%", height: "100%", overflowY: 'auto', marginBottom: 24};
        
        const elements = AppObj.categories.map(cat => 
            <Card >
                <a href={"/cat/" + cat._id}>
                    <CardMedia overlay={<CardTitle title=<Tran>{cat.name}</Tran> subtitle=<Tran>{cat.subtitle}</Tran> />}>
                        <img src={cat.image} />
                    </CardMedia>
                </a>
            </Card>
         );
        
        const useGridList = function() {            
            return (
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                    <GridList
                            //cols = {this.data.cols}
                            cols = {this.state.cols}
                            cellHeight = '100%'
                            style = {gridListStyle} >
                        { elements }
                    </GridList>
                    <p>(Under Construction)</p>
                </div>              
            );
        }
        
        const useBootstrap = function() {
            let el = [];
            const num = 4;

            let groups = [];
            let count = -1;
            for (let i=0; i<elements.length; i++) {
                if (i % num === 0) {
                    count ++;
                    groups[count] = [];
                }
              
                groups[count].push(
                    <div className="col-xs-6 col-md-3"  
                            style={{ 
                                paddingLeft: "2",
                                paddingRight: "2",
                                marginBottom: "4"
                                }}>
                        {elements[i]}
                    </div>
                );
            }
                

            let rows = groups.map((group) => {
                return (
                    <div className="row"  
                            style={{ 
                                marginLeft: "-2",
                                marginRight: "-2"
                            }} >
                        {group}
                    </div>
                );
            });
            
            return (
                <div className="container" >
                   {rows}
                </div>
            );
        }
        
        return useGridList.bind(this)();
        //return useBootstrap();
    }
});
        
