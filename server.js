const express = require('express');
const {dbConnection} = require('./config/dbConfig');
const indexRouter = require('./routes/index');
require('dotenv').config();

const app = express();

// Connect to MongoDB
dbConnection();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
