import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Checkbox,
    FormControl,
    IconButton,
    InputBase,
    MenuItem,
    Pagination,
    Select,
    Snackbar, Stack
} from "@mui/material";
import ElectionServices from "../Services/ElectionServices";
import CandidateServices from "../Services/CandidateServices";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
    CandidateBox,
    MainDashboard,
    NameBox,
    NumberBox,
    Pic,
    SearchBox,
    SubmitButton,
    TextBox
} from "../StyledTags/VoteTags";
import {useParams} from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import icon from "../images/icon.png"
import VoteServices from "../Services/VoteServices";
import CloseIcon from '@mui/icons-material/Close';

const Vote = () => {

    const [selectedElection, setSelectedElection] = useState([]);
    const [candidateList, setCandidateList] = useState([]);
    const [chosenCandidates, setChosenCandidates] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState('');
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const params = useParams();

    useEffect(() => {
        const response = async () => {
            const ElectionResult = await ElectionServices.chosenElection(params.id);
            setSelectedElection(ElectionResult.data);

            const getCandidate = await CandidateServices.getCandidate(params.id, pageNumber, pageSize);
            setCandidateList(getCandidate.data);
            setPageCount(getCandidate.total)
        };
        response().catch(console.error);

    }, [pageSize, pageNumber]);

    const handleChoose = (e, id) => {
        if (e.target.checked) {
            setChosenCandidates([...chosenCandidates, id])
        } else {
            setChosenCandidates(chosenCandidates.filter(c => c !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const voteInfo = {
            electionId: params.id,
            candidateIds: chosenCandidates,
            id: 0
        };

        if (chosenCandidates.length > selectedElection.userVoteCount) {
            setMessage("تعداد کاندید های انتخابی بیشتر از حد مجاز است")
            setOpenAlert(true);
            setAlertType("error");
        } else {
            const response = async () => {
                await VoteServices.createVote(voteInfo);
                setOpenAlert(true);
                setMessage("رأی شما با موفقیت ثبت شد");
                setAlertType("success");
                setChosenCandidates([]);
            }
            response().catch(console.error);
        }
    };
    const handleCloseAlert = (e, reason) => {
        if (reason === "clickaway") {
            return
        }
        setOpenAlert(false);
    };

    const closeIcon = (
        <IconButton sx={{p: 0}} onClick={() => setOpenAlert(false)}>
            <CloseIcon/>
        </IconButton>
    );

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
                            <Box component="form" onSubmit={handleSubmit} sx={{p: 3}}>
                                <Grid2 display="flex" justifyContent="center">
                                    <SearchBox>
                                        <InputBase sx={{ml: 1, p: '8px 10px', flex: 1}} placeholder="جستجو"/>
                                        <Pic src={icon}/>
                                    </SearchBox>
                                </Grid2>
                                <TextBox>
                                    تعداد رأی مجاز برای هر کاربر:&nbsp;
                                    {selectedElection.userVoteCount}
                                </TextBox>
                                {
                                    candidateList.map((c, i) =>
                                        <CandidateBox key={c.id} direction="row" alignItems="center">
                                            <NumberBox>{(pageNumber - 1) * 10 + (i + 1)}</NumberBox>
                                            <NameBox sx={{flex: 1}}>{c.name}</NameBox>
                                            <Checkbox
                                                onChange={(e) => handleChoose(e, c.id)}
                                                checked={chosenCandidates.includes(c.id)}>
                                            </Checkbox>
                                        </CandidateBox>
                                    )
                                }
                                <SubmitButton type="submit" variant="contained">ثبت رأی</SubmitButton>
                            </Box>
                        </Grid2>
                        <Snackbar
                            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                            open={openAlert}
                            autoHideDuration={3000}
                            onClose={handleCloseAlert}
                        >
                            <Alert severity={alertType} action={closeIcon}>{message}</Alert>
                        </Snackbar>
                    </Grid2>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Pagination count={Math.ceil(pageCount / pageSize)} dir="ltr"
                                    onChange={(_, e) => setPageNumber(e)}/>

                        <FormControl sx={{m: 1, p: 0}}>
                            <Select
                                value={pageSize}
                                onChange={(e) => setPageSize(e.target.value)}
                                inputProps={{'aria-label': 'Without label'}}
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Grid2>
            </Grid2>
        </>
    );
};

export default Vote;