import authedAxios from "./axiosProvider";
import {API_BASE_URL} from "../Constants/ApiConstants";

const urls = {
    voters: API_BASE_URL + 'Election/VoterList',
    addVoter: API_BASE_URL + 'Election/AddVoter',
    deleteVoter: API_BASE_URL + 'Election/DeleteVoter'
};

export const DeleteVoterService = async (userId, electionId) => {
    try {
        const result = await authedAxios.delete(urls.deleteVoter + `?userId=${userId}&electionId=${electionId}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const AddVoterService = async (addVoter) => {
    try {
        const result = await authedAxios.post(urls.addVoter, addVoter);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const GetVoterService = async (electionId, page, size) => {
    try {
        const result = await authedAxios.get(urls.voters + `?electionId=${electionId}&Page=${page}&Size=${size}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};