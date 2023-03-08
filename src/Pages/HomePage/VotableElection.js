import React, {useContext, useEffect, useState} from 'react';
import {VotableElectionService} from "../../Services/ElectionServices";
import {Alert, Box, Container, IconButton, Snackbar, Stack, Tooltip} from "@mui/material";
import {ElectionBox, ElectionButton, ElectionItems, HeaderText, Pic} from "../../StyledTags/HomePageTags";
import Rectangle11082 from "../../images/Rectangle11082.png"
import Grid2 from "@mui/material/Unstable_Grid2";
import {useNavigate} from "react-router-dom";
import {CheckDuplicateVoteService} from "../../Services/VoteServices";
import CloseIcon from "@mui/icons-material/Close";
import {ProgressBarContext} from "../../Contexts/PublicContext";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PollIcon from "@mui/icons-material/Poll";

const VotableElection = () => {

    const [activeElections, setActiveElections] = useState([]);
    const [checkElections, setCheckElections] = useState({});
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");

    const {setShowProgressBar} = useContext(ProgressBarContext);
    const navigate = useNavigate();

    useEffect(() => {
        setShowProgressBar("block");
        const response = async () => {
            const result = await VotableElectionService();
            setActiveElections(prepareData(result.data));

            let _checkElections = checkElections;
            result.data.forEach((el) => {
                const checkEveryElection = async () => {
                    const checkDuplicate = await CheckDuplicateVoteService(el.id);
                    _checkElections[el.id] = checkDuplicate.data;
                    setShowProgressBar("none");
                    setCheckElections(_checkElections);
                }
                checkEveryElection().catch(() => {
                    setShowProgressBar("none");
                });
            });
        };
        response().catch(() => {
            setShowProgressBar("none")
        });
    }, []);

    console.log(checkElections)

    const convertTime = (date) => {
        const dateObject = new Date(date);
        const persianDate = new Intl.DateTimeFormat('fa-IR').format(dateObject);
        return (persianDate);
    };

    const prepareData = (elections) => {
        return elections.map(m => {
            m.persianStartDate = convertTime(m.startDate);
            m.persianEndDate = convertTime(m.endDate);
            return m;
        });
    };

    const handleSelect = (e, id) => {
        const response = async () => {
            const result = await CheckDuplicateVoteService(id);
            if (result.data === true) {
                setOpenAlert(true);
                setMessage('شما قبلا در این انتخابات شرکت کرده اید');
                setAlertType("info");
            } else {
                navigate(`../Vote/${id}`);
            }
        };
        response().catch(() => {
            setShowProgressBar("none")
        });
    };

    const handleError = () => {
        setOpenAlert(true);
        setMessage('شما قبلا در این انتخابات شرکت کرده اید');
        setAlertType("error");
    };

    const handleResult = (id) => {
        navigate(`../VoteResult/${id}`);
    };

    const handleCloseAlert = (e, reason) => {
        if (reason === "clickaway") {
            return
        }
        setOpenAlert(false);
    };

    const closeIcon = (
        <IconButton sx={{p: 0}}
                    onClick={() => setOpenAlert(false)}>
            <CloseIcon/>
        </IconButton>
    );

    return (
        <>
            {activeElections.length !== 0 ?
                <>
                    <Container maxWidth="sm">
                        <Stack direction="row" justifyContent="space-evenly" alignItems={"center"}>
                            <HeaderText>انتخابات های در حال اجرا</HeaderText>
                            <Pic src={Rectangle11082}/>
                        </Stack>
                        {
                            activeElections.map((elec) =>
                                <Box key={elec.id} sx={{background: '#EAF8FF', p: '3px'}}>
                                    <ElectionBox direction="row">
                                        <ElectionItems>{elec.name}</ElectionItems>
                                        <ElectionItems sx={{ml: 'auto'}}>مهلت: {elec.persianEndDate}</ElectionItems>
                                        <Stack direction="row" alignItems="center">
                                            {checkElections[elec.id] === false ?
                                                <Tooltip title="شرکت">
                                                    <ElectionButton onClick={(e) => handleSelect(e, elec.id)}>
                                                        <HowToVoteIcon/>
                                                    </ElectionButton>
                                                </Tooltip>
                                                :
                                                <Grid2 onClick={handleError}>
                                                    <ElectionButton sx={{height: '100%'}} disabled>
                                                        <HowToVoteIcon/>
                                                    </ElectionButton>
                                                </Grid2>
                                            }
                                            <Tooltip title="نتیجه">
                                                <ElectionButton onClick={() => handleResult(elec.id)}>
                                                    <PollIcon/>
                                                </ElectionButton>
                                            </Tooltip>
                                        </Stack>
                                    </ElectionBox>
                                </Box>
                            )
                        }
                    </Container>
                </> :
                <Grid2 sx={{width: '100%', my: '1%'}}>
                    <HeaderText sx={{display: 'flex', justifyContent: {xs: 'center', md: 'start'}}}>
                        انتخاباتی فعالی وجود ندارد
                    </HeaderText>
                </Grid2>
            }
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
            >
                <Alert severity={alertType} action={closeIcon}>{message}</Alert>
            </Snackbar>
        </>
    );
};

export default VotableElection;