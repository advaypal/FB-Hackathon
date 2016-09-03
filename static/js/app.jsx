function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var App = React.createClass({
	getInitialState() {
		return {

		};
	},
	componentWillMount() {
		// var apiUrl = "https://api.github.com/users/" + gitHubUserName + "/repos";
		// this.serverRequest = $.get(apiUrl, function (result) {
		// 	for (var i = 0; i < result.length; i++) { 
		// 		populatedNames.push(result[i].name);
		// 		populatedDescriptions.push(result[i].description);
		// 		populatedRepoUrls.push(result[i].html_url);
		// 		populatedHomepages.push(result[i].homepage);
		// 	}
		// 	this.setState({
		// 		names: populatedNames,
		// 		description: populatedDescriptions,
		// 		repoUrls: populatedRepoUrls,
		// 		homepages: populatedHomepages
		// 	});
		// }.bind(this));
	},
	componentWillUnmount() {
	    // this.serverRequest.abort();  
	},
	render: function() {
		// create all the rows we need and populate into an array
		

		return (
			<div>
			<Home />
			</div>
		);
	}
});

var Home = React.createClass({
	render: function() {
		return (
			<div>
			<div className="cover">
			<div className="cover-image"></div>
			<div className="container">
			<div className="row">
			<div className="col-md-12 text-center">
			<h1 className="text-inverse heading">Tweet Battle</h1>
			<p className="text-inverse">The Epic Tweet Battle</p>
			</div>
			</div>
			<div className="row text-center">
			<div className="col-md-4">
			<div className="form-group">
			<input type="text" className="custom-input" id="usr"></input>
			</div>
			</div>
			<div className="col-md-4 text-inverse">
			<h1>VS</h1>
			</div>
			<div className="col-md-4">
			<div className="form-group">
			<input type="text" className="custom-input" id="usr"></input>
			</div>
			</div>
			</div>
			<div className="row">
			<div className="col-md-12 text-center">
			<a className="custom-btn description" href="#app">Go!</a>
			</div>              
			</div>
			</div>
			</div>
			</div>
			);
	}
	});



ReactDOM.render(<App />, document.getElementById("app"));