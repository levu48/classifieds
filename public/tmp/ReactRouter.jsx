var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

//const browserHistory = History.createHistory();

Routes = React.createClass({
	getInitialState() {
		return {};
	},

	render() {
		return (
			<Router>
				<Route path="/" component={App}>
					<Route path="items" component={Items} />
				</Route>
			</Router>
		);
	}
});