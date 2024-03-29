const express = require("express"); // Imports the Express.js framework, which is commonly used for building web applications and APIs in Node.js.
const swagger = require("./swagger");
const cloudinary = require("cloudinary").v2;
const colors = require("colors"); // Imports the colors module, which provides text coloring for the console output. It's used for adding color to console logs in this case.
require("dotenv").config(); // Imports and configures the dotenv module, allowing the application to read environment variables from a .env file.
let session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Imports the CORS (Cross-Origin Resource Sharing) middleware, which enables the server to handle cross-origin HTTP requests.
const connectDB = require("./database/config/db"); //Imports a function (connectDB) responsible for connecting to the database. It's in a separate file (db.js) located in the ./database/config/ directory.
const port = process.env.PORT || 5000; // Sets the port number for the server. It uses the value of the PORT environment variable if it exists; otherwise, it defaults to port 5000.

const app = express(); //Creates an instance of the Express application, providing a foundation for building a web server in Node.js.

connectDB(); //Calls the connectDB function to establish a connection to the database.

cloudinary.config({
  secure: true
});
console.log(cloudinary.config().cloud_name);

const corsOptions = {
  // origin: "http://localhost:3000",
  origin: "https://general-shop-shedev-frontend.vercel.app",
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"], // Agrega 'Authorization' a los encabezados permitidos
};
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors(corsOptions));
app.use("/", swagger);
app.use(express.json()); //Adds middleware to parse incoming JSON requests, enabling the server to handle data sent in the JSON format in the body of HTTP requests.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false })); //Adds middleware to parse incoming URL-encoded requests, facilitating the handling of data sent in the body of HTTP requests
app.use(
  session({
    secret: "SheDev2101200025021997",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());

const userRouter = require("./routes/userRoutes"); // Imports the userRoutes module, which contains route handlers for user-related operations.
const productRouter = require("./routes/productRoutes");

// app.use(cors()); //Adds CORS middleware to the Express app, enabling cross-origin resource sharing.
app.use(userRouter); //Tells the Express app to use the routes defined in userRouter.
app.use(productRouter);

app.listen(port, console.log(`Server working! Port: ${port}`)); //Starts the server, listening on the specified port. The callback function logs a message to the console indicating that the server is running, along with the port number.
