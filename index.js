const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const carrotSoup = 
  {
    "title": "Carrot soup",
    "level": "Amateur Chef",
    "ingredients": [
      "6 cups grated carrots",
      "1 cup brown sugar",
  
    ],
    "cuisine": "International",
    "dishType": "dessert",
    "image": "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
    "duration": 130,
    "creator": "Chef Nadia"
  };

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
   .then(() => {
  return Recipe.create(carrotSoup)
    .then((results) => console.log(`Saved recipe: ${results.title}`))
  })
  .then(() => {
  return Recipe.insertMany(data)
  })
  .then((data)=>{
   return data.forEach((recipesTitles) => console.log("all Titles from Recipes", recipesTitles.title))
  }) 
  .then(() => {
  console.log("successfully updated")
  return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration : 100})
  })
  .then(()=> {
    console.log("Successfully deleted")
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(()=>{
    mongoose.connection.close(() => {   //Closing conection with database
      console.log(`Mongo connection disconnected`);
      process.exit(0);
    }); 
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
