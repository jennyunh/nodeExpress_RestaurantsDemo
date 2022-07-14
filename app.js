const path = require("path");

//need for opening files, reading it, then updating
const fs = require('fs');

//express is a function
const express = require("express");

const app = express();

//tells express where the template files 
//we want to process with ejs engine are located
//'views' must be used (reserved on express)
//2nd parameter is the path to the folder that contains the template files
app.set('views', path.join(__dirname, 'views'))

//to use templates, download ejs engine.
//rename all html template files from .html to .ejs
//view engine: use a special engine (template engine) for processing our view files
//pass name of engine to use: ejs
app.set('view engine', 'ejs')


//middleware for serving static files: like js and css files linked to html files
//below sets up a request handler that will be executed on every incoming request
//static method takes a parameter: the name of the folder that has the static files
//static method checks if the static file exists in the folder and if it is, it will deliver it
app.use(express.static("public"));


//middleware for extracting data from incoming requests:
app.use(express.urlencoded({extended: false}))

app.get("/restaurants", function (req, res) {

    const filePath = path.join(__dirname, 'data', 'restaurants.json')

    //file data is in text format
    const fileData = fs.readFileSync(filePath);
    
    //convert file data to js format
    const storedRestaurants = JSON.parse(fileData)


    //2nd parameter for render is optional:
    //pass in an object that refers to any variables used in the template
    res.render('restaurants', { numberOfRestaurants: storedRestaurants.length } )

});

app.get("/about", function (req, res) {
    res.render('about')
});

app.get("/confirm", function (req, res) {
    res.render('confirm')
});

app.get("/", function (req, res) {

    //render is a method on response object that renders the html template
    //that the ejs engine returns after it has processed the ejs file.
    //res.render takes the name of the ejs file 
    //(in this case, index.ejs), but render knows that it should look for .ejs
    //because the engine is ejs
    res.render('index')

});


//    /recommend
//http requests are handled from top to bottom. 
//You can have more than one method for a route as long as the methods are
//different (get vs post)
app.get("/recommend", function (req, res) {
    res.render('recommend')
});

//extract form data, store it in a constant.
//push data onto restaurants.json file
app.post('/recommend', function (req, res) {
const restaurant = req.body;
const filePath = path.join(__dirname, 'data', 'restaurants.json')

//file data is in text format
const fileData = fs.readFileSync(filePath);

//convert file data to js format
const storedRestaurants = JSON.parse(fileData)

//push the submitted restaurant onto the array
storedRestaurants.push(restaurant);

//now update the file with the new array of restaurants
//convert from js format to text format:

fs.writeFileSync(filePath, JSON.stringify(storedRestaurants))

//redirect user as a response
res.redirect('/confirm')

})

app.listen(3000);
