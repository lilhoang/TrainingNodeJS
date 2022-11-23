const express = require('express')
const bodyParser = require('body-parser')
const expressHandlebars = require('express-handlebars')
const { Session } = require('inspector')
const session = require("express-session")
const app = express()
const port = process.env.PORT || 3000

const urlencodedParser = bodyParser.urlencoded({ extended: false})

app.engine('hbs', expressHandlebars.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({resave: false, saveUninitialized: false, secret: 'key'}));

app.get('/', (req,res) =>{
    res.render('home', {session: req.session.username ?? ''})
})

app.get('/register', (req,res) =>{
    res.render('register');
})

app.post('/register', urlencodedParser, (req,res) =>{
    console.log('Got body:', req.body)
    req.session.username = req.body.name
    res.redirect(303,'/')
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}`
))