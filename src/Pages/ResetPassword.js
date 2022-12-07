import React, {useState} from 'react';
import {MainSection, Pic, HeaderText, BackArrow, SubmitButton} from "../StyledTags/ResetPasswordTags";
import {Box, InputAdornment, Stack, TextField} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {UserInfo} from "../Services/info";
import UserServices from "../Services/UserServices";
import Arrow from "../images/Arrow - Left.png";
import Lock from "../images/Lock.png";
import Ellipse653 from "../images/Ellipse653.png";
import Ellipse654 from "../images/Ellipse654.png";
import Vector from "../images/Vector.png";
import Ellipse652 from "../images/Ellipse652.png";

const ResetPassword = () => {

    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const changePassword = {
            password: password,
            id: UserInfo.userId
        };
        UserServices.resetPassword(changePassword).then((r) => {
            if (r.isSuccess === true) {
                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = "./login";
                }, 1000)
                alert(r.message);
            } else {
                alert("رمز عبور باید حداقل 6 کارکتر باشد")
            }
        })
    };

    const handlePassword = (e) => {
        setPassword(e.target.value)
    };

    return (
        <>
            <Grid2 container justifyContent='center' sx={{mt: '40px', pb: '78px', position: 'relative'}}>
                <Grid2 xs={11} sm={8} md={6} lg={4} sx={{pb: '166px'}}>
                    <MainSection>
                        <Grid2 container>
                            <Grid2 sx={{my: '2%'}} xs={12}>
                                <Stack direction="row">
                                    <BackArrow to='../'>
                                        <Pic src={Arrow}/>
                                    </BackArrow>
                                    <HeaderText>تغییر رمز عبور</HeaderText>
                                </Stack>
                            </Grid2>
                            <Box component="form" onSubmit={handleSubmit} sx={{width: '100%'}}>
                                <Grid2 container sx={{pt: '4%', pb: '3%'}} xs={12}>
                                    <Grid2 container sx={{width: '100%', my: '5%'}}>
                                        <TextField
                                            onInput={handlePassword}
                                            label="رمز عبور جدید"
                                            type="password" fullWidth
                                            sx={{m: 1, width: '100%'}}
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start"><Pic src={Lock}/></InputAdornment>
                                            }}
                                        />
                                    </Grid2>
                                </Grid2>
                            </Box>
                            <Grid2 container sx={{width: '100%', mb: '2%', mt: '10%'}}>
                                <SubmitButton type="submit" variant="contained">تغییر رمز عبور</SubmitButton>
                            </Grid2>
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

export default ResetPassword;