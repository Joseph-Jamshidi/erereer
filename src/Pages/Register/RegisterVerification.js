import React, {useState} from 'react';
import {Box, InputAdornment, TextField, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {HeaderText, LoginButton, LoginLink, MainSection, Pic} from "../../StyledTags/RegisterTags";
import Profile1 from "../../images/Profile1.png";
import Ellipse653 from "../../images/Ellipse653.png";
import Ellipse654 from "../../images/Ellipse654.png";
import Vector from "../../images/Vector.png";
import Ellipse652 from "../../images/Ellipse652.png";
import UserServices from "../../Services/UserServices";
import {useLocation, useNavigate} from "react-router-dom";
import CountDownTimer from "../../Component/CounterDownTimer";

const RegisterVerification = () => {

    const [verifyCode, setVerifyCode] = useState('');
    const [timer, setTimer] = useState({minutes: 2, seconds: 0});
    const [showTimer, setShowTimer] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const response = async () => {
            const result = await UserServices.VerifyUser(verifyCode, location.state.phoneNumber);
            if (result.statusCode === 'Success') {
                alert(result.message);
                navigate("../login");
            } else {
                alert(result.message);
            }
        }
        response();
    };

    const handleSendCodeAgain = (e) => {
        e.preventDefault();
        const response = async () => {
            await UserServices.SendCodeAgain(location.state.phoneNumber);
            alert("کد مجدد برای شما ارسال شد");
            setShowTimer(true);
            setTimer({minutes: 2, seconds: 0});
        }
        response();
    };

    const onFinishTimer = () => {
        setShowTimer(false);
    };

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
                                                    <InputAdornment position="start"><Pic
                                                        src={Profile1}/></InputAdornment>,
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