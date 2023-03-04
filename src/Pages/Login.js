import React, {useContext, useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {Alert, Box, IconButton, InputAdornment, Snackbar, Stack, TextField, Typography} from "@mui/material";
import {BackArrow, HeaderText, LoginButton, LoginLink, MainSection, Pic} from "../StyledTags/LoginTags";
import {LoginService, ProfileService} from "../Services/UserServices";
import Arrow from '../images/Arrow - Left.png';
import Stroke from '../images/Stroke.png';
import Lock from '../images/Lock.png';
import Vector from '../images/Vector.png';
import Ellipse653 from '../images/Ellipse653.png';
import Ellipse652 from '../images/Ellipse652.png';
import Ellipse654 from '../images/Ellipse654.png';
import CloseIcon from "@mui/icons-material/Close";
import {ProgressBarContext} from "../Contexts/PublickContext";

const Login = () => {

    const [loginForm, setLoginForm] = useState({
        userName: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");

    const {setShowProgressBar} = useContext(ProgressBarContext);

    const handleSubmit = (e) => {
        setShowProgressBar("block");
        e.preventDefault();
        Object.assign(loginForm, {grant_type: "password"});
        const response = async () => {
            const result = await LoginService(loginForm);
            if (result.access_token) {
                setOpenAlert(true);
                setMessage("خوش آمدید");
                setAlertType("success");
                const personalImage = await ProfileService(result.userId);
                const personalInfo = personalImage.data;
                localStorage.setItem("Profile", JSON.stringify(personalInfo.attachments));
                setTimeout(() => {
                    window.location.href="./";
                }, 4000);
                setShowProgressBar("none");
            } else {
                setOpenAlert(true);
                setMessage("نام کاربری یا کلمه عبور اشتباه است");
                setAlertType("error");
                setShowProgressBar("none");
            }
        };
        response().catch(() => {
            setShowProgressBar("none");
        });
    };

    const handleLoginInputs = (e) => {
        const value = e.target.value;
        setLoginForm({
            ...loginForm,
            [e.target.name]: value
        });
    };

    const handleCloseAlert = (e, reason) => {
        if (reason === "clickaway") {
            return
        }
        setOpenAlert(false);
    };

    const closeIcon = (
        <IconButton sx={{p: 0}}
                    onClick={() => alertType === "success" ? window.location.href = "./" : handleCloseAlert()}>
            <CloseIcon/>
        </IconButton>
    );


    return (
        <>
            <Grid2 container justifyContent='center' sx={{mt: '40px', pb: '78px', position: 'relative'}}>
                <Grid2 xs={11} sm={8} md={6} lg={4}>
                    <MainSection>
                        <Grid2 container>
                            <Grid2 sx={{my: '2%'}}>
                                <Stack direction="row">
                                    <BackArrow to='../'>
                                        <Pic src={Arrow}/>
                                    </BackArrow>
                                    <HeaderText>ورود</HeaderText>
                                </Stack>
                            </Grid2>
                            <Box component="form" onSubmit={handleSubmit}>
                                <Grid2 container sx={{pt: '4%', pb: '3%'}}>
                                    <Grid2 container sx={{width: '100%', my: '5%'}}>
                                        <TextField
                                            onInput={handleLoginInputs}
                                            label="نام کاربری"
                                            sx={{m: 1, width: '100%'}}
                                            name="userName"
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start"><Pic
                                                        src={Stroke}/></InputAdornment>,
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%', mb: '10%'}}>
                                        <TextField
                                            onInput={handleLoginInputs}
                                            label="کلمه عبور"
                                            sx={{m: 1, width: '100%'}}
                                            name="password"
                                            type="password"
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start"><Pic src={Lock}/></InputAdornment>
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%'}}>
                                        <LoginLink to="../register">
                                            <Typography align="center" sx={{color: 'blue'}}>
                                                ثبت نام نکرده اید؟
                                            </Typography>
                                        </LoginLink>
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%'}}>
                                        <LoginLink to="../ForgetPassword">
                                            <Typography align="center" sx={{color: 'blue'}}>
                                                فراموشی رمز عبور
                                            </Typography>
                                        </LoginLink>
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%', mb: '2%', mt: '10%'}}>
                                        <LoginButton type="submit" variant="contained">ورود</LoginButton>
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

export default Login;