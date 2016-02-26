Items2 = React.createClass({

	mixin: [ReactMeteorData],

	getMeteorData() {
		return {
			items: ItemsCollection.find({}).fetch()
		};
	},

	getInitialState() {
		return {};
	},

	addItem(e) {
		e.preventDefault();
		var item = React.findDOMNode(this.refs.input).value;

		ItemsCollection.inserts({'content': item});
		React.findDOMNode(this.refs.input).value = "";
	},

	render2() {
		return (
			<div className="container">
				<ol className="breadcrumb">
					<li><a href="/">Home</a></li>
					<li><a href={"/" + this.prop.category.name}>{this.prop.category.name}</a></li>
				</ol>
				<div className="row">
					<ul>
					{ this.data.items.map(function(item) {
						return <li key={item._id}>{item.content}</li>;
					})}
					</ul>
					<form onSubmit={this.addItem}>
						<input type="text" ref="input" />
						<button type="submit">Add Item</button>
					</form>
				</div>
			</div>
		);
	},

	render() {
		return (
			<h1>Hello</h1>
		);
	}
});


Items = React.createClass({
	render() {
		return (
				<h1>Hello</h1>
		);
	}
});