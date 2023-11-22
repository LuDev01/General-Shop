const User = require("../database/models/Users"); // Imports the User model from the specified path.
const bcrypt = require("bcrypt"); //Imports the bcrypt library, commonly used for hashing passwords.
const Jwt = require("jsonwebtoken");
const CryptoJS=require("crypto-js")
const { log } = require("console");

const controllers = {
  //Defines an object named controllers that holds various controller functions for handling different aspects of user-related operations.
  createUser: async (req, res) => {
    // Defines an asynchronous function createUser to handle the creation of a new user. It takes req (request) and res (response) as parameters.
    console.log(req.body);
    try {
      const { email } = req.body;
      const existingUser = await User.findOne({ email }); // Check if the email already exists in the database

      if (existingUser) {
        res.status(400).json({ error: "Email is already in use" }); // If the email is already in use, send a response to the client
        return; // Stop the creation process
      }

      // const password = bcrypt.hashSync(req.body.password, 12); //Hashes the user's password using bcrypt.hashSync with a salt factor of 12.
      // delete req.body.password;
      // req.body.password = password;

      // const confirmPassword = bcrypt.hashSync(req.body.confirmPassword, 12);
      // delete req.body.confirmPassword;
      // req.body.confirmPassword = confirmPassword;

      console.log(req.body);

      const newUser = await User.create({ ...req.body }); //Creates a new user using the User.create method, which is likely a Mongoose method for adding a new document to the "Users" collection.

      res.json({ status: "201", user: newUser }); //Sends a JSON response indicating success (status 200) and includes the newly created user in the response.
    } catch (error) {
      //Catches any errors that may occur during user creation and sends a JSON response with an error message.
      console.log(error);
      res.json({ error: "Error creating the user" });
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
      // const user = await User.findOne({ email: req.body.email });

      // var bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key@123');
      // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));


      const user = await User.findOne({ email });

      console.log("Aqui estoy");
      if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      // const bytes = CryptoJS.AES.decrypt(password, 'my-secret-key@123');
      // const decryptedPassword=bytes.toString(CryptoJS.enc.Utf8);

      // console.log("Decrypted password:", decryptedPassword);


      console.log("Original Password :", password);
      console.log("Hashed Password: ", user.password);

      const isMatch = await bcrypt.compare(password, user.password);
      // const isMatch = await bcrypt.compare(decryptedPassword, user.password);

      console.log("Do they match?:", isMatch);

      // const isPasswordValid = await bcrypt.compare(hashedPassword, user.password);

      console.log(
        "----------------------------------------------------------------------"
      );

      if (!isMatch) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      const token = Jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(200).json({ token, message: "Welcome!" });

      // if (!isPasswordValid) {
      //   return res.status(401).json({ message: "Credenciales inválidas" });
      // }

      // const token = Jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      //   expiresIn: "1h",
      // });
      // res.status(200).json({ token, message: "Inicio de sesión exitoso" });

      // const { password: hashedPassword } = user;
      // const isCorrect = bcrypt.compareSync(req.body.password, hashedPassword);

      // if (isCorrect) {

      // res.cookie("email", user.email, { maxAge: 1000 * 60 * 60 * 24 * 360 });
      // delete user.password;

      //   if (!req.session) {
      //     req.session = {};
      //   }
      //   req.session.user = user;
      //   console.log(req.session.user);

      //   res.json({ message: "Welcome!" });

      // }
    } catch (error) {
      console.log(error);
      // res.json(false);
      res.status(500).json({ message: "Error en el servidor" });
    }
  },
};

module.exports = controllers; // Exports the controllers object, making the user-related controller functions available for use in other parts of the application.
