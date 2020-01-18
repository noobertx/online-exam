import axios from 'axios';

const url = 'api/login/'

class LoginService{
	static getLogin(user){
		return new Promise(async(resolve,reject)=>{
			try{
				const res = await axios.post(url,user);
				const data = res.data;
				resolve(
					data
				)
			}catch(err){
				reject(err);
			}
		})
	}
}

export default LoginService;