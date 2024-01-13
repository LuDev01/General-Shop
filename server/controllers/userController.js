const User = require("../database/models/Users"); // Imports the User model from the specified path.
const bcrypt = require("bcrypt"); //Imports the bcrypt library, commonly used for hashing passwords.
const Jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { log, error } = require("console");
const { Result } = require("express-validator");
const cloudinary = require("cloudinary").v2;

const controllers = {
  //Defines an object named controllers that holds various controller functions for handling different aspects of user-related operations.
  createUser: async (req, res) => {
    // Defines an asynchronous function createUser to handle the creation of a new user. It takes req (request) and res (response) as parameters.
    try {
      const { email } = req.body;

      const existingUser = await User.findOne({ email }); // Check if the email already exists in the database

      if (existingUser) {
        res.status(400).json({ error: "Email is already in use" }); // If the email is already in use, send a response to the client
        return; // Stop the creation process
      }

      const isSuperAdmin = req.headers["x-superadmin"] === "true";
      const newUser = await User.create({ ...req.body }); //Creates a new user using the User.create method, which is likely a Mongoose method for adding a new document to the "Users" collection.
     
      if (isSuperAdmin) {
        newUser.userRole.push("Admin");
      }

      await new User(newUser).save();

      res.json({ status: "201", user: newUser }); //Sends a JSON response indicating success (status 200) and includes the newly created user in the response.
    } catch (error) {
      //Catches any errors that may occur during user creation and sends a JSON response with an error message.
      console.log(error);
      res.json({ error: "Error creating the user" });
    }
  },

updateUser: async (req,res)=>{
  try {
    // const { id, newRole } = req.body;
    const { id } = req.params;
    const { userRole } = req.body;

    const user = await User.findById(id);

    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    user.userRole = userRole;
    const updatedUser = await user.save();

    if (updatedUser) {
      res.status(200).json({ message: "Updated Successfully", user: updatedUser });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "Error modifying the user's role" });
  }
},

editUserInfo:async(req,res)=>{
  try {
    const userInfo=await User.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
    );
    if(userInfo){
      res.status(200).json({ message: "Updated Successfully" });
    }
  } catch (error) {
    res.json({ message: `Error updating user ${error}` });
  }
},

  getUserByPk: async (req, res) => {
    //  Defines an asynchronous function getUserByPk to handle fetching a user by their primary key (ID). It takes req (request) and res (response) as parameters.
    const id = req.params.id; //  Find the user ID from the request parameters.
    try {
      const user = await User.findById(id); // Uses User.findById to find a user by their ID.
      res.json({ user }); //Sends a JSON response containing the found user.
    } catch (error) {
      // Catches any errors that may occur during the user finding process and sends a JSON response with an error message.
      res.json({ error: "Error showing the user" });
    }
  },

  processLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      const bytes = CryptoJS.AES.decrypt(password, "secret key 123");
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      const bytesDB = CryptoJS.AES.decrypt(user.password, "secret key 123");
      const decryptedPasswordDB = bytesDB.toString(CryptoJS.enc.Utf8);
      if (decryptedPassword !== decryptedPasswordDB)
        return res.status(401).json({ message: "Credenciales inválidas" });
      const isMatch = decryptedPasswordDB === decryptedPassword ? true : false;

      if (!isMatch) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
      const token = Jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '24h',
      });

      // req.session = {};
      if (isMatch) {
        res
          .status(200)
          .json({ token, exp, role: user.userRole, message: "Welcome!" });
      }
    } catch (error) {
      console.log(error);
      // res.json(false);
      res.status(500).json({ message: "Error en el servidor" });
    }
  },
};

module.exports = controllers; // Exports the controllers object, making the user-related controller functions available for use in other parts of the application.
