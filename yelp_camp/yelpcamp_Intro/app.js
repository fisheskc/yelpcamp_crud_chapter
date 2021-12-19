const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error"));
db.once("open", () => {
    console.log("Database connected");
})

// app.use(express.urlencoded({extended: true}));
const morgan = require('morgan');
const { Console } = require('console');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home')
})

// app.get('/campgrounds', async (req, res) => {
//     const campgrounds = await Campground.find({});
//     res.render('campgrounds/index')
// });

app.get('./campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    // Console.log(campgrounds)
    // campgrounds line 13
    // res.render('campgrounds/index', { campgrounds })
    res.render('campgrounds/index')
});

app.use(morgan('tiny'));


app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

// app.get('/campgrounds/:id', async (req, res) => {
//     res.render('campgrounds/show')
// })

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})

