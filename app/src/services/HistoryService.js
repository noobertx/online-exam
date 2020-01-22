import axios from 'axios';

const url = 'api/history/'

class HistoryService{
	static insertQuiz(data){
		return axios.post(url,data);
	}
}

export default HistoryService;