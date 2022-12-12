import authedAxios from "./axiosProvider";
import {API_BASE_URL} from "../Constants/ApiConstants";

const urls = {
    createVote: API_BASE_URL + 'Vote',
};

class VoteServices {
    createVote(voteInfo) {
        return authedAxios
            .post(urls.createVote,voteInfo)
            .then((response)=>{
                return response.data
            })
            .catch((error)=>{
                if (error.data){
                    return Promise.reject(error.data)
                }
            })
    }
}

const instance = new VoteServices();
export default instance;