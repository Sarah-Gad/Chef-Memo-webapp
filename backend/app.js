const express = require('express');
const connectToDb = require('./config/connectToDb');
require('dotenv').config();

connectToDb();
const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
