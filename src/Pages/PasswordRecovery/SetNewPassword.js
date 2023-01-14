import React, {useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {HeaderText, LoginButton, MainSection, Pic} from "../../StyledTags/ForgetPasswordTags";
import {Alert, Box, IconButton, InputAdornment, Snackbar, TextField} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import Ellipse653 from "../../images/Ellipse653.png";
import Ellipse654 from "../../images/Ellipse654.png";
import Vector from "../../images/Vector.png";
import Ellipse652 from "../../images/Ellipse652.png";
import CloseIcon from "@mui/icons-material/Close";
import Stroke from "../../images/Stroke.png";
import Lock from "../../images/Lock.png";
import {NewPasswordService} from "../../Services/UserServices";

const SetNewPassword = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");

    const handleSubmit = (e) => {
        e.preventDefault();
        const editedPassword = {
            phoneNumber: phoneNumber,
            newPassword: newPassword,
            otpCode: otpCode
        };
        const response = async ()=>{
            const result = await NewPasswordService(editedPassword);
            if (result.access_token){
                const token = result.access_token;
                localStorage.setItem("token", token);

                const firstName = result.firstName;
                localStorage.setItem("firstName", firstName);

                const lastName = result.lastName;
                localStorage.setItem("lastName", lastName);

                const userId = result.userId;
                localStorage.setItem("userId", userId);

                setOpenAlert(true);
                setMessage("کلمه عبور با موفقیت تغییر یافت")
                setAlertType("success");
                setTimeout(() => {
                    window.location.href = "./";
                }, 4000);
            }else {
                setOpenAlert(true);
                setMessage(result.data.message);
                setAlertType("error");
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
                    onClick={() => alertType === "success" ? window.location.href = "./" : handleCloseAlert()}>
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
                                <HeaderText>فراموشی کلمه عبور</HeaderText>
                            </Grid2>
                            <Box component="form" sx={{width: '100%'}} onSubmit={handleSubmit}>
                                <Grid2 container sx={{pt: '4%'}}>
                                    <Grid2 container sx={{width: '100%', my: '1%'}}>
                                        <TextField
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            label="شماره تلفن"
                                            sx={{m: 1, width: '100%'}}
                                            type="number"
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start">
                                                        <Pic src={Stroke}/>
                                                    </InputAdornment>,
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%', my: '1%'}}>
                                        <TextField
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            label="کلمه عبور جدید"
                                            sx={{m: 1, width: '100%'}}
                                            type="password"
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start">
                                                        <Pic src={Lock}/>
                                                    </InputAdornment>,
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%', my: '1%'}}>
                                        <TextField
                                            onChange={(e) => setOtpCode(e.target.value)}
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

export default SetNewPassword;