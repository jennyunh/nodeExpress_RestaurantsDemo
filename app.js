const path = require('path');

//express is a function
const express = require('express');


const app = express();

//middleware for serving static files: like js and css files linked to html files
//below sets up a request handler that will be executed on every incoming request
//static method takes a parameter: the name of the folder that has the static files
//static method checks if the static file exists in the folder and if it is, it will deliver it
app.use(express.static('public'))

app.get('/restaurants', function (req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
    res.sendFile(htmlFilePath)
    });

    app.get('/about', function (req, res) {
        const htmlFilePath = path.join(__dirname, 'views', 'about.html');
        res.sendFile(htmlFilePath)
        });

        app.get('/confirm', function (req, res) {
            const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
            res.sendFile(htmlFilePath)
            });

            app.get('/', function (req, res) {
                const htmlFilePath = path.join(__dirname, 'views', 'index.html');
                res.sendFile(htmlFilePath)
                });

                app.get('/recommend', function (req, res) {
                    const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
                    res.sendFile(htmlFilePath)
                    });


app.listen(3000);
