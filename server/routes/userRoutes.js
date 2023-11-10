const express=require('express');  //: Imports the Express.js framework.
const router=express.Router(); // Creates an instance of an Express router, which is a mini-app that can handle routes
const userController=require('../controllers/userController'); //Imports the userController module that likely contains functions to handle user-related operations.

// @POST // register
router.post('/register', userController.createUser); //Defines a POST route at /register that, when accessed, calls the createUser function from the userController.

// @GET//user/:id
router.get('/user/:id',userController.getUserByPk); //Defines a GET route at /user/:id that, when accessed, calls the getUserByPk function from the userController.

//@POST //login
router.post('/login',userController.processLogin);


module.exports=router; //Exports the configured router for use in other parts of the application.