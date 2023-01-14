import React, {useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {Alert, Box, IconButton, InputAdornment, Snackbar, TextField, Typography} from "@mui/material";
import {HeaderText, LoginButton, LoginLink, MainSection, Pic} from "../../StyledTags/RegisterTags";
import Stroke from '../../images/Stroke.png';
import Lock from '../../images/Lock.png';
import Ellipse653 from "../../images/Ellipse653.png";
import Ellipse654 from "../../images/Ellipse654.png";
import Vector from "../../images/Vector.png";
import Ellipse652 from "../../images/Ellipse652.png";
import Profile1 from '../../images/Profile1.png';
import {useNavigate} from "react-router-dom";
import {CheckUserDuplicateService, RegisterService} from '../../Services/UserServices';
import CloseIcon from "@mui/icons-material/Close";

const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nationalCode, setNationalCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            firstName: firstName,
            lastName: lastName,
            nationalCode: nationalCode,
            phoneNumber: phoneNumber,
            password: password
        };
        const response = async () => {
            const checkDuplicate = await CheckUserDuplicateService(phoneNumber, nationalCode);
            if (checkDuplicate.data === true) {
                setOpenAlert(true);
                setMessage("شما قبلاً ثبت نام کرده اید");
                setAlertType("error");
            } else {
                const result = await RegisterService(userData);
                if (result.statusCode === 'Success') {
                    navigate("../RegisterVerification", {state: {phoneNumber: phoneNumber}});
                } else {
                    setOpenAlert(true);
                    setMessage(result.message);
                    setAlertType("error");
                }
            }
        }
        response().catch(console.error);
    };

    const firstNameInput = (e) => {
        setFirstName(e.target.value);
    };
    const lastNameInput = (e) => {
        setLastName(e.target.value)
    };
    const nationalCodeInput = (e) => {
        setNationalCode(e.target.value)
    };
    const phoneNumberInput = (e) => {
        setPhoneNumber(e.target.value);
    };
    const passwordInput = (e) => {
        setPassword(e.target.value);
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
                                            onInput={firstNameInput}
                                            label="نام"
                                            id="firstName"
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
                                            onInput={lastNameInput}
                                            label="نام خانوادگی"
                                            id="lastName"
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
                                            onInput={nationalCodeInput}
                                            label="کد ملی"
                                            id="nationalCode"
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
                                            onInput={phoneNumberInput}
                                            label="شماره تلفن"
                                            id="phoneNumber"
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
                                            onInput={passwordInput}
                                            label="کلمه عبور"
                                            id="password"
                                            sx={{m: 1, width: '100%'}}
                                            type="password"
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start"><Pic src={Lock}/></InputAdornment>,
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%'}}>
                                        <LoginLink>
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