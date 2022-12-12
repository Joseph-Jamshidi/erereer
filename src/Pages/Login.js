import React, {useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {Box, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {BackArrow, HeaderText, LoginButton, LoginLink, MainSection, Pic} from "../StyledTags/LoginTags";
import Arrow from '../images/Arrow - Left.png';
import Stroke from '../images/Stroke.png';
import Lock from '../images/Lock.png';
import Vector from '../images/Vector.png';
import Ellipse653 from '../images/Ellipse653.png';
import Ellipse652 from '../images/Ellipse652.png';
import Ellipse654 from '../images/Ellipse654.png';
import UserServices from '../Services/UserServices';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginInfo = {
            grant_type: "password",
            userName: username,
            password: password
        };
        const response = async () => {
            const result = await UserServices.Login(loginInfo);
            if (result.access_token) {
                window.location.href = "./";
                alert("خوش آمدید");
            } else {
                alert(result.message);
            }
        };
        response().catch(console.error);
    };

    const usernameInput = (e) => {
        setUsername(e.target.value);
    }

    const passwordInput = (e) => {
        setPassword(e.target.value);
    }


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
                                            onInput={usernameInput}
                                            label="نام کاربری"
                                            sx={{m: 1, width: '100%'}}
                                            id="input-with-sx"
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start"><Pic
                                                        src={Stroke}/></InputAdornment>,
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 container sx={{width: '100%', mb: '10%'}}>
                                        <TextField
                                            onInput={passwordInput}
                                            label="رمز عبور"
                                            sx={{m: 1, width: '100%'}}
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
                                        <LoginLink>
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