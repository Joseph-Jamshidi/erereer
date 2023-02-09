import React, {useContext, useEffect, useState} from 'react';
import {
    ElectionButton,
    ElectionText,
    LinkButton,
    ManageButton,
    RowNumber,
    Section,
    TitleText
} from "../../StyledTags/ElectionTags";
import {
    Alert,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl, IconButton,
    MenuItem,
    Pagination, Paper,
    Select, Snackbar,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip
} from "@mui/material";
import {DeleteElectionService, GetElectionService} from "../../Services/ElectionServices";
import {useNavigate} from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';
import CloseIcon from "@mui/icons-material/Close";
import {toPersianNumber} from "../../Common/Utitlity"
import ProgressBarContext from "../../Contexts/PublickContext";

const ElectionList = ({afterGetVotingList}) => {

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [delId, setDelId] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");
    const [elections, setElections] = useState([{
        name: '',
        startDate: '',
        endDate: '',
        candidateCount: '',
        userVoteCount: '',
        id: ''
    }]);

    const {setShowProgressBar} = useContext(ProgressBarContext);
    let navigate = useNavigate();

    useEffect(() => {
        setShowProgressBar("block");
        const response = async () => {
            const result = await GetElectionService(pageNumber, pageSize);
            setElections(prepareData(result.data));
            setPageCount(result.total);
            afterGetVotingList(result.count);
            setShowProgressBar("none");
        }
        response().catch(console.error);
    }, [pageNumber, pageSize, isUpdating]);

    const prepareData = (elections) => {
        return elections.map(m => {
            m.persianStartDate = convertTime(m.startDate);
            m.persianEndDate = convertTime(m.endDate);
            return m;
        });
    };

    const convertTime = (date) => {
        const dateObject = new Date(date);
        const persianDate = new Intl.DateTimeFormat('fa-IR').format(dateObject);
        return (persianDate);
    };

    const handleCandidateManagement = (e, id) => {
        e.preventDefault();
        navigate(`../CandidateManagement/${id}`);
    };

    const handleVoterManagement = (e, id) => {
        e.preventDefault();
        navigate(`../VoterManagement/${id}`);
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
        setDelId('');
    };

    const handleSelectedVote = (e, id) => {
        e.preventDefault();
        setOpenDeleteDialog(true);
        setDelId(id);
    };

    const handleDelete = (e) => {
        setShowProgressBar("block");
        e.preventDefault();
        const response = async () => {
            await DeleteElectionService(delId);
            setDelId("");
            setIsUpdating(!isUpdating);
            setOpenDeleteDialog(false);
            setMessage("انتخابات انتخاب شده حذف گردید")
            setOpenAlert(true);
            setAlertType("success");
            setShowProgressBar("none");
        };
        response().catch(console.error);
    };

    const handleEdit = (e, id) => {
        e.preventDefault();
        navigate(`../CreateElection/${id}`);
    };

    const handleCloseAlert = (e, reason) => {
        if (reason === "clickaway") {
            return
        }
        setOpenAlert(false)
    };

    const close = (
        <IconButton sx={{p: 0}} onClick={() => setOpenAlert(false)}>
            <CloseIcon/>
        </IconButton>
    );

    return (
        <>
            <TableContainer component={Paper} sx={{display: {xs: 'none', md: 'block'}}}>
                <Table>
                    <TableHead sx={{background: 'silver'}}>
                        <TableRow>
                            <TableCell sx={{pl: 2}}>ردیف</TableCell>
                            <TableCell>عنوان انتخابات</TableCell>
                            <TableCell align="center">تاریخ شروع انتخابات</TableCell>
                            <TableCell align="center">تاریخ پایان انتخابات</TableCell>
                            <TableCell align="center">تعداد کاندیدها</TableCell>
                            <TableCell align="center">تعداد رأی هر کاربر</TableCell>
                            <TableCell colSpan={4} align="right" sx={{pr: 4}}>علملیات</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            elections.map((el, i) =>
                                <TableRow key={el.id}>
                                    <TableCell sx={{pl: 2}}>{toPersianNumber((pageNumber - 1) * 10 + (i + 1))}</TableCell>
                                    <TableCell>{el.name}</TableCell>
                                    <TableCell align="center">{el.persianStartDate}</TableCell>
                                    <TableCell align="center">{el.persianEndDate}</TableCell>
                                    <TableCell align="center">{toPersianNumber(el.candidateCount)}</TableCell>
                                    <TableCell align="center">{toPersianNumber(el.userVoteCount)}</TableCell>
                                    <TableCell sx={{pl: 1}}>
                                        <Stack direction="row" justifyContent="flex-end">
                                            <Stack direction="column" alignItems="center">
                                                <Tooltip title="مدیریت کاندیدها">
                                                    <ElectionButton
                                                        onClick={(e) => handleCandidateManagement(e, el.id)}>
                                                        <ManageAccountsIcon/>
                                                    </ElectionButton>
                                                </Tooltip>
                                                <Tooltip title="مدیریت رأی دهنده ها">
                                                    <ElectionButton onClick={(e) => handleVoterManagement(e, el.id)}>
                                                        <GroupsIcon/>
                                                    </ElectionButton>
                                                </Tooltip>
                                            </Stack>
                                            <Stack direction="column" alignItems="center">
                                                <Tooltip title="حذف">
                                                    <ElectionButton onClick={(e) => handleSelectedVote(e, el.id)}>
                                                        <DeleteIcon fontSize="medium"/>
                                                    </ElectionButton>
                                                </Tooltip>
                                                <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
                                                    <DialogTitle id="alert-dialog-title">{"اخطار!"}</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            آیا از حذف انتخابات مطمئن اید؟
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button color="success" onClick={handleCloseDialog}>خیر</Button>
                                                        <Button color="error" onClick={handleDelete}>بله</Button>
                                                    </DialogActions>
                                                </Dialog>
                                                <Tooltip title="ویرایش">
                                                    <ElectionButton onClick={(e) => handleEdit(e, el.id)}>
                                                        <EditIcon fontSize="medium"/>
                                                    </ElectionButton>
                                                </Tooltip>
                                            </Stack>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid2 sx={{display: {xs: 'block', md: 'none'}}}>
                {
                    elections.map((el, i) =>
                        <Section key={el.id}>
                            <Stack direction="row">
                                <RowNumber>{toPersianNumber((pageNumber - 1) * 10 + (i + 1))}.</RowNumber>
                                <Grid2 xs={12}>
                                    <Stack direction="row" justifyContent="space-between" sx={{mb: '4px'}}>
                                        <TitleText variant="h5">عنوان انتخابات:&nbsp;{el.name}</TitleText>
                                    </Stack>
                                    <Stack direction={{xs: 'column', sm: "row"}} justifyContent="space-start"
                                           sx={{mb: '4px'}}>
                                        <Grid2 xs={12} sm={6}>
                                            <ElectionText>تاریخ شروع انتخابات:&nbsp;{el.persianStartDate}</ElectionText>
                                        </Grid2>
                                        <Grid2 xs={12} sm={6}>
                                            <ElectionText>تاریخ پایان انتخابات:&nbsp;{el.persianEndDate}</ElectionText>
                                        </Grid2>
                                    </Stack>
                                    <Stack direction={{xs: 'column', sm: "row"}} justifyContent="space-start"
                                           sx={{mb: '4px'}}>
                                        <Grid2 xs={12} sm={6}>
                                            <ElectionText>
                                                تعداد کاندید های انتخابات:&nbsp;{toPersianNumber(el.candidateCount)}
                                            </ElectionText>
                                        </Grid2>
                                        <Grid2 xs={12} sm={6}>
                                            <ElectionText>
                                                تعداد رأی برای هر کاربر:&nbsp;{toPersianNumber(el.userVoteCount)}
                                            </ElectionText>
                                        </Grid2>
                                    </Stack>
                                    <Stack direction={{sm: 'row'}} justifyContent="space-between" sx={{mb: '4px'}}>
                                        <Grid2 xs={12} sm={6}>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Grid2 xs={6}>
                                                    <LinkButton>
                                                        <ManageButton variant="contained"
                                                                      onClick={(e) => handleCandidateManagement(e, el.id)}>
                                                            مدیریت کاندید ها
                                                        </ManageButton>
                                                    </LinkButton>
                                                </Grid2>
                                                <Grid2 xs={6}>
                                                    <LinkButton>
                                                        <ManageButton variant="contained"
                                                                      onClick={(e) => handleVoterManagement(e, el.id)}>
                                                            مدیریت رأی دهنده
                                                        </ManageButton>
                                                    </LinkButton>
                                                </Grid2>
                                            </Stack>
                                        </Grid2>
                                    </Stack>
                                </Grid2>
                                <Stack direction="column" justifyContent="space-around">
                                    <ElectionButton onClick={(e) => handleSelectedVote(e, el.id)}>
                                        <DeleteIcon fontSize="medium"/>
                                    </ElectionButton>
                                    <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
                                        <DialogTitle id="alert-dialog-title">
                                            {"اخطار!"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                آیا از حذف انتخابات مطمئن اید؟
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button color="success" onClick={handleCloseDialog}>خیر</Button>
                                            <Button color="error" onClick={handleDelete}>بله</Button>
                                        </DialogActions>
                                    </Dialog>
                                    <ElectionButton onClick={(e) => handleEdit(e, el.id)}>
                                        <EditIcon fontSize="medium"/>
                                    </ElectionButton>
                                </Stack>
                            </Stack>
                        </Section>
                    )
                }
            </Grid2>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
            >
                <Alert severity={alertType} action={close}>{message}</Alert>
            </Snackbar>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Pagination count={Math.ceil(pageCount / pageSize)} dir="ltr"
                            onChange={(_, e) => setPageNumber(e)}/>

                <FormControl sx={{m: 1, p: 0}}>
                    <Select
                        value={pageSize}
                        onChange={(e) => setPageSize(e.target.value)}
                        inputProps={{'aria-label': 'Without label'}}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
        </>
    );
};

export default ElectionList;