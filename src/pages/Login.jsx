import {useGoogleLogin} from '@react-oauth/google'
import api from '../api/axios';
// import { googleAuth } from '../services/oauth/googleOAuthApi'


function Login() {
    const googleRes = async (authResult) => {
        try {
          if (authResult["code"]) {
           const data = await api.get(`/api/auth/google?code=${authResult["code"]}`)
    console.log(data)
          }
        } catch (err) {
          console.log(err);
        }
      };
    
      const googleLogin = useGoogleLogin({
        onSuccess: googleRes,
        onError: googleRes,
        flow: "auth-code",
      });
// const googleRes = async (authResult)=>{
//     try{
//         if(authResult['code']){
//             const result = await googleAuth(authResult['code']);
//             const {email, name} = result.data.user;
//             console.log(email, name )
//         }
// console.log(authResult)
//     }
//     catch(err){
// console.error(err)
//     }
// }


//     const GoogleLogin = useGoogleLogin({
//         onSuccess:googleRes,
//         onError:googleRes,
//         flow:'auth-code'
//     })

  return (
    <div onClick={googleLogin}>Login</div>
  )
}

export default Login