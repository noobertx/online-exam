import axios from 'axios';

const url = 'api/quiz/'

class QuizService{
	static getQuizzes(){
		return new Promise(async(resolve,reject)=>{
			try{
				const res = await axios.get(url);
				const data = res.data;
				resolve(
					data
					// data.map(quiz=>({
					// 	...quiz
					// }))
				)
			}catch(err){
				reject(err);
			}
		})
	}
	static updateQuiz(id,data){
		return axios.put(`${url}${id}`,data);
	}
	static insertQuiz(data){
		return axios.post(url,data);
	}
	static deleteQuiz(id){
		return axios.delete(`${url}${id}`);
	}
}

export default QuizService;