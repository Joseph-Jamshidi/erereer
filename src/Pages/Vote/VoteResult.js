import React, {useContext, useEffect, useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {
    AllCount,
    EditedBox,
    MainDashboard,
    MainTitleText,
    NameBox,
    NumberBox,
    TitleBox
} from "../../StyledTags/VoteTags";
import Dashboard from "../../Layout/Dashboard";
import {ElectionResultService} from "../../Services/VoteServices";
import {useParams} from "react-router-dom";
import {Box, Stack} from "@mui/material";
import {ProgressBarContext} from "../../Contexts/PublicContext";
import {toPersianNumber} from "../../Common/Utitlity";


const VoteResult = () => {

    const [candidateResult, setCandidateResult] = useState([]);
    const [allVotes, setAllVotes] = useState();

    const {setShowProgressBar} = useContext(ProgressBarContext);
    const params = useParams();

    useEffect(() => {
        setShowProgressBar("block");
        const response = async () => {
            const result = await ElectionResultService(params.id);
            const electionResult = result.data;
            setCandidateResult(electionResult.candidateResults);
            setAllVotes(toPersianNumber(electionResult.allVoteCount));
            setShowProgressBar("none");
        }
        response().catch(()=>{
            setShowProgressBar("none")
        });
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
                        <TitleBox>
                            <MainTitleText>نتایج انتخابات</MainTitleText>
                        </TitleBox>
                        <Box sx={{p: 3}}>
                            <Stack direction="row" justifyContent="center" spacing={1} sx={{mb: 2}}>
                                <AllCount>تعداد کل رأی ها:</AllCount>
                                <AllCount>{allVotes}</AllCount>
                            </Stack>
                            {
                                candidateResult?.map((c, i) =>
                                    <EditedBox key={c.id} direction="row" alignItems="center" spacing={1}>
                                        <NumberBox>{toPersianNumber(i + 1)}</NumberBox>
                                        <NameBox sx={{flex: 1}}>{c.name}</NameBox>
                                        <NameBox>{toPersianNumber(c.voteCount)}&nbsp;رأی</NameBox>
                                    </EditedBox>
                                )
                            }
                        </Box>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default VoteResult;