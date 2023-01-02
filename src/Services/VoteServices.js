import authedAxios from "./axiosProvider";
import {API_BASE_URL} from "../Constants/ApiConstants";

const urls = {
    vote: API_BASE_URL + 'Vote',
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

export const GetVoteService = async (electionId, page, size)=>{
    try {
        const result = await authedAxios.get(urls.vote + `?ElectionId=${electionId}&Page=${page}&Size=${size}`);
        return result.data;
    }catch (error){
        if (error.response){
            return error.response.data;
        }
    }
};