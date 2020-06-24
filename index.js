const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    //aqui insertamos solo una receta a la base de datos
    Recipe
      .create({
        title: "Patatas Fritas",
        level: "Easy Peasy",
        ingredients: ['patatas', 'aceite', 'sal y pimienta'],
        dishType: 'breakfast',
        image: 'alguna imagen',
        duration: 3,
        creator: 'andres',
      })
      .then(newRecipe => console.log('la nueva receta es ', newRecipe.title))
      .then(() => Recipe.create(data))
      .then(newrigatoni => {

       // console.log(newrigatoni)
       return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      })
      .then(() => Recipe.findOneAndRemove({ title: 'Carrot Cake' }))
      .then(RecipeDeleted => console.log(RecipeDeleted))
      .then(()=> mongoose.connection.close())
    
      .catch(err => console.error("!!!!!Hubo un error!", err))
      
      
      


  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
