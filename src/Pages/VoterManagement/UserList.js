import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, IconButton, MenuItem, Pagination, Select,
    Snackbar, Stack, TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {UserListByFirstNameService, UserListByLastNameService, UserListService} from "../../Services/UserServices";
import {NameBox, NumberBox, UserBox} from "../../StyledTags/VoterManagementTags";
import {AddVoterService} from "../../Services/VoterServices";

const UserList = (props) => {

    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState('');
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");
    const [users, setUsers] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [chosenUsers, setChosenUsers] = useState([]);

    useEffect(() => {
        const response = async () => {
            const result = await UserListService(pageNumber, pageSize);
            setUsers(result.data);
            setPageCount(result.total);
        };
        response().catch(console.error);
    }, [pageNumber, pageSize, isUpdating]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const voters = {
            electionId: props.electionId,
            userVoters: chosenUsers
        }
        const response = async () => {
            const result = await AddVoterService(voters);
            if (result.isSuccess === true) {
                setChosenUsers([]);
                setMessage(result.message);
                setOpenAlert(true);
                setAlertType("success");
                props.setIsUpdating(!props.isUpdating);
            } else {
                setMessage(result.message);
                setOpenAlert(true);
                setAlertType("error");
            }
        }
        response().catch(console.error)
    };

    const handleFirstNameSearch = (e) => {
        const response = async () => {
            const result = await UserListByFirstNameService(e.target.value);
            setUsers(result.data);
            setPageCount(result.count);
        };

        response().catch(console.error);
    };

    const handleLastNameSearch = (e) => {
        const response = async () => {
            const result = await UserListByLastNameService(e.target.value);
            setUsers(result.data);
            setPageCount(result.count);
        };
        response().catch(console.error);
    };

    const handleCloseList = () => {
        props.setOpenUserList(false);
        setChosenUsers([]);
        setIsUpdating(!isUpdating);
    };

    const handleChoose = (e, id) => {
        if (e.target.checked) {
            setChosenUsers([...chosenUsers, id])
        } else {
            setChosenUsers(chosenUsers.filter(user => user !== id));
        }
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
            <Dialog open={props.openUserList} onClose={handleCloseList}>
                <DialogTitle
                    variant="h5">اضافه کردن رأی دهنده</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack direction="column" alignItems="center" spacing={1}
                               sx={{width: {sm: '80%'}, mx: 'auto', mb: '10px'}}>
                            <TextField
                                fullWidth
                                id="standard-search"
                                label="جستجو بر اساس نام"
                                onInput={handleFirstNameSearch}
                            />
                            <TextField
                                fullWidth
                                id="standard-search"
                                label="جستجو بر اساس نام خانوادگی"
                                onInput={(e) => handleLastNameSearch}
                            />
                        </Stack>
                        {
                            users.map((u, index) =>
                                <UserBox key={u.id} direction="row" alignItems="center">
                                    <NumberBox>{(pageNumber - 1) * 10 + (index + 1)}</NumberBox>
                                    <NameBox sx={{flex: 1}}>{u.firstName}&nbsp;{u.lastName}</NameBox>
                                    <Checkbox
                                        sx={{p: 0}}
                                        onChange={(e) => handleChoose(e, u.id)}
                                        checked={chosenUsers.includes(u.id)}>
                                    </Checkbox>
                                </UserBox>
                            )
                        }
                    </Box>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseList}>لفو</Button>
                    <Button onClick={handleSubmit}>افزودن</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
            >
                <Alert severity={alertType} action={closeIcon}>{message}</Alert>
            </Snackbar>
        </>
    );
};

export default UserList;