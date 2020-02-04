import axios from 'axios';

const url = 'api/quiz-listings/'

class QuizListings{
	static getQuizzes(){
		return new Promise(async(resolve,reject)=>{
			try{
				const res = await axios.get(url);
				const data = res.data;
				resolve(
					data.map(quiz=>({
						...quiz
					}))
				)
			}catch(err){
				reject(err);
			}
		})
	}
}

export default QuizListings;