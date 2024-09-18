const  { outh2client } = require("../utils/googleConfig");
const  jwt = require('jsonwebtoken')
const JWT_SECRET = "348806"


export const googleLogin = async(req, res)=>{
    try{
// the main logic of google auth
const code = req.query;
const {tokens} = await outh2client.getToken(code);
outh2client.setCredentials(tokens);

const userRes = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);
const userInfo = await userRes.json(); // Parse the response
const {email, name, picture} = userInfo.data;

const token = jwt.sign({email, name},JWT_SECRET, {
    expiresIn:'12h'
} )

res.status(200).json({
    message:'success',
    token, email, name
})
    }
    catch(err){
res.status(500).json({
    message:err
})
    }
}