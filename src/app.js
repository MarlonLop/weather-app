const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//static dirextory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Marlon'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Marlon'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'Help page, good luck!',
        name: 'Marlon'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search location'
        });
    }

    res.send({
        forecast: 'Sunny',
        location: 'Aurora, CO',
        address: req.query.address
    });
});


app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: '404',
        msg: 'Help article not found',
        name: 'Marlon'
    })
});

app.get('*', (req, res) => {
    res.render('not-found', {
        title: '404',
        msg: 'Page not found',
        name: 'Marlon'
    })
});

app.listen(3000, () => {
    console.log('server up on port 3000');
});