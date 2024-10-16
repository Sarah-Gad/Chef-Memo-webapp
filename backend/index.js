const express = require('express');
const connectToDb = require('./config/connectToDb');
const { errorHandler, notFound } = require('./middlewares/error');
const cors = require("cors");
require('dotenv').config();

connectToDb();
const app = express();
app.use(express.json());

app.use(cors({
  origin: "*"
}));

app.get('/', (req, res) => {
  res.send('Welcome to Chef Memo API');
});

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/recipes', require('./routes/recipeRoute'));
app.use('/api/comments', require('./routes/commentRoute'));
app.use('/api/categories', require('./routes/categoriesRoute'));
app.use("/api/password", require("./routes/passwordRoute"));

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
