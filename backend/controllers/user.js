const User = require('../models/user')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

const loginUser = async (req,res) => {
    const {email,password} = req.body
    try {
        const user = await User.login(email,password)
        // * create token
        const token = createToken(user._id)
        res.status(200).json({email,token})
      } catch (error) {
          res.status(404).json({error:error.message})
      }
}


const signUpUser = async (req,res) => {
    const {email,password} = req.body

    try {

      const user = await User.signUp(email,password)
      // * create token
      const token = createToken(user._id)

      res.status(200).json({email,token})
        
    } catch (error) {
        res.status(404).json({error:error.message})
    }

}

module.exports = {
    loginUser,
    signUpUser,
}
