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

let getSad = () => {
	// funny YT video playlists, comfort food, sad music

	let sadResultsObject = {
		videos: sampleFromList(sadVideos),
		restaurants: [],
		music: sadMusicPlaylist
	}
}

let getHappy = () => {
	// amusement parks, restaurants (celebration), funny movies, meditation
}

let getAnger = () => {
	// gyms/spas/saunas, meditation, relaxing music
}

let getFear = () => {
	// meditation, fearless youtube videos, hype music
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
	for (var emotion in returnsObj) {
		if (returnsObj[emotion] == highestTonePercentage) {
			console.log("The tone with the highest percentage is " + emotion)
		}
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
