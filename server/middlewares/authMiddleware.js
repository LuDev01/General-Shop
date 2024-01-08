const authMiddleware = {
    isLogged: async (req, res, next) => {
        if (true) { // Validar con express session si el usuario esta logeado, o mirar que otras alternativas hay para validar si un usaurio esta logeado
           
            next()
        } else {
            res.status(400).json({ message: "User not logged" });
        }
    }
}

module.exports = authMiddleware