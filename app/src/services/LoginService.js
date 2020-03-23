import axios from 'axios';

const url = 'api/user/login/'

class LoginService{

	static getLogin(user){
		return new Promise(async(resolve,reject)=>{
			try{
				const res = await axios.post(url,user);
				const data = res.data;
				console.log(data);

				localStorage.setItem("jwt",data.token);
				axios.defaults.headers.common['Authorization'] = data.token
				resolve(
					data
				)
			}catch(err){
				console.log(err);
				// reject(err);
			}
		})
	}
}

export default LoginService;