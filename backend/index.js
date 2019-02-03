var app = require('express')()
var cors = require('cors')
var bodyParser = require('body-parser')
var request = require("request");
var fs = require('fs')
var authKey = require('./authorization_key.json').key

var SpotifyWebApi = require('spotify-web-api-node')
var meditations = require('./meditations.json')
var sadVideos = require('./sadPlaylists.json')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

tones = ["anger", "fear", "joy", "sadness", "analytical", "confident", "tentative"]

let log = {
}

saveData = () => {
	fs.writeFile('./data.json', JSON.stringify(log), (err) => {
		if (err) {
			console.error("Failed to save log")
		}
	})
}

loadData = (callback) => {
	try {
		log = JSON.parse(fs.readFileSync('./data.json', 'utf8'))
	} catch (e) {
		let log = {
		}
	}
	callback()
}

let logRequest = (message, response) => {
	log[message] = response
	saveData()
}


var spotifyApi = new SpotifyWebApi({
  clientId: '1cb9d9d9a4b14c6780d7be13281bc5f0',
  clientSecret: '81659e1524d54d2ba207f0ef9bf09dae',
  redirectUri: 'http://localhost:8888/callback'
});


let getFromSpotify = (playlist) => {
	spotifyApi.getPlaylist(playlist).then(data => {
		console.log('Some information about this playlist', data.body.tracks.items);
	}, err => {
		console.log('Something went wrong!', err);
	});

}
spotifyApi.setAccessToken('BQAHKmMqccA2xBtZ2eYu5NIpok0eoruEsV7UfQuu-nIickHWlBS7ssAXjk6DrGUUf0yW8rBTvY7xwRvD92RJiwB-RbYuT53eCHVrAsA0_lTyFCXBJmzthiUN743tSuEmu-Vp_RCFaZsNDmJhxfWfs6URiVXaNt5G');


let sampleFromList = (list) => {
	return list[Math.floor(Math.random() * Math.floor(list.length))]
}

let getSadActivities = () => {
	// funny YT video playlists, comfort food, sad music

	let sadResultsObject = {
		videos: sampleFromList(sadVideos),
		restaurants: [],
		//music: sadMusicPlaylist
	}

	// Get list of comfort food locations from Yelp
	getLocationFromYelp('comfort food', (info) => {
		
	})
}

let getAngerActivities = () => {
	// gyms/spas/saunas, meditation, relaxing music
}

let getFearActivities = () => {
	// meditation, fearless youtube videos, hype music
}

let getJoyActivities = () => {
	// amusement parks, restaurants (celebration), funny movies, meditation
}

// Yelp functions here
let getLocationFromYelp = (searchBarText, callback) => {
	var request = require("request")

	var options = { 
		method: 'GET', 
		url: 'https://api.yelp.com/v3/businesses/search',
		qs: { 
			term: searchBarText, 
			location: 'Philadelphia, Pennsylvania' 
		},
		headers: { 
			Authorization: 'Bearer 3u3sKBiXRuSXu2mnpLZcTrTJsrYzNsSAYyl-i2VaahZ-3Q6-_iMMQ62GX4-4MTMkdO1pj_LHI3jq6X6IeZiA-NwWE0jJOR8FToFC4e7T1gEfamPA-I28XQzAuKpWXHYx' 
		}   
	}

	request(options, function (error, response, body) {
		if (error) throw new Error(error)
		console.log(body)
		callback(body)
	});
}

let processRequest = (responseObject, res) => {
	let responseTones = responseObject['sentences_tone']

	tonesValues = {
		"sadness": 0,
		"anger": 0,
		"fear": 0,
		"joy": 0,
		"tentative": 0,
		"analytical": 0,
		"confident": 0
	}

	responseTones.forEach(tonesObj => {
		tonesObj.tones.forEach(tone => {
			console.log(JSON.stringify(tone))
			tonesValues[tone['tone_id']] += tone['score']
		})
	})

	let numSentences = responseTones.length

	console.log(JSON.stringify(tonesValues))
	returnsObj = {}
	returnsObj['sadness'] = tonesValues['sadness'] / numSentences
	returnsObj['anger'] = tonesValues['anger'] / numSentences
	returnsObj['fear'] = tonesValues['fear'] / numSentences
	returnsObj['joy'] = tonesValues['joy'] / numSentences

	// Get the tone with the highest percentage
	highestTonePercentage = Math.max(returnsObj['sadness'], returnsObj['anger'], returnsObj['fear'], returnsObj['joy'])
	highestTone = null
	for (var emotion in returnsObj) {
		if (returnsObj[emotion] == highestTonePercentage) {
			console.log("The tone with the highest percentage is " + emotion)
			highestTone = emotion
			console.log()
		}
	}

	// Execute a function depending on the highest emotion percentage
	switch(highestTone) {
		case 'sadness':
			getSadActivities()
			break
		case 'anger':
			getAngerActivities()
			break
		case 'fear':
			getFearActivities()
			break
		case 'joy':
			getJoyActivities()
			break
		default:
			console.log("There was no highest tone percentage for some strange reason")
	}

	res.send(JSON.stringify(returnsObj))
}

app.post("/sentiment", (req, res) => {
	res.setHeader('Content-Type', 'text/json')
	
	let textBody = req.body.sentence

	if (log[textBody] !== undefined) {
		//console.log("Loading results from cache:", textBody, log[textBody])
		processRequest(log[textBody], res)
	} else {
		console.log("Received request for sentence: ", textBody)
		let options = {
			method: "POST",
			url: "https://gateway-wdc.watsonplatform.net/tone-analyzer/api/v3/tone",
			headers: {
				Authorization: authKey
			},
			qs: { 
				version: "2017-09-21" 
			},
			body: textBody
		}

		request(options, (err, respons, body) => {
			if (err) {
				throw new Error(err)
			}
			console.log(body)
			let responseObject = JSON.parse(body)

			logRequest(textBody, responseObject)

			processRequest(responseObject, res)
		})
	}
})

loadData(() => {
	let port = 8080
	app.listen(port)
	console.log("Server listening on port", port)
})
