const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://Laparv:${password}@cluster0.9c7yrtv.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const generateId = () => {
  const randomId = Math.floor(Math.random() *1000)
  return randomId
}


mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const note = new Person({
  id: generateId(),
  name: process.argv[3],
  number: process.argv[4],
})

if(process.argv.length>3)
{
  note.save().then(result => {
    console.log(`added ${note.name} number ${note.number} to phonebook`)
    mongoose.connection.close()
  })
}

else{
  mongoose.connect(url)

  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })

}