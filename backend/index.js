var app = require('express')()
var cors = require('cors')
var bodyParser = require('body-parser')
var request = require("request");
var fs = require('fs')
var authKey = require('./authorization_key.json').key

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
