const express = require('express');
const connectToDb = require('./config/connectToDb');
require('dotenv').config();

connectToDb();
const app = express();
app.use(express.json());
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/recipes', require('./routes/recipeRoute'));
app.use('/api/comments', require('./routes/commentRoute'));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
