const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))

const party = [
  {id: 1, name: 'Mario'},
  {id: 2, name: 'Luigi'},
  {id: 3, name: 'Princess Peach'}
]

app.get('/party', (req, res) => {
  const partyArray = []
  party.forEach(el => {
    partyArray.push(el.name)
  })
  res.json(partyArray)

  // - respond with all the characters in the party as an array as json

})

app.get('/party/:id', (req, res) => {
  const id = Number(req.params.id)
  const result = party.find(el => {
    return el.id === id
  })
  if(result === undefined) return next({status: 404, message: 'did not find it'})
  res.json(result.name)
  // - respond with the specific character in the party that matches the id as json
})


app.get('/ping', (req, res) => {
  throw Error('!!!!!!!!!')
  res.json({message: 'pong!'})
})

app.get('/hello/friend', (req, res) =>{
  res.json({message: `Hi there friend!`})
})

app.get('/hello/:name', (req, res) =>{
  res.json({message: `Hello, ${req.params.name}`})
})

app.use((err, req, res, next) => {
  res.status(500).json({status: err.status, error: {message: 'Something went horribly wrong!'}})
  console.log(err);
})

app.use((req, res) =>{
  res.status(404).json({error: {message: 'Not found!'}})
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)
