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

app.post("/sentiment", (req, res) => {
	res.setHeader('Content-Type', 'text/json')
	
	let textBody = req.body.sentence

	if (log[textBody] !== undefined) {
		console.log("Loading results from cache:", textBody, log[textBody])
		res.send(log[textBody])
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
			let responseTones = responseObject['document_tone']['tones']

			tonesObj = {
				"sadness": 0,
				"anger": 0,
				"fear": 0,
				"joy": 0,
				"analytical": 0,
				"confident": 0,
				"tentative": 0
			}

			responseTones.forEach(toneObj => {
				tonesObj[toneObj['tone_id']] = toneObj['score']
			})

			logRequest(textBody, tonesObj)
			res.send(JSON.stringify(tonesObj))
		})
	}
})

app.post("/suggestions", (req, res) => {
	res.setHeader('Content-Type', 'text/json')

	let textBody = req.body


})

loadData(() => {
	let port = 8080
	app.listen(port)
	console.log("Server listening on port", port)
})
