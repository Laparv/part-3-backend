const { json } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('person', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))


let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "242-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "050555123123"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "882-21312"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (req,res) => {
    res.json(persons);
})

app.get('/info', (req,res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people<p>
            <p>${new Date()}<p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    person ? response.json(person) : response.status(404).end()

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const randomId = Math.floor(Math.random() *1000)
    console.log(`Random id is ${randomId}`)
    return randomId;
}

const checkName = (name1, name2) => {

}

app.post('/api/persons',(request, response) => {
    const body = request.body
    const checkName = persons.map(person => person.name)


    if(!body.name || !body.number) {
        return response.status(400).json({error: 'Name/number missing'})
    } 
    else if(checkName.includes(body.name)) {
        return response.status(400).json({error: 'name must be unique'})
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(persons)
})



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})