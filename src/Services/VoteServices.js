import authedAxios from "./axiosProvider";
import {API_BASE_URL} from "../Constants/ApiConstants";

const urls = {
    vote: API_BASE_URL + 'Vote',
};

class VoteServices {
    createVote(voteInfo) {
        return authedAxios
            .post(urls.vote, voteInfo)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                if (error.data) {
                    return Promise.reject(error.data)
                }
            })
    }

    getVotes(electionId, page, size) {
        return authedAxios
            .get(urls.vote + `?ElectionId=${electionId}&Page=${page}&Size=${size}`)
            .then((response)=>{
                return response.data
            })
            .catch((error) => {
                if (error.data) {
                    return Promise.reject(error.data)
                }
            })
    }


}

const instance = new VoteServices();
export default instance;