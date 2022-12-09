import React from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {MainDashboard, Pic} from "../StyledTags/VoteTags";
import Dashboard from "../Layout/Dashboard";
import {Box, InputBase, Paper} from "@mui/material";
import icon from "../images/icon.png"

const Vote = () => {
    return (
        <>
            <Grid2 container sx={{width: '98%', mx: 'auto', mt: '32px'}}>
                <Grid2 md={3} lg={2}>
                    <MainDashboard container sx={{display: {md: 'block', xs: 'none'}}}>
                        <Dashboard/>
                    </MainDashboard>
                </Grid2>
                <Grid2 md={9} lg={10} sx={{width: '100%', pl: {md: '10px'}}}>
                    <Grid2 sx={{background: '#EAF8FF', borderRadius: '4px', border: '1px solid #425C81'}}>
                        <Box component="form">
                            <Paper component="form"
                                   sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
                            >
                                <InputBase
                                    sx={{ml: 1, flex: 1}}
                                    placeholder="جستجو"
                                />
                                <Pic src={icon} alt=""/>
                            </Paper>
                        </Box>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default Vote;