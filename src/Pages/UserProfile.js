import React, {useEffect, useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {MainDashboard, Section, SubmitButton, Text} from "../StyledTags/UserProfileTags";
import Dashboard from "../Layout/Dashboard";
import {Stack, TextField} from "@mui/material";
import UserService from "../Services/UserServices";
import {UserInfo} from "../Services/info";
import UserServices from "../Services/UserServices";

const UserProfile = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nationalCode, setNationalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [id, setId] = useState('');
    const [isActive, setIsActive] = useState('');

    useEffect(() => {
        UserService.Profile(UserInfo.userId).then((r) => {
            const info = r.data
            setFirstName(info.firstName);
            setLastName(info.lastName);
            setNationalCode(info.nationalCode);
            setPhoneNumber(info.phoneNumber);
            setId(info.id);
            setIsActive(info.isActive)
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const editedUser = {
            firstName: firstName,
            lastName: lastName,
            nationalCode: nationalCode,
            gender: "Male",
        };

        UserServices.EditProfile(editedUser).then((r) => {
            alert(r.message)
            localStorage.clear();
            window.location.href = "/"
        })
    }

    return (
        <>
            <Grid2 container sx={{width: '98%', mx: 'auto', mt: '32px'}}>
                <Grid2 md={3} lg={2}>
                    <MainDashboard container sx={{display: {md: 'block', xs: 'none'}}}>
                        <Dashboard/>
                    </MainDashboard>
                </Grid2>
                <Grid2 md={9} lg={10} sx={{width: '100%', pl: {md: '10px'}, mb: '5%'}}>
                    <Grid2 sx={{background: '#EAF8FF', borderRadius: '4px', border: '1px solid #425C81'}}>
                        <Section>
                            <Text>اطلاعات کاربری</Text>
                            <Grid2 xs={12}>
                                <Stack direction={{xs: 'column', sm: "row"}} justifyContent="space-start" spacing={2}
                                       sx={{my: '8px'}}>
                                    <Grid2 xs={12} sm={6}>
                                        <Grid2 xs={12} sm={8}>
                                            <TextField label="نام" margin="dense" value={firstName} variant="filled"
                                                       onChange={(e) => setFirstName(e.target.value)} fullWidth/>
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 xs={12} sm={6}>
                                        <Grid2 xs={12} sm={8}>
                                            <TextField
                                                label="نام خانوادگی" value={lastName} variant="filled" fullWidth
                                                margin="dense" onChange={(e) => setLastName(e.target.value)}/>
                                        </Grid2>
                                    </Grid2>
                                </Stack>
                            </Grid2>
                            <Grid2 xs={12}>
                                <Stack direction={{xs: 'column', sm: "row"}} justifyContent="space-start" spacing={2}
                                       sx={{mb: '4px'}}>
                                    <Grid2 xs={12} sm={6}>
                                        <Grid2 xs={12} sm={8}>
                                            <TextField
                                                label="کد ملی" margin="dense" value={nationalCode} variant="filled"
                                                fullWidth onChange={(e) => setNationalCode(e.target.value)}/>
                                        </Grid2>
                                    </Grid2>
                                    <Grid2 xs={12} sm={6}>
                                        <Grid2 xs={12} sm={8}>
                                            <TextField
                                                label="شماره تلفن" value={phoneNumber} variant="filled" fullWidth
                                                margin="dense" onChange={(e) => setPhoneNumber(e.target.value)}/>
                                        </Grid2>
                                    </Grid2>
                                </Stack>
                            </Grid2>
                            <Grid2>
                                <SubmitButton variant="contained" onClick={handleSubmit}>ثبت</SubmitButton>
                            </Grid2>
                        </Section>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default UserProfile;