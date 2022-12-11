import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, MenuItem,
    Pagination, Paper, Select,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useParams} from "react-router-dom";
import VoterServices from "../../Services/VoteServices"
import {
    RowBox,
    RowNumber,
    Section,
    TitleText,
    AddTextButton,
    VoterButton,
    VoterText,
    MainDashboard,
    Pic, TitleBox, MainTitleText, TitleText2
} from "../../StyledTags/VoterManagementTags";
import Dashboard from "../../Layout/Dashboard";
import AddUser from "../../images/AddUser.png";
import AddVoter from "./AddVoter";


const VoterManagement = () => {

    const [delId, setDelId] = useState("");
    const [voter, setVoter] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pageCount, setPageCount] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const params = useParams();

    useEffect(() => {
        const response = async () => {
            const result = await VoterServices.getVoterList(params.id, pageNumber, pageSize);
            setVoter(result.data);
            setPageCount(result.total);
        }
        response();
    }, [pageNumber, pageSize, isUpdating]);

    const deleteVoter = (e) => {
        e.preventDefault();
        const response = async () => {
            const result = await VoterServices.deleteVoter(delId, params.id);
            alert(result.message);
            setIsUpdating(!isUpdating);
            setOpenDeleteDialog(false);
            setDelId("");
        }
        response();
    };

    const handleEditVoter = (e) => {
        e.preventDefault();
        alert("این سرویس هنوز راه اندازی نشده است")
    };

    const handleSelectedVoter = (e, id) => {
        e.preventDefault();
        setOpenDeleteDialog(true);
        setDelId(id);
    };

    const handleCloseDialog = (e) => {
        e.preventDefault();
        setOpenDeleteDialog(false);
        setDelId("");
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
                                    مدیریت رأی دهنده ها
                                </MainTitleText>
                            </TitleBox>
                            <VoterButton variant='contained' onClick={() => setOpenAddForm(true)}>
                                <Pic src={AddUser}/>
                                <AddTextButton>اضافه کردن</AddTextButton>
                            </VoterButton>
                            <AddVoter setIsUpdating={setIsUpdating} isUpdating={isUpdating}
                                      openAddForm={openAddForm} setOpenAddForm={setOpenAddForm}/>
                        </Stack>
                        {voter.length === 0 ?
                            <TitleText2>رأی دهنده ای وجود ندارد</TitleText2> :
                            <TableContainer component={Paper} sx={{display: {xs: 'none', md: 'block'}}}>
                                <Table sx={{minWidth: 650}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{pl: 2}}>ردیف</TableCell>
                                            <TableCell>نام و نام خانوادگی</TableCell>
                                            <TableCell>کد ملی</TableCell>
                                            <TableCell>شماره تلفن</TableCell>
                                            <TableCell>وضعیت</TableCell>
                                            <TableCell align="right" sx={{pr: 5}}>عملیات</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            voter.map((v, i) =>
                                                <TableRow key={v.id}>
                                                    <TableCell sx={{pl: 2}}>
                                                        {(pageNumber - 1) * 10 + (i + 1)}
                                                    </TableCell>
                                                    <TableCell>{v.firstName} {v.lastName}</TableCell>
                                                    <TableCell>{v.nationalCode}</TableCell>
                                                    <TableCell>{v.phoneNumber}</TableCell>
                                                    <TableCell>{v.isActive === true ? "فعال" : "غیر فعال"}</TableCell>
                                                    <TableCell sx={{pr: 1}}>
                                                        <Stack spacing={1} direction="row" justifyContent="flex-end">
                                                            <VoterButton
                                                                variant="contained"
                                                                onClick={(e) => handleSelectedVoter(e, v.id)}>حذف
                                                            </VoterButton>
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
                                                                            onClick={deleteVoter}>بله</Button>
                                                                </DialogActions>
                                                            </Dialog>
                                                            <VoterButton variant="contained"
                                                                         onClick={(e) => handleEditVoter(e, v.id)}>
                                                                ویرایش
                                                            </VoterButton>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                        <Grid2 sx={{display: {xs: 'block', md: 'none'}}}>
                            {
                                voter.map((v, i) =>
                                    <Section key={v.id}>
                                        <Stack direction="row">
                                            <RowBox>
                                                <RowNumber>{(pageNumber - 1) * 10 + (i + 1)}</RowNumber>
                                            </RowBox>
                                            <Grid2 xs={12}>
                                                <Stack direction="row" justifyContent="space-between" sx={{mb: '4px'}}>
                                                    <TitleText>نام و نام
                                                        خانوادگی:&nbsp;{v.firstName} {v.lastName}</TitleText>
                                                </Stack>
                                                <Stack direction={{xs: 'column', sm: 'row'}} sx={{mb: '4px'}}>
                                                    <Grid2 xs={6}>
                                                        <VoterText>
                                                            کدملی:&nbsp;{v.nationalCode}
                                                        </VoterText>
                                                    </Grid2>
                                                    <Grid2 xs={6}>
                                                        <VoterText>
                                                            شماره تلفن:&nbsp;{v.phoneNumber}
                                                        </VoterText>
                                                    </Grid2>
                                                </Stack>
                                                <Stack direction="row" sx={{mb: '4px'}}>
                                                    <VoterText>
                                                        وضعیت: &nbsp;{v.isActive === true ? "فعال" : "غیرفعال"}
                                                    </VoterText>
                                                </Stack>
                                            </Grid2>
                                            <Stack direction="column" justifyContent="space-around">
                                                <VoterButton variant="contained"
                                                             onClick={(e) => handleSelectedVoter(e, v.id)}>حذف
                                                </VoterButton>
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
                                                        <Button color="error" onClick={deleteVoter}>بله</Button>
                                                    </DialogActions>
                                                </Dialog>
                                                <VoterButton variant="contained"
                                                             onClick={(e) => handleEditVoter(e, v.id)}>
                                                    ویرایش
                                                </VoterButton>
                                            </Stack>
                                        </Stack>
                                    </Section>
                                )
                            }
                        </Grid2>
                        {
                            voter.length === 0 ? null :
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
                        }
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default VoterManagement;