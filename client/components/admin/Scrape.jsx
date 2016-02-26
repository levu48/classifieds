Scrape = React.createClass({
    mixins: [ReactMeteorData],
    
    getMeteorData() {
        return {
            info: Session.get("info")
        }
    },

    scrape() {
        const url = this.refs.url.value;
        const controlKey = this.refs.controlKey.value;
        const category = this.refs.category.value;
        console.log("scrape: ", url, controlKey, category);
        
        Meteor.call('scrape', url, controlKey, function(err, res) {
            Session.set("info", res);
        });
    },
    
    save() {
        const url = this.refs.url.value;
        const controlKey = this.refs.controlKey.value;
        const category = this.refs.category.value;
        console.log("save: ", url, controlKey, category);
        Meteor.call('saveScrape', url, controlKey, category, function(err, res) {
            Session.set("info", res);
        });
    },
    
    render() {
        let categories = [];
        for (let i=0; i<AppObj.categories.length; i++) {
            let cat = AppObj.categories[i];
            if (cat.categories && cat.categories.length > 0) {
                for (let j=0; j<cat.categories.length; j++) {
                    categories.push(cat.categories[j]);
                }
            } else {
                categories.push(cat);
            } 
        }
        
        return (
            <div>
            <div className="container">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form className="post-submit" >
                        <div className="row">
                            <div className="col-md-12">
                                <input type="text" className="form-control" name="url" ref="url" placeholder="scrape url" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">                   
                                <input type="text" className="form-control" name="control-key" ref="controlKey" placeholder="control key" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <select name="category" ref="category" className="form-control">
                                { categories.map((cat) => {
                                    return <option value={cat._id}>{cat.name}</option>
                                })}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <button className="btn btn-primary col-md-3" type="button" onClick={this.scrape}>Scrape</button>
                                <button className="btn btn-success col-md-3" type="button" onClick={this.save}>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
           </div>
           <div className="container">
                <div className="col-md-12">
                    <div style={{textAlign: "left"}} >
                        { this.data.info ? 
                            this.data.info.map((str) => {
                                    return <pre>{str}</pre>;
                            })
                            :
                            <pre></pre>
                        }
                    </div>
                </div>
           </div>
           </div>
        );
    }
});