const express = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.method)
    console.log(req.path)
    console.log(req.body)
    console.log("----------")
    next()
})

let notas = [
    {
        "id": 1,
        "content": "Suscribir a @midu",
        "date": "2019-05-30T17:30:31.098Z",
        "important": true,
    },
    {
        "id": 2,
        "content": "Estudiar Bootcamp",
        "date": "2019-05-30T18:39:34.091Z",
        "important": false
    },
    {
        "id": 3,
        "content": "Repasar JS",
        "date": "2019-05-30T19:20:14.298Z",
        "important": true
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hola</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notas)
})

app.get('/api/notes/:id', (req, res) => {
   const id = Number(req.params.id)
   const note = notas.find(note => note.id === id)
   
   if (note) {
       res.json(note)
   } else {
       res.status(404).end()
   }

})

app.post(`/api/notes`, (req, res) => {
    const note = req.body

    if (!note || !note.content) {
        return res.status(400).json({
            "error": "note.content is missing"
        })
    }

    const ids = notas.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        "id": maxId + 1,
        "content": note.content,
        "important": typeof note.important ==! 'undefined' ? note.important : false,
        "date": new Date().toISOString()
    }

    notas = [...notas, newNote]

    res.status(201).json(note)
})

app.delete(`/api/notes/:id`, (req, res) => {
    const id = Number(req.params.id)
    const notes = notas.filter(notes => notes.id ==! id)
    res.status(204).end()
})

app.use((req, res) => {
    res.status(404).json({
        "error": "Not Found"
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log( `SERVER ON PORT: ${PORT}`)       
})