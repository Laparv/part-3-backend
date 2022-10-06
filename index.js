const express = require('express')
const app = express()

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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})