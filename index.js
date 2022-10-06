const express = require('express')
const app = express()

app.use(express.json())

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

app.post('/api/persons',(request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({error: 'Name/number missing'})
    }
    else if(persons.map(person => person.name === body.name)) {
        return response.status(409).json({error: 'name must be unique'})
    }
    else{

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    console.log(person)
    response.json(persons)}

})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})