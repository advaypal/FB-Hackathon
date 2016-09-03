var player1, player2;

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
	handleClick: function() {
		console.log("clicked");
		console.log("Player 1 is " + player1 + " and Player 2 is " + player2);
		ReactDOM.unmountComponentAtNode(document.getElementById('main'));
		ReactDOM.render(<Battle />, document.getElementById("app"));
	},
	render: function() {
		// create all the rows we need and populate into an array
		return (
			<div>
			<div className="cover">
			<div className="cover-image"></div>
			<div className="container">

			<Home />

			<div className="row">
			<div className="col-md-12 text-center">
			<a className="custom-btn description" href="#app" onClick={this.handleClick}>Go!</a>
			</div>              
			</div>
			</div>
			</div>
			</div>
			);
	}
});

var Home = React.createClass({
	handleChangePlayer1: function(event) {
		var input = event.target.value;
		player1 = input;
		console.log("Player 1: " + player1);
	},
	handleChangePlayer2: function(event) {
		var input = event.target.value;
		player2 = input;	
		console.log("Player 2: " + player2);
	},
	render: function() {
		return (
			<div>
			<div className="row">
			<div className="col-md-12 text-center">
			<h1 className="text-inverse heading">Tweet Battle</h1>
			<p className="text-inverse">The Epic Tweet Battle</p>
			</div>
			</div>
			<div className="row text-center">
			<div className="col-md-4">
			<div className="form-group">
			<input type="text" className="custom-input" id="usr" onChange={this.handleChangePlayer1}></input>
			</div>
			</div>
			<div className="col-md-4 text-inverse">
			<h1>VS</h1>
			</div>
			<div className="col-md-4">
			<div className="form-group">
			<input type="text" className="custom-input" id="usr" onChange={this.handleChangePlayer2}></input>
			</div>
			</div>
			</div>
			</div>
			);
	}
});

var Battle = React.createClass({
	render: function() {
		return (
			<div className="container">
				<Player1 />
				<Player2 />
			</div>
		);
	}
});

var Player1 = React.createClass({
	render: function() {
		return (
			<div>
				<div className="row">
                <div className="col-md-2"><img className="img-circle img-responsive"
                src=
                "http://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png"/></div>
                <div className="col-md-4 vcenter">
                    <h3 className="text-left">John Doe</h3>
                    <p className="bg-text-player1 text-left">Lorem ipsum dolor sit amet, adipiscing
                    elit Aenean commodo ligula eget.</p>
                </div>
            	</div>
			</div>
		);
	}
});

var Player2 = React.createClass({
	render: function() {
		return (
			<div>	
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4"></div>
                
                <div className="col-md-4 text-center vcenter">
                    <h3 className="text-left">John Doe</h3>
                    <p className="bg-text-player2 text-left">Lorem ipsum dolor sit amet, adipiscing
                    elit Aenean commodo ligula eget.</p>
                </div>
                <div className="col-md-2"><img className="img-circle img-responsive"
                src=
                "http://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png"/></div>
            </div>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById("main"));