import React from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {MainDashboard, MainTitleText, TitleBox} from "../../StyledTags/VotingTags";
import Dashboard from "../../Layout/Dashboard";
import VotingList from "./VotingList";
import {Stack} from "@mui/material";

const Voting = () => {

    return (
        <>
            <Grid2 container sx={{width: '98%', mx: 'auto', mt: '32px'}}>
                <Grid2 md={3} lg={2}>
                    <MainDashboard container sx={{display: {md: 'block', xs: 'none'}}}>
                        <Dashboard/>
                    </MainDashboard>
                </Grid2>
                <Grid2 md={9} lg={10} sx={{width: '100%', pl: {md: '10px'}, mb: '5%'}}>
                    <Grid2 sx={{background: '#EAF8FF', borderRadius: '4px', border: '1px solid #425C81'}}>
                        <Stack direction="row" justifyContent="space-between" sx={{mr: '12px'}}>
                            <TitleBox>
                                <MainTitleText>
                                    انتخابات های من
                                </MainTitleText>
                            </TitleBox>
                        </Stack>
                        <VotingList/>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>

    );
};

export default Voting;