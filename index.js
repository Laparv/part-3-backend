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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})