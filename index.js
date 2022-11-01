const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')

const routerEmployee = require('./routes/employee')

const app = express();

app.use(express.json());
app.use(cors())


// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("open",function(){
    console.log("connected........")
})

app.use('/employee',routerEmployee)
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})