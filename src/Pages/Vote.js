import React, {useEffect, useState} from 'react';
import {Box, Checkbox,  InputBase} from "@mui/material";
import ElectionServices from "../Services/ElectionServices";
import CandidateServices from "../Services/CandidateServices";
import Grid2 from "@mui/material/Unstable_Grid2";
import {CandidateBox, MainDashboard, NameBox, NumberBox, Pic, SearchBox} from "../StyledTags/VoteTags";
import {useParams} from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import icon from "../images/icon.png"

const Vote = () => {

    const [selectedElection, setSelectedElection] = useState([]);
    const [candidateList, setCandidateList] = useState([]);
    const [chosenCandidates, setChosenCandidates] = useState({name: ''});
    const params = useParams();

    useEffect(() => {
        const getElection = async () => {
            const result = await ElectionServices.chosenElection(params.id);
            setSelectedElection(result.data);
            //set voter count
        };
        getElection();

        const getCandidate = async () => {
            const result = await CandidateServices.getCandidate(1, 25);
            setCandidateList(result.data);
        }
        getCandidate();
    }, []);

    const handleChoose = (e, names) => {
        e.preventDefault();
        setChosenCandidates({...chosenCandidates, [chosenCandidates.name]: names})
    };

    console.log(chosenCandidates)

    return (
        <>
            <Grid2 container sx={{width: '98%', mx: 'auto', mt: '32px'}}>
                <Grid2 md={3} lg={2}>
                    <MainDashboard container sx={{display: {md: 'block', xs: 'none'}}}>
                        <Dashboard/>
                    </MainDashboard>
                </Grid2>
                <Grid2 md={9} lg={10} sx={{width: '100%', pl: {md: '10px'}}}>
                    <Grid2 sx={{borderRadius: '4px', border: '1px solid #425C81'}}
                           display="flex" justifyContent="center">
                        <Grid2 xs={6}>
                            <Box component="form" sx={{p: 3}}>
                                <Grid2 display="flex" justifyContent="center">
                                    <SearchBox sx={{mb: '10%'}}>
                                        <InputBase sx={{ml: 1, p: '8px 10px', flex: 1}} placeholder="جستجو"/>
                                        <Pic src={icon}/>
                                    </SearchBox>
                                </Grid2>
                                {
                                    candidateList.map((c, i) =>
                                        <CandidateBox key={c.id} direction="row" alignItems="center">
                                            <NumberBox>{i + 1}</NumberBox>
                                            <NameBox sx={{flex: 1}}>{c.name}</NameBox>
                                            <Checkbox onChange={(e) => handleChoose(e, c.name)}></Checkbox>
                                        </CandidateBox>
                                    )
                                }
                            </Box>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default Vote;