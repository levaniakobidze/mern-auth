const jwt = require('jsonwebtoken')
const user = require('../models/user')

const requireAuth = async (req,res,next) => {

    // * verify auth

   const { authorisation } = req.headers
   if(!authorisation) {
    res.status(401).json({error: 'Token required'})
   } 

   const token = authorisation.header.split(' ')[1]

   try {
    const {_id} = jwt.verify(token,process.env.SECRET)
    req.user = await user.findOne(_id).select('_id')
    next()
   } catch (error) {
    console.log(error)
    res.status(401).json({error:'Request is not authorised'})
   }
}

module.exports = requireAuth