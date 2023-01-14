import React, {useEffect, useState} from 'react';
import {VotableElectionService} from "../../Services/ElectionServices";
import {Alert, Box, Container, IconButton, Snackbar} from "@mui/material";
import {ElectionBox, ElectionButton, ElectionItems, HeaderText, Pic} from "../../StyledTags/HomePageTags";
import Rectangle11082 from "../../images/Rectangle11082.png"
import Grid2 from "@mui/material/Unstable_Grid2";
import {useNavigate} from "react-router-dom";
import {CheckDuplicateVoteService} from "../../Services/VoteServices";
import CloseIcon from "@mui/icons-material/Close";

const VotableElection = () => {

    const [activeElections, setActiveElections] = useState([]);
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");
    const navigate = useNavigate();

    useEffect(() => {
        const response = async () => {
            const result = await VotableElectionService();
            setActiveElections(prepareData(result.data));
        };
        response().catch(console.error);
    }, []);

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
        }
        response().catch(console.error)
    };

    const handleCloseAlert = (e, reason) => {
        if (reason === "clickaway") {
            return
        }
        setOpenAlert(false);
    };

    const closeIcon = (
        <IconButton sx={{p: 0}}
                    onClick={()=>setOpenAlert(false)}>
            <CloseIcon/>
        </IconButton>
    );

    return (
        <>
            {activeElections.length !== 0 ?
                <>
                    <Container maxWidth="sm">
                        <Grid2 display="flex" justifyContent={{xs: "center", md: "flex-start"}}>
                            <Pic src={Rectangle11082}/>
                        </Grid2>
                        {
                            activeElections.map((elec) =>
                                <Box key={elec.id} sx={{background: '#EAF8FF', p: '3px'}}>
                                    <ElectionBox direction="row" justifyContent="space-between">
                                        <ElectionItems>عنوان: {elec.name}</ElectionItems>
                                        <ElectionItems>مهلت: {elec.persianEndDate}</ElectionItems>
                                        <ElectionButton onClick={(e) => handleSelect(e, elec.id)}>شرکت</ElectionButton>
                                    </ElectionBox>
                                </Box>
                            )
                        }
                    </Container>
                </> :
                <Grid2 sx={{width: '100%', my: '1%'}}>
                    <HeaderText>
                        انتخاباتی فعالی وجئد ندارد
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