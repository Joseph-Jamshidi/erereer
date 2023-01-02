import authedAxios from "./axiosProvider";
import {API_BASE_URL} from "../Constants/ApiConstants";

const urls = {
    election: API_BASE_URL + 'Election',
    votableElection: API_BASE_URL + 'Election/VotableElection'
}

export const AddElectionService = async (createElection) => {
    try {
        const result = await authedAxios.post(urls.election, createElection);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const GetElectionService = async (page, size) => {
    try {
        const result = await authedAxios.get(urls.election + `?Page=${page}&Size=${size}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const DeleteElectionService = async (id) => {
    try {
        const result = await authedAxios.delete(urls.election + `/${id}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const ChosenElectionService = async (id) => {
    try {
        const result = await authedAxios.get(urls.election + `/${id}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const EditElectionService = async (editData) => {
    try {
        const result = await authedAxios.put(urls.election, editData);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const VotableElectionService = async () => {
    try {
        const result = await authedAxios.get(urls.votableElection);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};