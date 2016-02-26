SiblingCategories = React.createClass({
    render() {
        let sibs = Utils.getSiblingCategories(AppObj.categories, this.props.catId);
        if (!sibs || sibs.length === 0) {
            return <span />
            
        } else {
            let elements = sibs.map((cat) => {
                    return (<MUI.Tab label=<Tran>{cat.name}</Tran> 
                                    style={{ fontSize: "18px", background: "#455a64"}}
                                    value={cat._Id}>
                                <Category category={cat._id} />
                            </MUI.Tab>
                        )
                });
            return (
                <MUI.Tabs >
                    {elements}
                </MUI.Tabs>
            )
        }
    }
});