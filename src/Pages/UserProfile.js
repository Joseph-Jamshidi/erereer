import React, {useEffect, useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {MainDashboard, Section, SubmitButton, Text} from "../StyledTags/UserProfileTags";
import Dashboard from "../Layout/Dashboard";
import {Alert, Avatar, Badge, Button, Card, IconButton, Snackbar, Stack, TextField, Typography} from "@mui/material";
import {EditProfileService, ProfileService} from "../Services/UserServices";
import {UserInfo} from "../Services/info";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const UserProfile = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nationalCode, setNationalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");
    const [message, setMessage] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);


    useEffect(() => {
        const response = async () => {
            const result = await ProfileService(UserInfo.userId);
            const info = result.data
            setFirstName(info.firstName);
            setLastName(info.lastName);
            setNationalCode(info.nationalCode);
            setPhoneNumber(info.phoneNumber);
            setAttachments(info.attachments);
        };
        response().catch(console.error);
    }, [isUpdating]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const editedUser = {
            firstName: firstName,
            lastName: lastName,
            nationalCode: nationalCode,
            gender: "Male",
            attachments: attachments
        };
        const response = async () => {
            await EditProfileService(editedUser);
            setMessage("اطلاعات کاربری با موفقیت تغییر یافت");
            setOpenAlert(true);
            setAlertType("success");
            setIsUpdating(!isUpdating);

            localStorage.removeItem("Profile");

            localStorage.setItem("Profile", JSON.stringify(editedUser.attachments))

            setTimeout(() => {
                setOpenAlert(false);
            }, 4000);
        };
        response().catch(console.error);
    };

    const handleNationalPhoto = async (e) => {
        const base64FileContent = await toBase64(e.target.files[0]);
        const nationalPhotoAttachment = {
            base64: base64FileContent,
            extension: e.target.files[0].name.split('.').slice(-1)[0],
            name: e.target.files[0].name.split('.')[0],
            description: '',
            userId: UserInfo.userId,
            type: "NationalCard",
        };
        setAttachments([...attachments, nationalPhotoAttachment]);
    };

    const handleIdentity = async (e) => {
        const base64FileContent = await toBase64(e.target.files[0]);
        const nationalPhotoAttachment = {
            base64: base64FileContent,
            extension: e.target.files[0].name.split('.').slice(-1)[0],
            name: e.target.files[0].name.split('.')[0],
            description: '',
            userId: UserInfo.userId,
            type: "Identity",
        };
        setAttachments([...attachments, nationalPhotoAttachment]);
    };


    const handlePersonalPhoto = async (e) => {
        const base64FileContent = await toBase64(e.target.files[0]);
        const personalPhotoAttachment = {
            base64: base64FileContent,
            extension: e.target.files[0].name.split('.').slice(-1)[0],
            name: e.target.files[0].name.split('.')[0],
            description: '',
            userId: UserInfo.userId,
            type: "PersonalPhoto",
        };
        setAttachments([...attachments, personalPhotoAttachment]);
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onerror = error => reject(error);
        reader.onload = () => resolve(reader.result);
    });

    const handleDelete = (id) => {
        const imageList = attachments.filter((i) => i.id !== id);
        setAttachments(imageList);
    };

    const handleCloseAlert = (e, reason) => {
        if (reason === "clickaway") {
            return
        }
        setOpenAlert(false)
    };

    const closeIcon = (
        <IconButton sx={{p: 0}} onClick={() => handleCloseAlert}>
            <CloseIcon/>
        </IconButton>
    );

    console.log(attachments)

    return (
        <>
            <Grid2 container sx={{width: '98%', mx: 'auto', mt: '32px'}}>
                <Grid2 md={3} lg={2}>
                    <MainDashboard container sx={{display: {md: 'block', xs: 'none'}}}>
                        <Dashboard/>
                    </MainDashboard>
                </Grid2>
                <Grid2 md={9} lg={10} sx={{width: '100%', pl: {md: '10px'}, mb: '5%'}}>
                    <Stack sx={{background: '#EAF8FF', borderRadius: '4px', border: '1px solid #425C81'}}>
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
                            <Stack direction={{xs: 'column', sm: "row"}} justifyContent="space-start">
                                <Grid2 xs={12} sm={6}>
                                    <Card sx={{width: "fit-content", my: 2, py: 1, pr: 1}}>
                                        <Stack direction="row" alignItems="center" spacing={3}>
                                            <Button sx={{background: '#425C81', pr: 0, pl: 1, m: 1}} variant="contained"
                                                    component="label">
                                                <PhotoCamera/>
                                                <Typography sx={{mx: 2}}>عکس کارت ملی</Typography>
                                                <input hidden accept="image/*" multiple type="file"
                                                       onChange={handleNationalPhoto}/>
                                            </Button>
                                            {
                                                (attachments || []).filter((img) => img.type === "NationalCard").map((image, index) =>
                                                    <Badge key={index} badgeContent={
                                                        <IconButton onClick={() => handleDelete(image.id)}>
                                                            <CloseIcon/>
                                                        </IconButton>
                                                    }>
                                                        <Avatar variant="rounded"
                                                                src={image.base64}/>
                                                    </Badge>
                                                )
                                            }
                                        </Stack>
                                    </Card>
                                </Grid2>
                                <Grid2 xs={12} sm={6}>
                                    <Card sx={{width: "fit-content", my: 2, py: 1, pr: 1}}>
                                        <Stack direction="row" alignItems="center" spacing={3}>
                                            <Button sx={{background: '#425C81', pr: 0, pl: 1, m: 1}} variant="contained"
                                                    component="label">
                                                <PhotoCamera/>
                                                <Typography sx={{mx: 2}}>عکس شناسنامه</Typography>
                                                <input hidden accept="image/*" multiple type="file"
                                                       onChange={handleIdentity}/>
                                            </Button>
                                            {
                                                (attachments || []).filter((img) => img.type === "Identity").map((image, index) =>
                                                    <Badge key={index} badgeContent={
                                                        <IconButton onClick={() => handleDelete(image.id)}>
                                                            <CloseIcon/>
                                                        </IconButton>
                                                    }>
                                                        <Avatar variant="rounded"
                                                                src={image.base64}/>
                                                    </Badge>
                                                )
                                            }
                                        </Stack>
                                    </Card>
                                </Grid2>
                            </Stack>
                            <Grid2 xs={12} sm={6}>
                                <Card sx={{width: "fit-content", my: 2, py: 1, pr: 1}}>
                                    <Stack direction="row" alignItems="center" spacing={3}>
                                        <Button sx={{background: '#425C81', pr: 0, pl: 1, m: 1}} variant="contained"
                                                component="label">
                                            <PhotoCamera/>
                                            <Typography sx={{mx: 2}}>عکس پروفابل</Typography>
                                            <input hidden accept="image/*" multiple type="file"
                                                   onChange={handlePersonalPhoto}/>
                                        </Button>
                                        {
                                            (attachments || []).filter((img) => img.type === "PersonalPhoto").map((image, index) =>
                                                <Badge key={index} badgeContent={
                                                    <IconButton onClick={() => handleDelete(image.id)}>
                                                        <CloseIcon/>
                                                    </IconButton>
                                                }>
                                                    <Avatar variant="rounded"
                                                            src={image.base64}/>
                                                </Badge>
                                            )
                                        }
                                    </Stack>
                                </Card>
                            </Grid2>
                            <Grid2>
                                <SubmitButton variant="contained" onClick={handleSubmit}>ثبت</SubmitButton>
                            </Grid2>
                        </Section>
                        <Snackbar
                            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                            open={openAlert}
                            autoHideDuration={3000}
                            onClose={handleCloseAlert}
                        >
                            <Alert severity={alertType} action={closeIcon}>{message}</Alert>
                        </Snackbar>
                    </Stack>
                </Grid2>
            </Grid2>
        </>
    );
};

export default UserProfile;