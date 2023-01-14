import React, {useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {
    AddButton,
    LinkButton,
    MainDashboard,
    MainTitleText,
    TitleBox,
    TitleText2
} from "../../StyledTags/ElectionTags";
import Dashboard from "../../Layout/Dashboard";
import ElectionList from "./ElectionList";
import {Stack} from "@mui/material";
import HowToVoteIcon from '@mui/icons-material/HowToVote';

const ElectionsInProgress = () => {

    const [showList, setShowList] = useState(true);
    const afterGetVotingList = (fetchedData) => {
        if (fetchedData === 0) {
            setShowList(false)
        }
    };

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
                            <LinkButton to="../CreateElection">
                                <AddButton variant="contained">
                                    <HowToVoteIcon sx={{pr: "2px"}}/>
                                    ایجاد انتخابات جدید
                                </AddButton>
                            </LinkButton>
                        </Stack>
                        {
                            showList ?
                                <ElectionList afterGetVotingList={afterGetVotingList}/> :
                                <TitleText2>انتخاباتی وجود ندارد</TitleText2>
                        }
                    </Grid2>
                </Grid2>
            </Grid2>
        </>

    );
};

export default ElectionsInProgress;