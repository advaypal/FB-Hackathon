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
				HI
			</div>
		);
	}
});


ReactDOM.render(<App />, document.getElementById("app"));