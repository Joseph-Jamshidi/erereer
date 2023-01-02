import React, {useEffect, useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {MainDashboard} from "../StyledTags/VoteHistoryTags";
import Dashboard from "../Layout/Dashboard";
import {GetVoteService} from "../Services/VoteServices";

const VoteHistory = () => {

    const [votes, setVotes] = useState([]);

    useEffect(() => {
        const response = async () => {
            const result = await GetVoteService(60, 1, 10)
            setVotes(result.data)
        }
        response().catch(console.error);
    }, []);

    return (
        <>
            <Grid2 container sx={{width: '98%', mx: 'auto', mt: '32px'}}>
                <Grid2 md={3} lg={2}>
                    <MainDashboard container sx={{display: {md: 'block', xs: 'none'}}}>
                        <Dashboard/>
                    </MainDashboard>
                </Grid2>
                <Grid2 md={9} lg={10} sx={{width: '100%', pl: {md: '10px'}}}>
                    <Grid2 sx={{borderRadius: '4px', border: '1px solid #425C81'}}>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default VoteHistory;