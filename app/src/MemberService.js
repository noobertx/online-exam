import axios from 'axios';

const url = 'api/members/'

class MemberService{
	static getMembers(){
		return new Promise(async(resolve,reject)=>{
			try{
				const res = await axios.get(url);
				const data = res.data;
				resolve(
					data.map(member=>({
						...member
					}))
				)
			}catch(err){
				reject(err);
			}
		})
	}
	static getMember(id){
		return new Promise(async(resolve,reject)=>{
			try{
				const res = await axios.get(`${url}${id}`);
				const data = res.data;
				resolve(
					data.map(member=>({
						...member
					}))
				)
			}catch(err){
				reject(err);
			}
		})
	}
	static updateMember(id,data){
		return axios.put(`${url}${id}`,data);
	}
	static insertMember(data){
		return axios.post(url,data);
	}
	static deleteMember(id){
		return axios.delete(`${url}${id}`);
	}
}

export default MemberService;