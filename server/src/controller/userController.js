const bcrypt = require('bcryptjs'); // used to hash/encrypt the password
const prisma = require('../prisma')
const jwt = require('jsonwebtoken');

const authController = { // user Authentication Controller 
  signup: async (req, res) => {  
    console.log(req.body);
    try {
      const { email, password ,type} = req.body;
      const hashed_password = bcrypt.hashSync(password, 10);
      const user = await prisma.user.create({
        data: {
          email: email,
          type: type,
          password: hashed_password,
        }
      })
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ "error": error })
      console.log(error);
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password } = req.body
      // console.log(req.body);
      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      })
      console.log(user);
      if (!user) return res.status(401).json({ "error": "No user with this email" })
      if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ "error": "Incorrect Password" });


      const payload = {
        email: email,
        id: user.id,
        type:user.type
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

      res.status(201).json({ "Message": "User Loged in Succesfully!!", user, "token": "Bearer " + token });
    } catch (error) {
      res.status(500).json({ "error": error });
    }
  },
  getUser: async(req,res) => {
    try {
      const {id} = req.params;
      const user = await prisma.user.findUnique({
        where: {
          id: id
        }
      })
      res.status(200).json({user});

    } catch (error) {
      res.status(501).json({"Message": "Internal Server Error"})
    }
  }
}

module.exports = {authController};