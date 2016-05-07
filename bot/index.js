import alexa from 'alexa-app'
import express from 'express'
import bodyParser from 'body-parser'


// express app
let app = express()
const PORT = process.env.port || 8080
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

// alexa app
const alexaApp = new alexa.app('black_market')

alexaApp.intent('buy', {
  slots: { "NAME": "LITERAL" },
  utterances: [
    "I need {guns|drugs|blood|homeless people|NAME}",
    "{guns|drugs|blood|homeless people|NAME}"
  ],
}, (request, response) => {
  response.say(`what type of ${request.slot('NAME')} do you want?`)
  response.shouldEndSession(false)
})

alexaApp.intent('specify', {
  slots: { "TYPE": "LITERAL" },
  utterances: ["{I'll take|maybe|} {one dropped off by aliens|TYPE}"]
}, (request, response) => {
  response.say('Okay I\'ve found one that has been dropped off by aliens recently. Your shipment should arrive in approximately 2 days. Have a nice day!')
})

alexaApp.launch((request, response) => {
  response.say('welcome to the black market! right now we have guns, drugs, blood, and homeless people. Which are you interested in?')
  response.shouldEndSession(false)
})

// start app

alexaApp.express(app, '/echo/')

app.post('/echo/sample', ({ body }, res) => {
  alexaApp
    .request(body)
    .then((response) => res.json(response))
})

app.listen(PORT, () => console.log('started :)'))
