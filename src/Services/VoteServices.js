import authedAxios from "./axiosProvider";
import {API_BASE_URL} from "../Constants/ApiConstants";

const urls = {
    vote: API_BASE_URL + 'Vote',
    checkDuplicate: API_BASE_URL + 'Vote/CheckDuplicate',
    history: API_BASE_URL + 'Vote/MyVotes'
};

export const VotingService = async (voteInfo) => {
    try {
        const result = await authedAxios.post(urls.vote, voteInfo);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const VoteHistoryService = async (page, size) => {
    try {
        const result = await authedAxios.get(urls.history + `?Page=${page}&Size=${size}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const CheckDuplicateVoteService = async (electionId) => {
    try {
        const result = await authedAxios.get(urls.checkDuplicate + `?electionId=${electionId}`);
        return result.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
};