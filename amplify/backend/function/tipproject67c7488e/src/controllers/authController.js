const  { oauth2client } = require("../utils/googleConfig");
const  jwt = require('jsonwebtoken');
const JWT_SECRET = "348806";
const axios = require('axios');


const googleLogin = async(req, res)=>{
    try{
// the main logic of google auth
const {code} = req.query;
const googleRes = await oauth2client.getToken(code);
oauth2client.setCredentials(googleRes.tokens);

const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)

const {email, name, picture} = userRes.data;

const token = jwt.sign({email},JWT_SECRET, {
    expiresIn:"12h"
} )

res.status(200).json({
    message:'success',
    token,
    ...userRes.data
})
    }
    catch(err){
res.status(500).json({
    message:err
})
    }
}

module.exports = googleLogin;