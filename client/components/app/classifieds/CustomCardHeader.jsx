var {
    Styles, Avatar, StylePropable, ThemeManager, DefaultRawTheme
} = MUI;


CustomCardHeader = React.createClass({
    contextTypes: {
        muiTheme: React.PropTypes.object
    },
    
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    
    mixins: [StylePropable],
    
    getDefaultProps() {
        return {
            titleColor: Styles.Colors.darkBlack,
            subTitleColor: Styles.Colors.lightBlack,
            avatar: null
        }
    },
    
    getInitialState() {
        return {
            muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
        }
    },
    
    getChildContext() {
        return {
            muiTheme: this.state.muiTheme
        };
    },
    
    componentWillReceiveProps(nextProps, nextContext) {
        let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
        this.setState({muiTheme: newMuiTheme});
    },
    
    getStyles() {
        return {
            root: {
                height: 72,
                padding: 0,
                fontWeight: Styles.Typography.fontWeightMedium,
                textAlign: "center",
                boxSizing: "border-box",
                position: "relative"
            },
            
            image: {
                width: 100,
                height: 72,
                marginRight: 5,
                float: "left"
            },
            
            text: {
                display: "inline-block"
            },
            
            title: {
                height: 72,
                color: this.props.titleColor,
                display: "block",
                overflow: "hidden",
                fontSize: 15,
                textAlign: "center",
                paddingTop: "7px",
                marginRight: "35px",
                marginLeft: "35px"
                
            },
            
            subtitle: {
                color: this.props.subtitleColor,
                display: 'block',
                fontSize: 14,
            },
        };
    },
    
    merge(obj1, obj2) {
        let obj3 = {};
        for (let att in obj1) { obj3[att] = obj1[att]; }
        for (let att in obj2) { obj3[att] = obj2[att]; }
        return obj3;
    },
    

    render() {
        let styles = this.getStyles();
        let rootStyle = this.merge(styles.root, this.props.style);
        let imageStyle = styles.image;
        let textStyle = styles.text;
        let titleStyle = styles.title;
        let subtitleStyle = styles.subtitle;
        
        let leftImage = (function() {
            if (this.props.image) {
                    return <img src={this.props.image} style={imageStyle} />;
                } else {
                    return <span />;
                }
            }).call(this);
            
        return (
            <div {...this.props} style={rootStyle}>
                {leftImage}
                <div style={titleStyle}>
                    <span>{this.props.title}</span>
                    <span style={subtitleStyle}>{this.props.subtitle}</span>
                </div>
                {this.props.children}
            </div>
        );
    }
});