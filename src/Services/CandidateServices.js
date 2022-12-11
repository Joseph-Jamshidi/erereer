import authedAxios from "./axiosProvider";
import {API_BASE_URL} from "../Constants/ApiConstants";

const urls = {
    candidate: API_BASE_URL + 'Candidate',
    voters: API_BASE_URL + 'Election/VoterList'
}

class CandidateServices {

    addCandidate(addCandidate) {
        return authedAxios
            .post(urls.candidate, addCandidate)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                if (error.data) {
                    return Promise.reject(error.data)
                }
            })
    }

    getCandidate(page, size) {
        return authedAxios
            .get(urls.candidate + `?Page=${page}&Size=${size}`)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                if (error.data) {
                    return Promise.reject(error.data)
                }
            })
    }

    deleteCandidate(id) {
        return authedAxios
            .delete(urls.candidate + `/${id}`)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                if (error.data) {
                    return Promise.reject(error.data)
                }
            })
    }

    chosenCandidate(id) {
        return authedAxios
            .get(urls.candidate + `/${id}`)
            .then((r) => {
                return r.data
            })
            .catch((error) => {
                if (error.data) {
                    return Promise.reject(error.data)
                }
            })
    }

    editCandidate(id, editedCandidate) {
        return authedAxios
            .put(urls.candidate, editedCandidate)
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

const instance = new CandidateServices();
export default instance;