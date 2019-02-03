var app = require('express')()
var cors = require('cors')
var bodyParser = require('body-parser')
var request = require("request");
var authKey = require('./authorization_key.json').key

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.post("/sentiment", (req, res) => {
	res.setHeader('Content-Type', 'text/json')
	
	let textBody = req.body.sentence
	console.log("Received request for sentence: ", textBody)
	let options = {
		method: "POST",
		url: "https://gateway-wdc.watsonplatform.net/tone-analyzer/api/v3/tone",
		headers: {
			Authorization: authKey		},
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
		res.send(body)
	})
})

app.listen(8080)
console.log("Server listening on port 8080")
