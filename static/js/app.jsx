var player1 = 'realDonaldTrump', player2='HillaryClinton';

window.sr = ScrollReveal();
	sr.reveal('.player1');
	sr.reveal('.player2');

// define fields from json reply
var img = 'img';
var tweet = 'tweet';

var App = React.createClass({
	getInitialState() {
		return {
			tweet: {}
		};
	},
	componentWillMount() {
	},
	handleClick: function() {
		console.log("clicked");
		console.log("Player 1 is " + player1 + " and Player 2 is " + player2);
		if(typeof player1 != 'undefined' || typeof player2 != 'undefined') {
			ReactDOM.unmountComponentAtNode(document.getElementById('main'));
			ReactDOM.render(<Battle />, document.getElementById("app"));
		}
	},
	render: function() {
		// create all the rows we need and populate into an array
		return (
			<div>
			<div className="cover">
			<div className="cover-image"></div>
			<div className="container home">

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
			<h1 className="text-inverse heading animated bounceInDown">Tweet Battle</h1>
			<p className="text-inverse animated tada">The Epic Tweet Battle</p>
			</div>
			</div>
			<div className="row text-center">
			<div className="col-md-4">
			<div className="form-group">
			<div id="the-basics">
			<input type="text" className="custom-input typeahead animated fadeIn" onChange={this.handleChangePlayer1}></input>
			</div>
			</div>
			</div>
			<div className="col-md-4 text-inverse">
			<h1>VS</h1>
			</div>
			<div className="col-md-4">
			<div className="form-group">
			<input type="text" className="custom-input typeahead animated fadeIn" onChange={this.handleChangePlayer2}></input>
			</div>
			</div>
			</div>
			</div>
			);
	}
});

var Battle = React.createClass({
	getInitialState() {
		return {
			player1: {},
			player2: {},
			loading: false
		};
	},
	componentDidMount() {
		var apiUrl = "../tweets?id1=" + player1 + "&id2=" + player2;
	    // put in a loading screen
	    this.serverRequest = $.get(apiUrl, function (result) {
	    	var result = JSON.parse(result);
	    	console.log(result);
	    	console.log(result[player1][tweet][0]);
	    	this.setState({
	    		player1: {
	    			tweet: result[player1][tweet],
	    			img: result[player1][img]
	    		},
	    		player2: {
	    			tweet: result[player2][tweet],
	    			img: result[player2][img]
	    		}
	    	});
	    	// unmount loading screen
	    }.bind(this));  
	},
	handleKeyPress: function() {
		console.log("Print");
	},
	render: function() {
		var display = [];
		var arr = this.state.player1[tweet];
		console.log(arr);

		if(typeof this.state.player1[tweet] != 'undefined') {
			for(var i = 0; i < 5; i++) {
				display.push(<Player1 name={player1} img={this.state.player1[img]} tweet={this.state.player1[tweet][i]} key={"player1" + i} />);
				display.push(<Player2 name={player2} img={this.state.player2[img]} tweet={this.state.player2[tweet][i]} key={"player2" + i} />);
			}
			display.push(<br/>);
			display.push(<br/>);
			display.push(<br/>);
		}
		return (
			<div>
			<div className="row">
				<div className="col-md-12 text-center">
					<img className="logo" src="../static/images/box.jpg" />
				</div>
			</div>
			<div className="container appscreen">
			<br/>
			<br/>
			{display}
			<Footer/>
			</div>
			</div>
			);
	}
});

var Player1 = React.createClass({
	render: function() {
		var tweetUrl = "http://twitter.com/home/?status=" + encodeURI(this.props.tweet);
		return (
			<div>
			<div className="row player1 hideme">
			<div className="col-md-2 col-sm-2 col-xs-3"><img className="img-circle profile-pic img-responsive"
			src={this.props.img}/></div>
			<div className="col-md-4 col-sm-4 col-xs-7 vcenter">
			<h3 className="text-left animated fadeIn">{player1}</h3>
			<p className="bg-text-player1 text-left hvr-grow animated fadeIn">{this.props.tweet}
			<span>  </span>
			<a href={tweetUrl}><i className="fa fa-twitter" aria-hidden="true"></i></a>
			</p>
			</div>
			</div>
			</div>
			);
	}
});

var Player2 = React.createClass({
	render: function() {
		var tweetUrl = "http://twitter.com/home/?status=" + encodeURI(this.props.tweet);
		return (
			<div>	
			<div className="row player2 hideme">
			<div className="col-md-2 col-sm-2 col-xs-1"></div>
			<div className="col-md-4 col-sm-4 col-xs-1"></div>

			<div className="col-md-4 col-sm-4 col-xs-7 text-center vcenter right">
			<h3 className="text-left animated fadeIn">{player2}</h3>
			<p className="bg-text-player2 text-left hvr-grow animated fadeIn text-inverse">{this.props.tweet}
			<span>  </span>
			<a href={tweetUrl}><i className="fa fa-twitter" aria-hidden="true"></i></a>
			</p>
			</div>
			<div className="col-md-2 col-sm-2 col-xs-3 right animated fadeIn"><img className="img-circle profile-pic img-responsive"
			src=
			{this.props.img}/></div>
			</div>
			</div>
			);
	}
});

var Footer = React.createClass({
	render: function() {
		return (
			<div className="navbar navbar-default navbar-fixed-bottom custom-footer">
			<div className="container">
			<div className="navbar-header navbar-fixed-top">
			
			</div>
			
			<ul className="nav navbar-nav">
			<li>
			<a href="/">
			<i className="fa fa-angle-left fa-lg" aria-hidden="true"></i>
			<span className="hvr-wobble-vertical">  Start Over</span>
			</a>
			</li>
			</ul>
			</div>
			
			</div>
			);
	}
});

var Loader = React.createClass({
	render: function() {
		return (
			<div className="overlay">

			<a href="javascript:void(0)" className="closebtn" onclick="closeNav()">&times;</a>


			<div className="overlay-content">
			<a href="#">About</a>
			<a href="#">Services</a>
			<a href="#">Clients</a>
			<a href="#">Contact</a>
			</div>

			</div>
			);
	}
});

ReactDOM.render(<App />, document.getElementById("main"));