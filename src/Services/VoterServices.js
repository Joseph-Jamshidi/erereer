import authedAxios from "./axiosProvider";
import {API_BASE_URL} from "../Constants/ApiConstants";

const urls = {
    voters: API_BASE_URL + 'Election/VoterList',
    addVoter: API_BASE_URL + 'Election/AddVoter',
    deleteVoter: API_BASE_URL + 'Election/DeleteVoter'
};

class VoterServices {

    deleteVoter(userId, electionId) {
        return authedAxios
            .delete(urls.deleteVoter + `?userId=${userId}&electionId=${electionId}`)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                if (error.data) {
                    return Promise.reject(error.data)
                }
            })
    }

    addVoter(addVoter) {
        return authedAxios
            .post(urls.addVoter, addVoter)
            .then((res) => {
                return res.data
            })
            .catch((error) => {
                if (error.data) {
                    return Promise.reject(error.data)
                }
            })
    }



    getVoterList(electionId, page, size) {
        return authedAxios
            .get(urls.voters + `?electionId=${electionId}&Page=${page}&Size=${size}`)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                if (error.data) {
                    return Promise.reject(error.data)
                }
            })
    }

}

const instance = new VoterServices();
export default instance;