const express=require('express'); // Imports the Express.js framework, which is commonly used for building web applications and APIs in Node.js.
const cors=require('cors'); // Imports the CORS (Cross-Origin Resource Sharing) middleware, which enables the server to handle cross-origin HTTP requests.
require('dotenv').config(); // Imports and configures the dotenv module, allowing the application to read environment variables from a .env file.

const colors=require('colors'); // Imports the colors module, which provides text coloring for the console output. It's used for adding color to console logs in this case.
const port=process.env.PORT || 5000; // Sets the port number for the server. It uses the value of the PORT environment variable if it exists; otherwise, it defaults to port 5000.
const userRouter=require('./routes/userRoutes'); // Imports the userRoutes module, which contains route handlers for user-related operations.

const bodyParser=require('body-parser');
const cookieParser=require ('cookie-parser');
const session=require('express-session');
const morgan=require('morgan');

const connectDB=require('./database/config/db'); //Imports a function (connectDB) responsible for connecting to the database. It's in a separate file (db.js) located in the ./database/config/ directory.
const app=express(); //Creates an instance of the Express application, providing a foundation for building a web server in Node.js.

const User=require('./database/models/Users'); 

connectDB(); //Calls the connectDB function to establish a connection to the database.

app.use(express.urlencoded({extended:false})); //Adds middleware to parse incoming URL-encoded requests, facilitating the handling of data sent in the body of HTTP requests
app.use(express.json()); //Adds middleware to parse incoming JSON requests, enabling the server to handle data sent in the JSON format in the body of HTTP requests.
app.use(cors()); //Adds CORS middleware to the Express app, enabling cross-origin resource sharing.
app.use(userRouter); //Tells the Express app to use the routes defined in userRouter.

app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());

app.use(session({
    key:'user_sid',
    secret:'Secret information!!',
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:600000// information stored for six days
    }

}));

app.use((req,res,next)=>{
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/')
    }
    next()
})

var sessionChecker=(req,res,next)=>{
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/')
    }
    else{
        next()
    }
};

app.get('/',sessionChecker,(req,res)=>{
    res.redirect('/login')
});

app.route('/login')
.get(sessionChecker,(req,res)=>{
    res.sendFile(__dirname+'src/pages/LogIn.jsx')
});

app.route('/register')
.get(sessionChecker,(req,res)=>{
    res.sendFile(__dirname+'src/pages/Register.jsx')
})
.post((req,res)=>{
    var user=new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,     
        email:req.body.email,
        password:req.body.password
    })

    user.save((err,docs)=>{
        if(err){
            res.redirect('/register')
        }
        else{
            console.log(docs)
            req.session.user=docs
            res.redirect('/')
        }
    })
})


app.listen(port,console.log(`Server working! Port: ${port}`)) //Starts the server, listening on the specified port. The callback function logs a message to the console indicating that the server is running, along with the port number.


