console.log("................")

require("dotenv").config();

var Twitter = require("twitter");
var keys = require("./key.js");
//console.log(keys)
var request = require("request");
var command = process.argv[2];
var commandTwo = process.argv[3];


//----- twitter -----//

function myTweets() {
	console.log("Tweets headed your way!");
	//new variable for instance of twitter, load keys from imported keys.js
	var client = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	//parameters 
	var parameters = {
		screen_name: 'coderHamburger',
		count: 2
	};

	//call method
	client.get('statuses/user_timeline', parameters, function (error, tweets, response) {
		if (!error) {
			for (i = 0; i < tweets.length; i++) {
				var returnedData = ('Number: ' + (i + 1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
				console.log(returnedData);
				console.log("....................");
			}
		};
	});
};

//----- spotify -----//

function spotifyThisSong(inputs) {

	var Spotify = require('node-spotify-api');

	var spotify = new Spotify({
		id: process.env.SPOTIFY_ID,
		secret: process.env.SPOTIFY_SECRET
	});

	if (!inputs) {
		inputs = 'I Want it That Way';
	}
	spotify.search({ type: 'track', commandTwo: inputs }, function (err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		} else {
			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			console.log("Song: " + data.tracks.items[0].name);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("Preview Here: " + data.tracks.items[0].preview_url);
		}
	});
}

//----- movieThis -----//


function movieThis(inputs) {

	var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=b21d0f64";

	request(queryUrl, function (error, response, body) {
		if (!inputs) {
			inputs = 'Mr Nobody';
		}
		if (!error && response.statusCode === 200) {

			console.log("Title: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
};



//----- command center -----//
console.log(process.argv[2]);

if (command === "my-tweets") {
	myTweets();
} else if (command === "spotify-this-song") {
	spotifyThisSong();
} else if (command === "movie-this") {
	movieThis(commandTwo);
}