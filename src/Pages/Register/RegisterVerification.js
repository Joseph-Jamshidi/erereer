import React, {useContext, useState} from 'react';
import {Alert, Box, IconButton, InputAdornment, Snackbar, TextField, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {HeaderText, LoginButton, LoginLink, MainSection, Pic} from "../../StyledTags/RegisterTags";
import Ellipse653 from "../../images/Ellipse653.png";
import Ellipse654 from "../../images/Ellipse654.png";
import Vector from "../../images/Vector.png";
import Ellipse652 from "../../images/Ellipse652.png";
import {SendCodeAgainService, VerifyUserService} from "../../Services/UserServices";
import {useLocation, useNavigate} from "react-router-dom";
import CountDownTimer from "../../Component/CounterDownTimer";
import CloseIcon from "@mui/icons-material/Close";
import MessageIcon from '@mui/icons-material/Message';
import ProgressBarContext from "../../Contexts/PublickContext";


const RegisterVerification = () => {

    const [verifyCode, setVerifyCode] = useState('');
    const [timer, setTimer] = useState({minutes: 2, seconds: 0});
    const [showTimer, setShowTimer] = useState(true);
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");

    const {setShowProgressBar} = useContext(ProgressBarContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        setShowProgressBar("block");
        e.preventDefault();
        const response = async () => {
            const result = await VerifyUserService(verifyCode, location.state.phoneNumber);
            if (result.statusCode === 'Success') {
                setOpenAlert(true);
                setMessage("ثبت نام با موفقیت انجام شد");
                setAlertType("success");
                setTimeout(() => {
                    navigate("../login");
                }, 4000);
                setShowProgressBar("none");
            } else {
                setOpenAlert(true);
                setMessage(result.message);
                setAlertType("error");
                setShowProgressBar("none");
            }
        }
        response().catch(console.error);
    };

    const handleSendCodeAgain = (e) => {
        setShowProgressBar("block");
        e.preventDefault();
        const response = async () => {
            await SendCodeAgainService(location.state.phoneNumber);
            setOpenAlert(true);
            setMessage("کد مجدد برای شما ارسال شد");
            setAlertType("info");
            setShowTimer(true);
            setTimer({minutes: 2, seconds: 0});
            setShowProgressBar("none");
        }
        response().catch(console.error);
    };

    const onFinishTimer = () => {
        setShowTimer(false);
    };

    const handleCloseAlert = (e, reason) => {
        if (reason === "clickaway") {
            return
        }
        setOpenAlert(false)
    };

    const closeIcon = (
        <IconButton sx={{p: 0}} onClick={() => setOpenAlert(false)}>
            <CloseIcon/>
        </IconButton>
    );

    return (
        <>
            <Grid2 container justifyContent='center' sx={{mt: '40px', pb: '365px', position: 'relative'}}>
                <Grid2 xs={11} sm={8} md={6} lg={4}>
                    <MainSection>
                        <Grid2 container>
                            <Grid2 sx={{width: '100%', my: '1%'}}>
                                <HeaderText>ثبت نام</HeaderText>
                            </Grid2>
                            <Box component="form" onSubmit={handleSubmit}>
                                <Grid2 container sx={{pt: '4%'}}>
                                    <Grid2 container sx={{width: '100%', my: '1%'}}>
                                        <TextField
                                            onChange={(e) => setVerifyCode(e.target.value)}
                                            label="کد پیامکی را وارد نمایید"
                                            id="firstName"
                                            sx={{m: 1, width: '100%'}}
                                            type="number"
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start">
                                                        <MessageIcon/>
                                                    </InputAdornment>,
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%'}}>
                                        {showTimer ?
                                            <Typography align="center" sx={{color: 'silver', width: '100%'}}>
                                                دریافت مجدد کد&nbsp;
                                                <CountDownTimer onFinished={onFinishTimer} timer={timer}
                                                                setTimer={setTimer}/>
                                            </Typography>
                                            :
                                            <LoginLink onClick={handleSendCodeAgain}>
                                                <Typography align="center" sx={{color: 'blue'}}>
                                                    دریافت مجدد کد
                                                </Typography>
                                            </LoginLink>
                                        }
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%', mb: '0', mt: '1%'}}>
                                        <LoginButton variant="contained" type="submit">ثبت نام</LoginButton>
                                    </Grid2>
                                </Grid2>
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
                    </MainSection>
                </Grid2>
                <Box sx={{position: 'absolute', bottom: '0', left: 0, display: {md: 'block', xs: 'none'}}}>
                    <Pic src={Ellipse653} alt=""/>
                </Box>
                <Box sx={{position: 'absolute', bottom: '0', left: 0, display: {md: 'block', xs: 'none'}}}>
                    <Pic src={Ellipse654} alt=""/>
                </Box>
                <Box sx={{position: 'absolute', bottom: '0', left: 0, display: {md: 'block', xs: 'none'}}}>
                    <Pic src={Vector} alt=""/>
                </Box>
                <Box sx={{position: 'absolute', bottom: '0', right: 0, display: {md: 'block', xs: 'none'}}}>
                    <Pic src={Ellipse652} alt=""/>
                </Box>
                <Box sx={{position: 'absolute', bottom: '0', right: 0, display: {md: 'block', xs: 'none'}}}>
                    <Pic src={Ellipse653} alt=""/>
                </Box>
                <Box sx={{position: 'absolute', bottom: '0', right: 0, display: {md: 'block', xs: 'none'}}}>
                    <Pic src={Vector} alt=""/>
                </Box>
            </Grid2>
        </>
    );
};

export default RegisterVerification;