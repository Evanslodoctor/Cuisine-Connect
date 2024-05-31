const express = require('express');
const app = express();
const db = require('./models'); // Import your Sequelize models
const usersRouter = require('./routes/users'); // Import the user router
const recipesRouter = require('./routes/recipes'); // Import the recipe router
const favoritesRouter = require('./routes/favorites'); // Import the favorite router
const commentsRouter = require('./routes/comments'); // Import the comment router
const loginRoute = require('./routes/login');
const recipeImageRoutes = require('./routes/recipeImageRoutes');
const cors = require('cors');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/users', usersRouter); // Mount the user router under '/api/users'
app.use('/api/recipes', recipesRouter); // Mount the recipe router under '/api/recipes'
app.use('/api/favorites', favoritesRouter); // Mount the favorite router under '/api/favorites'
app.use('/api/comments', commentsRouter); // Mount the comment router under '/api/comments'
app.use('/api/login', loginRoute);
app.use('/api/recipes/upload-image', recipeImageRoutes);
// Routes


// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    // Apply migrations on server start
    await db.sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
});
