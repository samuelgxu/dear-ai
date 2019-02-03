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

let cache = {
}

let userResults = []

saveData = () => {
	fs.writeFile('./data.json', JSON.stringify(cache), (err) => {
		if (err) {
			console.error("Failed to save cache")
		}
	})
	fs.writeFile('./userResults.json', JSON.stringify(userResults), (err) => {
		if (err) {
			console.error("Failed to save log")
		}
	})
}

loadData = (callback) => {
	try {
		cache = JSON.parse(fs.readFileSync('./data.json', 'utf8'))
		userResults = JSON.parse(fs.readFileSync('./userResults.json', 'utf8'))
	} catch (e) {
		let cache = {}
		let userResults = []
	}
	callback()
}

let cacheRequest = (message, response) => {
	cache[message] = response
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


app.get("/activities/:emotion", (req, res) => {
	let emotion = req.params.emotion
	console.log("Got request for emotion", emotion)
	res.setHeader('Content-Type', 'text/json')
	if (emotion === "joy") {
		getJoyActivities(res)
	} else if (emotion === "sadness") {
		getSadActivities(res)
	} else if (emotion === "anger") {
		getAngerActivities(res)
	} else if (emotion === "fear") {
		getFearActivities(res)
	}
})

let getFromJson = (filename) => {
	return []
	//var results = require(filename)
	//return results
}

let getSadActivities = (res) => {
	// funny YT video playlists, comfort food, sad music

	let resultsObject = {
		tabs: ["Funny Videos", "Comfort Food", "Meditation"],
		data: [
			getFromJson("./sadFunnyVideos.json"),
			[],
			getFromJson("./sadMeditationVideos.json")
		]
		//music: sadMusicPlaylist
	}

	// Get list of comfort food locations from Yelp
	getLocationFromYelp('comfort food', (info) => {
		let businesses = JSON.parse(info).businesses.slice(0, 6)
		console.log(businesses)
		resultsObject.data[1] = businesses
		res.send(JSON.stringify(resultsObject))
	})
}

let getAngerActivities = (res) => {
	let resultsObject = {
		tabs: ["Get your workout on!", "Meditation", "Relaxing Music"],
		data: [
			[],
			getFromJson("./angerMeditationVideos.json"),
			[]
		]
	}
	getLocationFromYelp('spas', (info) => {
		let businesses = JSON.parse(info).businesses.slice(0, 6)
		console.log(businesses)
		resultsObject.data[0] = businesses	
		res.send(JSON.stringify(resultsObject))
	})
	// gyms/spas/saunas, meditation, relaxing music
}

let getFearActivities = (res) => {
	let resultsObject = {
		tabs: ["Meditation", "Watch fearless people on Youtube", "Hype Music"],
		data: [
			getFromJson("./fearMeditationVideos.json"),
			getFromJson("./fearHypeVideos.json"),
			getFromJson("./sadMeditationVideos.json")
		]//music: sadMusicPlaylist
	}
	res.send(resultsObject)
	// meditation, fearless youtube videos, hype music
}

let getJoyActivities = (res) => {
	let resultsObject = {
		tabs: ["Amusement Parks", "Restaurants", "Funny Movies"],
		data: [
			[],
			[],
			getFromJson("./joyMeditationVideos.json")
		]//music: sadMusicPlaylist
	}
	
	// Get list of comfort food locations from Yelp
	getLocationFromYelp('amusement parks', (info) => {
		let businesses = JSON.parse(info).businesses.slice(0, 6)
		console.log(businesses)
		resultsObject.data[0] = businesses		
		// Get list of comfort food locations from Yelp
		getLocationFromYelp('restaurants', (info) => {
			let businesses = JSON.parse(info).businesses.slice(0, 6)
			console.log(businesses)
			resultsObject.data[1] = businesses
			res.send(JSON.stringify(resultsObject))
		})
	})
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
		callback(body)
	})
}

// takes in a message and saves date and returned response (like happiness, sadness)
let saveResults = (message, returnedEmotion) => {
 	userResults.push({
 		date: new Date().toString(),
 		message: message,
 		response: returnedEmotion
 	})

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
	
	if (responseObject['sentences_tone'] == undefined) {
        responseTones = responseObject['document_tone'].tones
        responseTones.forEach(tone => {
            tonesValues[tone['tone_id']] += tone['score']
        })
    } else {
        responseTones = responseObject['sentences_tone']

        console.log("RESPONSE TONES", responseTones)

        responseTones.forEach(tonesObj => {
            tonesObj.tones.forEach(tone => {
                console.log(JSON.stringify(tone))
                tonesValues[tone['tone_id']] += tone['score']
            })
        })
    }
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

	if (highestTonePercentage !== 0) {
		for (var emotion in returnsObj) {
			if (returnsObj[emotion] == highestTonePercentage) {
				console.log("The tone with the highest percentage is " + emotion)
				highestTone = emotion
				console.log()
			}
		}
	} else {
		highestTone = "joy"
	}

	// Execute a function depending on the highest emotion percentage
	res.send({emotion: highestTone})
}

let sampleData = [
  {
    date: "1/23/2019",
    message: "Felt great today. 10/10",
    response: "joy"
  },
  {
    date: "1/28/2019",
    message: "Did not feel so good today",
    response: "sadness"
  },
  {
    date: "2/1/2019",
    message: "Hate my car because it's too slow.",
    response: "anger"
  },
  {
    date: "2/2/2019",
    message: "Went to PennApps today. Was happy to start!",
    response: "joy"
  },
  {
    date: "2/3/2019",
    message: "Have to present tomorrow. Very scared of how it's going to go...",
    response: "fear"
  },
  {
    date: "2/4/2019",
    message: "Happy that we did very well for our presentation at PennApps!",
    response: "joy"
  }
]

app.get("/log", (req, res) => {
	res.setHeader('Content-Type', 'text/json')
	res.send(JSON.stringify(sampleData))
})

app.post("/sentiment", (req, res) => {
	res.setHeader('Content-Type', 'text/json')
	
	let textBody = req.body.sentence

	if (cache[textBody] !== undefined) {
		console.log("Loading results from cache:", textBody, cache[textBody])
		processRequest(cache[textBody], res)
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

			cacheRequest(textBody, responseObject)

			processRequest(responseObject, res)
		})
	}
})


loadData(() => {
	let port = 8080
	app.listen(port)
	console.log("Server listening on port", port)
})
