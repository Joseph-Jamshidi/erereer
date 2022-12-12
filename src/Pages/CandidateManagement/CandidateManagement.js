import React, {useEffect, useRef, useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {
    AddTextButton, CandidateButton, CandidateText,
    MainDashboard, MainTitleText,
    Pic, RowBox, RowNumber,
    Section, TitleBox,
    TitleText
} from "../../StyledTags/CandidateManagementTags";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, MenuItem, Pagination, Paper, Select,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import Dashboard from "../../Layout/Dashboard";
import CandidateServices from "../../Services/CandidateServices"
import AddUser from "../../images/AddUser.png";
import AddCandidateForm from "./AddCandidateForm";
import {useParams} from "react-router-dom";

const CandidateManagement = () => {

    const [candidate, setCandidate] = useState([]);
    const [delId, setDelId] = useState("");
    const [selectedCandidate, setSelectedCandidate] = useState({
        isEnabled: false,
        name: '',
        description: ''
    });
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pageCount, setPageCount] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const editRef = useRef(null);
    const params = useParams();

    useEffect(() => {
        const response = async () => {
            const result = await CandidateServices.getCandidate(params.id,pageNumber, pageSize);
            setCandidate(result.data);
            setPageCount(result.total);
        }
        response().catch(console.error);
    }, [pageSize, pageNumber, isUpdating]);

    const deleteCandidate = (e) => {
        e.preventDefault();
        const response = async () => {
            const result = await CandidateServices.deleteCandidate(delId);
            alert(result.message);
            setIsUpdating(!isUpdating);
            setOpenDeleteDialog(false);
            setDelId("");
        }
        response().catch(console.error);
    };

    const editVoter = (e, id) => {
        e.preventDefault();
        const response = async () => {
            const result = await CandidateServices.chosenCandidate(id);
            const selectedInfo = result.data
            setSelectedCandidate(selectedInfo)
            editRef.current.click()
        }
        response().catch(console.error);
    };

    const handleSelectedCandidate = (e, id) => {
        e.preventDefault();
        setOpenDeleteDialog(true);
        setDelId(id);
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
        setDelId('');
    };

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
                        <Stack direction="row" justifyContent="space-between" sx={{mr: '12px'}}>
                            <TitleBox>
                                <MainTitleText>
                                    مدیریت کاندید ها
                                </MainTitleText>
                            </TitleBox>
                            <CandidateButton variant='contained' onClick={() => setOpenAddForm(true)} ref={editRef}>
                                <Pic src={AddUser}/>
                                <AddTextButton>اضافه کردن</AddTextButton>
                            </CandidateButton>
                            <AddCandidateForm selectedCandidate={selectedCandidate} setIsUpdating={setIsUpdating}
                                              setSelectedCandidate={setSelectedCandidate} isUpdating={isUpdating}
                                              openAddForm={openAddForm} setOpenAddForm={setOpenAddForm}/>
                        </Stack>
                        <TableContainer component={Paper} sx={{display: {xs: 'none', md: 'block'}}}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{pl: 2}}>ردیف</TableCell>
                                        <TableCell align="left">نام و نام خانوادگی</TableCell>
                                        <TableCell>توضیحات</TableCell>
                                        <TableCell>وضعیت</TableCell>
                                        <TableCell align="right" sx={{pr: 8}}>عملیات</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        candidate.map((c, i) =>
                                            <TableRow key={c.id}>
                                                <TableCell
                                                    sx={{pl: 2}}>{(pageNumber - 1) * 10 + (i + 1)}</TableCell>
                                                <TableCell align="left">{c.name}</TableCell>
                                                <TableCell>{c.description}</TableCell>
                                                <TableCell>{c.isEnabled === true ? "فعال" : "غیر فعال"}</TableCell>
                                                <TableCell sx={{pr: 1}}>
                                                    <Stack spacing={2} direction="row" justifyContent="flex-end">
                                                        <CandidateButton
                                                            variant="contained"
                                                            onClick={(e) => handleSelectedCandidate(e, c.id)}>حذف
                                                        </CandidateButton>
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
                                                                <Button color="success" onClick={handleCloseDialog}>
                                                                    خیر
                                                                </Button>
                                                                <Button color="error"
                                                                        onClick={deleteCandidate}>بله</Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                        <CandidateButton variant="contained"
                                                                         onClick={(e) => editVoter(e, c.id)}>
                                                            ویرایش
                                                        </CandidateButton>
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
                                candidate.map((c, i) =>
                                    <Section key={c.id}>
                                        <Stack direction="row">
                                            <RowBox>
                                                <RowNumber>{(pageNumber - 1) * 10 + (i + 1)}</RowNumber>
                                            </RowBox>
                                            <Grid2 xs={12}>
                                                <Stack direction="row" justifyContent="space-between" sx={{mb: '4px'}}>
                                                    <TitleText>نام و نام خانوادگی:&nbsp;{c.name}</TitleText>
                                                </Stack>
                                                <Stack direction={{xs: 'column'}} sx={{mb: '4px'}}>
                                                    <Grid2 xs={12}>
                                                        <CandidateText>
                                                            توضیحات:&nbsp;{c.description}
                                                        </CandidateText>
                                                    </Grid2>
                                                    <Grid2 xs={12}>
                                                        <CandidateText>
                                                            وضعیت:&nbsp;{c.isEnabled === true ? "فعال" : "غیرفعال"}
                                                        </CandidateText>
                                                    </Grid2>
                                                </Stack>
                                            </Grid2>
                                            <Stack direction="column" justifyContent="space-around">
                                                <CandidateButton variant="contained"
                                                                 onClick={(e) => handleSelectedCandidate(e, c.id)}>حذف
                                                </CandidateButton>
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
                                                        <Button color="success" onClick={handleCloseDialog}>
                                                            خیر
                                                        </Button>
                                                        <Button color="error" onClick={deleteCandidate}>بله</Button>
                                                    </DialogActions>
                                                </Dialog>
                                                <CandidateButton variant="contained"
                                                                 onClick={(e) => editVoter(e, c.id)}>
                                                    ویرایش
                                                </CandidateButton>
                                            </Stack>
                                        </Stack>
                                    </Section>
                                )
                            }
                        </Grid2>
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
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default CandidateManagement;