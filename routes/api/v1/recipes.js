// You will need to create the following routes in the routes/api/v1/recipes.js file (you will need to create the file and the directories)

const path = require('path')
const router = require('express').Router()

// load JSON file for recipes
const recipes = require('../../../data/recipes.json')

//'..' = go up a directory into root and then access public 
const root = path.join(__dirname, '..', '..', 'public')


// #1. The GET /api/v1/ route should return an array of objects with the following properties: id, title, image, prepTime, and difficulty. Do not include the ingredients or instructions properties. (Use the map method?)
router.get('/', (request, response) => {
    const allRecipes = recipes.map(({ id, title, image, prepTime, difficulty }) => ({ id, title, image, prepTime, difficulty }))
    response.json(allRecipes)
})

// #2 The POST /api/v1/recipe/add route should add a new recipe to the recipes array. The route should return the added recipe object.
router.post('/recipe/add', (request, response) => {
    const newRecipe = request.body
    // The id property of the recipe object should be unique. When adding a new recipe, you should generate a unique id for the recipe by adding 1 to the length of the recipes array. 
    newRecipe.id = recipes.length + 1
    // use push to add the new recipe to the recipes array (line 7)
    // this is just saved for the session so click again if ending/restarting session* 
    recipes.push(newRecipe) 
    // return the added recipe
    response.json(newRecipe)
})


// #3. The GET /api/v1/recipe/:id route should return the full recipe object for the recipe with the specified id. If the recipe is not found. Don't worry about error handling for this route. (Use the find method.)
router.get('/recipe/:id', (request, response) => {
    // Remember that request.params.id will be a string! So you will either need to call "toString()" on the recipe id or convert the parameter to a number using "parseInt()".  
    const recipeId = parseInt(request.params.id) 
    const found = recipes.find( foundRecipe => foundRecipe.id === recipeId )
    response.json(found)
})


// export router to get router object with all endpoints attached to it back into the app.js
module.exports = router