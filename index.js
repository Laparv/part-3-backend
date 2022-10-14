require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { response } = require('express')


const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('person', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
  
    next(error)
  }



app.get('/api/persons', (req,res, next) => {
    Person.find({}).then(contact => {
        res.json(contact);
    }).catch(error => next(error))

})

app.get('/info', (req,res) => {

    Person.find({}).then(contact => {
        res.send(`<p>Phonebook has info for ${contact.length} people<p>
        <p>${new Date()}<p>`)
    })



})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(contact => {
                response.json(contact)
        }).catch(error => next(error))
        
    //const person = persons.find(person => person.id === id)

    //person ? response.json(person) : response.status(404).end()

})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        }).catch(error => next(error))

})



app.post('/api/persons',(request, response, next) => {
    console.log(request.body)
    const body = request.body
    //const checkName = persons.map(person => person.name)

    if(!body.name || !body.number) {
        next(error)
    } 
    /*else if(checkName.includes(body.name)) {
        next(error)
    }*/

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body


    Person.findByIdAndUpdate(request.params.id, 
        {name, number},
         {new: true, runValidators: true, context: 'query'})
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


