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
const eventRoutes = require("./routes/Event.Route.js");
const galleryRoutes = require("./routes/Gallery.Route.js");
const noticeRoutes = require("./routes/Notice.Route.js");
const teacherRoutes = require("./routes/Teacher.Route.js");
const authRoutes = require("./routes/Auth.Route.js");

// Using Routes
app.use("/api/contact", contactRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
    return res.send('Hello World');
})

// CREATE SERVER
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})