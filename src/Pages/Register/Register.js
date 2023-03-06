import React, {useContext, useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {Alert, Box, IconButton, InputAdornment, Snackbar, TextField, Typography} from "@mui/material";
import {HeaderText, LoginButton, LoginLink, MainSection, Pic} from "../../StyledTags/RegisterTags";
import {useNavigate} from "react-router-dom";
import {CheckUserDuplicateService, RegisterService} from '../../Services/UserServices';
import Stroke from '../../images/Stroke.png';
import Lock from '../../images/Lock.png';
import Ellipse653 from "../../images/Ellipse653.png";
import Ellipse654 from "../../images/Ellipse654.png";
import Vector from "../../images/Vector.png";
import Ellipse652 from "../../images/Ellipse652.png";
import Profile1 from '../../images/Profile1.png';
import CloseIcon from "@mui/icons-material/Close";
import {ProgressBarContext} from "../../Contexts/PublickContext";

const Register = () => {

    const [registerForm, setRegisterForm] = useState({
        firstName: '',
        lastName: '',
        nationalCode: '',
        phoneNumber: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");

    const {setShowProgressBar} = useContext(ProgressBarContext);
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        setShowProgressBar("block");
        e.preventDefault()
        const response = async () => {
            const checkDuplicate = await CheckUserDuplicateService(registerForm.phoneNumber, registerForm.nationalCode);
            if (checkDuplicate.data === true) {
                setOpenAlert(true);
                setMessage("شما قبلاً ثبت نام کرده اید");
                setAlertType("error");
                setShowProgressBar("none");
            } else {
                const result = await RegisterService(registerForm);
                if (result.statusCode === 'Success') {
                    navigate("../RegisterVerification", {state: {phoneNumber: registerForm.phoneNumber}});
                    setShowProgressBar("none");
                } else {
                    setOpenAlert(true);
                    setMessage(result.message);
                    setAlertType("error");
                    setShowProgressBar("none");
                }
            }
        }
        response().catch(() => {
            setShowProgressBar("none")
        });
    };

    const handleRegisterForm = (e) => {
        const value = e.target.value;
        setRegisterForm({
            ...registerForm,
            [e.target.name]: value
        });
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
            <Grid2 container justifyContent='center' sx={{mt: '40px', pb: '40px', position: 'relative'}}>
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
                                            onInput={handleRegisterForm}
                                            label="نام"
                                            name='firstName'
                                            sx={{m: 1, width: '100%'}}
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start">
                                                        <Pic src={Profile1}/>
                                                    </InputAdornment>,
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%', my: '1%'}}>
                                        <TextField
                                            onInput={handleRegisterForm}
                                            label="نام خانوادگی"
                                            name='lastName'
                                            sx={{m: 1, width: '100%'}}
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start"><Pic
                                                        src={Profile1}/></InputAdornment>,
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%', my: '1%'}}>
                                        <TextField
                                            onInput={handleRegisterForm}
                                            label="کد ملی"
                                            name='nationalCode'
                                            sx={{m: 1, width: '100%'}}
                                            type="number"
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start"><Pic
                                                        src={Stroke}/></InputAdornment>,
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%', my: '1%'}}>
                                        <TextField
                                            onInput={handleRegisterForm}
                                            label="شماره تلفن"
                                            name='phoneNumber'
                                            sx={{m: 1, width: '100%'}}
                                            type="tel"
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start"><Pic
                                                        src={Stroke}/></InputAdornment>,
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%', my: '1%'}}>
                                        <TextField
                                            onInput={handleRegisterForm}
                                            label="کلمه عبور"
                                            name='password'
                                            sx={{m: 1, width: '100%'}}
                                            type="password"
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start"><Pic src={Lock}/></InputAdornment>,
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%'}}>
                                        <LoginLink to='../login'>
                                            <Typography align="center" sx={{color: 'blue'}}>ثبت نام کرده ام</Typography>
                                        </LoginLink>
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%', mb: '0%', mt: '1%'}}>
                                        <LoginButton variant="contained" type="submit">ثبت نام</LoginButton>
                                    </Grid2>
                                </Grid2>
                            </Box>
                        </Grid2>
                    </MainSection>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        open={openAlert}
                        autoHideDuration={3000}
                        onClose={handleCloseAlert}
                    >
                        <Alert severity={alertType} action={closeIcon}>{message}</Alert>
                    </Snackbar>
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

export default Register;