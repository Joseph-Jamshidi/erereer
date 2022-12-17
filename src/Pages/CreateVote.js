import React, {useEffect, useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import Dashboard from "../Layout/Dashboard";
import {
    MainDashboard,
    Section,
    SubmitButton,
    TitleBox,
    TitleText,
    TitleText2,
} from "../StyledTags/CreateVoteTags";
import {
    Alert,
    Box,
    FormControl,
    FormGroup,
    FormLabel, IconButton, Snackbar,
    Stack,
    Switch,
    TextField, Typography
} from "@mui/material";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import InputIcon from "react-multi-date-picker/components/input_icon";
import gregorian from "react-date-object/calendars/gregorian";
import persian_en from "react-date-object/locales/persian_en";
import ElectionServices from "../Services/ElectionServices";
import {useParams} from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const CreateVoteTags = () => {

    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const [isVoterHidden, setIsVoterHidden] = useState(false);
    const [candidateCount, setCandidateCount] = useState("");
    const [userVoteCount, setUserVoteCount] = useState("");
    const [selectedElection, setSelectedElection] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            //Get Election From server and set it to state
            const response = async () => {
                const result = await ElectionServices.chosenElection(params.id);
                const selected = result.data;
                setName(selected.name)
                setSelectedElection(selected);
                setCandidateCount(selected.candidateCount);
                setUserVoteCount(selected.userVoteCount);
                setIsEnabled(selected.isEnabled);
                setIsVoterHidden(selected.isVoterHidden);
                setOwnerId(selected.ownerId);
            }
            response().catch(console.error);
        }
    }, []);

    const handleCreate = (e) => {
        e.preventDefault();
        const createElection = {
            name: name,
            startDate: startDate,
            endDate: endDate,
            isEnabled: isEnabled,
            isVoterHidden: isVoterHidden,
            candidateCount: candidateCount,
            userVoteCount: userVoteCount,
            id: params.id ? params.id : 0,
            ownerId: params.id ? ownerId : 0
        };
        if (createElection.id) {
            const response = async () => {
                await ElectionServices.editElection(createElection.id, createElection);
                setMessage("ئیرایش انجام شد")
                setOpenAlert(true);
                setAlertType("success");
            };
            response().catch(console.error);
        } else {
            const response = async () => {
                const result = await ElectionServices.addElection(createElection);
                if(result.statusCode==="Success"){
                    setMessage("انتخابات جدید ایجاد شد")
                    setOpenAlert(true);
                    setAlertType("info");
                    setName("");
                    setCandidateCount("");
                    setUserVoteCount("");
                    setIsEnabled(false);
                    setIsVoterHidden(false);
                }else {
                    setMessage("لطفاً فرم را کامل کنید")
                    setOpenAlert(true);
                    setAlertType("warning");
                    alert("hello")
                }
            }
            response().catch(console.error);
        }
    };

    const onStartDateHandler = (date) => {
        const object = {date, format: "YYYY-MM-DD"}
        const sDay = {gregorian: new DateObject(object).convert(gregorian, persian_en).format()}
        setStartDate(sDay.gregorian)
    };


    const onEndDateHandler = (date) => {
        const object = {date, format: "YYYY-MM-DD"};
        const eDay = {gregorian: new DateObject(object).convert(gregorian, persian_en).format()};
        setEndDate(eDay.gregorian);
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
            <Grid2 container sx={{width: '98%', mx: 'auto', mt: '32px'}}>
                <Grid2 md={3} lg={2}>
                    <MainDashboard container sx={{display: {md: 'block', xs: 'none'}}}>
                        <Dashboard/>
                    </MainDashboard>
                </Grid2>
                <Grid2 md={9} lg={10} sx={{width: '100%', pl: {md: '10px'}}}>
                    <Grid2 sx={{background: '#EAF8FF', borderRadius: '4px', border: '1px solid #425C81'}}>
                        <TitleBox>
                            <TitleText>ایجاد انتخابات جدید</TitleText>
                        </TitleBox>
                        <Box>
                            <TitleText2>برای ایجاد انتخابات فرم زیر را کامل کنید</TitleText2>
                        </Box>
                        <Section>
                            <Box component="form" onSubmit={handleCreate}>
                                <Stack direction='column' spacing={3} sx={{mt: {xs: '5%', sm: '3%', md: '1%'}}}>
                                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={3}>
                                        <Grid2 xs={12} sm={8}>
                                            <TextField
                                                onChange={(e) => setName(e.target.value)}
                                                sx={{background: 'white', width: '100%'}}
                                                label="عنوان انتخابات"
                                                variant="outlined"
                                                value={name}
                                            />
                                        </Grid2>
                                        <Grid2 xs={12} sm={4}>
                                            <DatePicker
                                                value={selectedElection ? new Date(selectedElection.startDate) : ""}
                                                render={<InputIcon placeholder="تاریخ شروع انتخابات"/>}
                                                minDate={new Date()}
                                                onChange={onStartDateHandler}
                                                calendar={persian}
                                                locale={persian_fa}
                                                format={"YYYY-MM-DD"}
                                            />
                                        </Grid2>
                                    </Stack>
                                    <Grid2 xs={12}>
                                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={4}>
                                            <Grid2 xs={12} lg={4} md={5}>
                                                <TextField
                                                    onChange={(e) => setCandidateCount(e.target.value)}
                                                    sx={{background: 'white', width: {xs: '100%'}}}
                                                    label="تعداد کاندیدهای انتخابات"
                                                    value={candidateCount}
                                                    type="number"
                                                />
                                            </Grid2>
                                            <Grid2 xs={12} lg={4} md={5}>
                                                <TextField
                                                    onChange={(e) => setUserVoteCount(e.target.value)}
                                                    sx={{background: 'white', width: {xs: '100%'}}}
                                                    label="تعداد رأی برای هر کاربر"
                                                    value={userVoteCount}
                                                    type="number"
                                                />
                                            </Grid2>
                                        </Stack>
                                    </Grid2>
                                    <Grid2 xs={12}>
                                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={4}>
                                            <Grid2 xs={12} sm={6}>
                                                <DatePicker
                                                    value={selectedElection ? new Date(selectedElection.endDate) : ""}
                                                    render={<InputIcon placeholder={"تاریخ پایان انتخابات"}/>}
                                                    onChange={onEndDateHandler}
                                                    calendar={persian}
                                                    locale={persian_fa}
                                                    format={"YYYY-MM-DD"}
                                                />
                                            </Grid2>
                                            <Grid2 xs={12} sm={6}>
                                                <FormControl>
                                                    <FormLabel component='legend'>رأی گیری مخفی</FormLabel>
                                                    <FormGroup>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Typography>خیر</Typography>
                                                            <Switch onChange={() => setIsVoterHidden(!isVoterHidden)}
                                                                    checked={isVoterHidden === true}/>
                                                            <Typography>بله</Typography>
                                                        </Stack>
                                                    </FormGroup>
                                                </FormControl>
                                            </Grid2>
                                        </Stack>
                                    </Grid2>
                                    <Grid2 xs={12}>
                                        <Stack direction='row' spacing={4} justifyContent="start" alignItems="center">
                                            <Grid2 xs={12} sm={6}>
                                                <FormControl>
                                                    <FormGroup>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Typography>غیر فعال</Typography>
                                                            <Switch onChange={() => setIsEnabled(!isEnabled)}
                                                                    checked={isEnabled === true}/>
                                                            <Typography>فعال</Typography>
                                                        </Stack>
                                                    </FormGroup>
                                                </FormControl>
                                            </Grid2>
                                        </Stack>
                                    </Grid2>
                                    <Grid2 xs={12}>
                                        <SubmitButton variant="contained" type="submit">
                                            ثبت
                                        </SubmitButton>
                                    </Grid2>
                                </Stack>
                            </Box>
                        </Section>
                        <Snackbar
                            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                            open={openAlert}
                            autoHideDuration={3000}
                            onClose={handleCloseAlert}
                        >
                            <Alert severity={alertType} action={closeIcon}>{message}</Alert>
                        </Snackbar>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default CreateVoteTags;