import axios from 'axios';

const url = '../api/questions/'

class QuestionService{
	static getQuestions(){
		return new Promise(async(resolve,reject)=>{
			try{
				const res = await axios.get(url);
				const data = res.data;
				resolve(
					data.map(question=>({
						...question
					}))
				)
			}catch(err){
				reject(err);
			}
		})
	}
	static updateQuestion(id,data){
		return axios.put(`${url}${id}`,data);
	}
	static insertQuestion(data){
		return axios.post(url,data);
	}
	static deleteQuestion(id){
		return axios.delete(`${url}${id}`);
	}
}

export default QuestionService;