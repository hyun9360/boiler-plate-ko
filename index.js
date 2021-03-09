const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hyun:qwe1asd@boilerplate.yl0ea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))



app.get('/', (req, res) => {
    res.send('Hello World! 안녕하세요')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})