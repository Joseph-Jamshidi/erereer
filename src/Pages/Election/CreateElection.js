import React, {useContext, useEffect, useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import Dashboard from "../../Layout/Dashboard";
import {
    MainDashboard,
    Section,
    SubmitButton,
    TitleBox,
    TitleText,
    TitleText2,
} from "../../StyledTags/CreateVoteTags";
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
import {AddElectionService, ChosenElectionService, EditElectionService} from "../../Services/ElectionServices";
import {useParams} from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AdapterJalali from '@date-io/date-fns-jalali';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {ProgressBarContext} from "../../Contexts/PublicContext";

const CreateElection = () => {

    const [createElection, setCreateElection] = useState({
        name: '',
        startDate: '',
        endDate: '',
        isEnabled: false,
        isVoterHidden: false,
        candidateCount: '',
        userVoteCount: '',
        ownerId: 0,
        id: 0
    });
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");

    const {setShowProgressBar} = useContext(ProgressBarContext);
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            setShowProgressBar("block");
            const response = async () => {
                const result = await ChosenElectionService(params.id);
                const selected = result.data;
                setCreateElection({
                    name: selected.name,
                    startDate: selected.startDate,
                    endDate: selected.endDate,
                    isEnabled: selected.isEnabled,
                    isVoterHidden: selected.isVoterHidden,
                    candidateCount: selected.candidateCount,
                    userVoteCount: selected.userVoteCount,
                    ownerId: selected.ownerId,
                    id: params.id
                })
                setShowProgressBar("none");
            }
            response().catch(() => {
                setShowProgressBar("none")
            });
        }
    }, []);

    const handleCreate = (e) => {
        setShowProgressBar("block");
        e.preventDefault();
        if (createElection.id) {
            const response = async () => {
                const result = await EditElectionService(createElection);
                if (result.statusCode === "Success") {
                    setMessage("ویرایش انجام شد")
                    setOpenAlert(true);
                    setAlertType("success");
                    setShowProgressBar("none");
                } else {
                    setMessage("لطفاً فرم را کامل کنید")
                    setOpenAlert(true);
                    setAlertType("error");
                    setShowProgressBar("none");
                }
            };
            response().catch(() => {
                setShowProgressBar("none")
            });
        } else {
            const response = async () => {
                const result = await AddElectionService(createElection);
                if (result.statusCode === "Success") {
                    setMessage("انتخابات جدید ایجاد شد")
                    setOpenAlert(true);
                    setAlertType("success");
                    setCreateElection({
                        name: '',
                        startDate: '',
                        endDate: '',
                        isEnabled: false,
                        isVoterHidden: false,
                        candidateCount: '',
                        userVoteCount: '',
                        ownerId: 0,
                        id: 0
                    });
                    setShowProgressBar("none");
                } else {
                    setMessage("لطفاً فرم را کامل کنید")
                    setOpenAlert(true);
                    setAlertType("error");
                    setShowProgressBar("none");
                }
            }
            response().catch(() => {
                setShowProgressBar("none")
            });
        }
    };

    const handleCreateElectionInputs = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setCreateElection({
            ...createElection,
            [e.target.name]: value
        })
    };

    const onStartDateHandler = (date) => {
        const dateObject = new Date(date);
        const sDay = new Intl.DateTimeFormat('en-US').format(dateObject);
        setCreateElection({
            ...createElection,
            startDate: sDay
        });
    };

    const onEndDateHandler = (date) => {
        const dateObject = new Date(date);
        const eDay = new Intl.DateTimeFormat('en-US').format(dateObject);
        setCreateElection({
            ...createElection,
            endDate: eDay
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
                                                onInput={handleCreateElectionInputs}
                                                sx={{background: 'white', width: '100%'}}
                                                label="عنوان انتخابات"
                                                variant="outlined"
                                                value={createElection.name}
                                                name="name"
                                            />
                                        </Grid2>
                                        <Grid2 xs={12} sm={4}>
                                            <LocalizationProvider dateAdapter={AdapterJalali}>
                                                <DatePicker
                                                    label="تاریخ شروع انتخابات"
                                                    mask="____/__/__"
                                                    value={createElection.startDate}
                                                    onChange={onStartDateHandler}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Grid2>
                                    </Stack>
                                    <Grid2 xs={12}>
                                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={4}>
                                            <Grid2 xs={12} lg={4} md={5}>
                                                <TextField
                                                    onInput={handleCreateElectionInputs}
                                                    sx={{background: 'white', width: {xs: '100%'}}}
                                                    label="تعداد کاندیدهای انتخابات"
                                                    value={createElection.candidateCount}
                                                    type="number"
                                                    name="candidateCount"
                                                />
                                            </Grid2>
                                            <Grid2 xs={12} lg={4} md={5}>
                                                <TextField
                                                    onInput={handleCreateElectionInputs}
                                                    sx={{background: 'white', width: {xs: '100%'}}}
                                                    label="تعداد رأی برای هر کاربر"
                                                    value={createElection.userVoteCount}
                                                    type="number"
                                                    name="userVoteCount"
                                                />
                                            </Grid2>
                                        </Stack>
                                    </Grid2>
                                    <Grid2 xs={12}>
                                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={4}>
                                            <Grid2 xs={12} lg={4} md={5} sm={6}>
                                                <LocalizationProvider dateAdapter={AdapterJalali}>
                                                    <DatePicker
                                                        label="تاریخ پایان انتخابات"
                                                        mask="____/__/__"
                                                        value={createElection.endDate}
                                                        onChange={onEndDateHandler}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </Grid2>
                                            <Grid2 xs={12} sm={6}>
                                                <FormControl>
                                                    <FormLabel component='legend'>رأی گیری مخفی</FormLabel>
                                                    <FormGroup>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Typography>خیر</Typography>
                                                            <Switch checked={createElection.isVoterHidden === true}
                                                                    onChange={handleCreateElectionInputs}
                                                                    name="isVoterHidden"/>
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
                                                            <Switch checked={createElection.isEnabled === true}
                                                                    onChange={handleCreateElectionInputs}
                                                                    name="isEnabled"/>
                                                            <Typography>فعال</Typography>
                                                        </Stack>
                                                    </FormGroup>
                                                </FormControl>
                                            </Grid2>
                                        </Stack>
                                    </Grid2>
                                    <Grid2 xs={12}>
                                        <SubmitButton variant="contained" type="submit">
                                            {params.id ? "ثبت تغییرات" : "ثبت"}
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

export default CreateElection;