const User=require('../database/models/Users') // Imports the User model from the specified path. 
const bcrypt=require('bcrypt') //Imports the bcrypt library, commonly used for hashing passwords.

const controllers={  //Defines an object named controllers that holds various controller functions for handling different aspects of user-related operations.
    createUser: async(req,res)=>{ // Defines an asynchronous function createUser to handle the creation of a new user. It takes req (request) and res (response) as parameters.
        console.log(req.body)
        try {
            const password=bcrypt.hashSync(req.body.password,12); //Hashes the user's password using bcrypt.hashSync with a salt factor of 12.
            delete req.body.password;
            req.body.password=password;
            const newUser=await User.create({ ...req.body}); //Creates a new user using the User.create method, which is likely a Mongoose method for adding a new document to the "Users" collection.
            res.json({status:'200', user:newUser}) //Sends a JSON response indicating success (status 200) and includes the newly created user in the response.
        } catch (error) { //Catches any errors that may occur during user creation and sends a JSON response with an error message.
            res.json({error:'Error al crear el usuario'}) 
        }
    },
    getUserByPk:async(req,res)=>{ //  Defines an asynchronous function getUserByPk to handle fetching a user by their primary key (ID). It takes req (request) and res (response) as parameters.
        const id=req.params.id; //  Find the user ID from the request parameters.
        try {
            const user=await User.findById(id); // Uses User.findById to find a user by their ID.
            res.json({user}) //Sends a JSON response containing the found user.
        } catch (error) { // Catches any errors that may occur during the user finding process and sends a JSON response with an error message.
            res.json({error:'Error al mostrar los  usuarios'}) 
        }
    },

    processLogin:async(req,res)=>{
     try {
        const user=await User.findOne({email:req.body.email})
   
        const {password:hashedPassword}=user;
        const isCorrect=bcrypt.compareSync(req.body.password,hashedPassword)
        if(isCorrect){
            res.cookie('email',user.email,{maxAge:1000*60*60*24*360});
            delete user.password;
            if (!req.session) {
                req.session = {};
              }
            req.session.user=user;
            console.log(req.session.user);  
        
            res.json({message:'Éxito!'})
        }
     } catch (error) {
        console.log(error);
        res.json(false)

     }
    }

}

module.exports=controllers; // Exports the controllers object, making the user-related controller functions available for use in other parts of the application.