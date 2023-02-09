import authedAxios from "./axiosProvider";
import {API_BASE_URL} from "../Constants/ApiConstants";

const urls = {
    candidate: API_BASE_URL + 'Candidate',
    voters: API_BASE_URL + 'Election/VoterList',
}

export const AddCandidateService = async (addCandidate) => {
    try {
        const result = await authedAxios.post(urls.candidate, addCandidate);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const EditCandidateService = async (editedCandidate) => {
    try {
        const result = await authedAxios.put(urls.candidate, editedCandidate);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const GetCandidateService = async (electionId, page, size) => {
    try {
        const result = await authedAxios.get(urls.candidate + `?ElectionId=${electionId}&Page=${page}&Size=${size}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const DeleteCandidateService = async (id) => {
    try {
        const result = await authedAxios.delete(urls.candidate + `/${id}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const ChosenCandidateService = async (id) => {
    try {
        const result = await authedAxios.get(urls.candidate + `/${id}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};