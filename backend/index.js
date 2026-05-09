const express = require('express');

const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
    path: path.resolve(__dirname, 'config', '.env')
});

const app = express();

const PORT = process.env.PORT || 5000;

const connectDB = require(path.resolve(__dirname, 'config', 'db.js'));
connectDB();

//Middlewares
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev')); // for logging HTTP requests (dev -> development purpose only)
app.use(cors()); // cross-origin resource sharing
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes
const contactRoutes = require("./routes/Contact.Route.js");

// Using Routes
app.use("/api/contact", contactRoutes);

app.get('/', (req, res) => {
    return res.send('Hello World');
})

// CREATE SERVER
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})