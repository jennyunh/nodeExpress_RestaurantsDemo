const path = require("path");

//need for opening files, reading it, then updating
const fs = require('fs');

//express is a function
const express = require("express");

const app = express();

//middleware for serving static files: like js and css files linked to html files
//below sets up a request handler that will be executed on every incoming request
//static method takes a parameter: the name of the folder that has the static files
//static method checks if the static file exists in the folder and if it is, it will deliver it
app.use(express.static("public"));


//middleware for extracting data from incoming requests:
app.use(express.urlencoded({extended: false}))

app.get("/restaurants", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  res.sendFile(htmlFilePath);
});

app.get("/about", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "about.html");
  res.sendFile(htmlFilePath);
});

app.get("/confirm", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(htmlFilePath);
});

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});


//    /recommend
//http requests are handled from top to bottom. 
//You can have more than one method for a route as long as the methods are
//different (get vs post)
app.get("/recommend", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  res.sendFile(htmlFilePath);
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
