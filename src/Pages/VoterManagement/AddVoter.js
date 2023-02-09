import React, {useContext, useState} from 'react';
import {
    Alert,
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, IconButton, Snackbar,
    TextField
} from "@mui/material";
import {useParams} from "react-router-dom";
import {AddVoterService} from "../../Services/VoterServices";
import CloseIcon from "@mui/icons-material/Close";
import ProgressBarContext from "../../Contexts/PublickContext";


const AddVoter = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nationalCode, setNationalCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");

    const {setShowProgressBar} = useContext(ProgressBarContext);
    const params = useParams();

    const handleSubmit = (e) => {
        setShowProgressBar("block");
        e.preventDefault();
        const addVoter = {
            userVoters: [
                {
                    firstName: firstName,
                    lastName: lastName,
                    nationalCode: nationalCode,
                    phoneNumber: phoneNumber
                }
            ],
            userIds: [],
            electionId: params.id
        };
        const response = async () => {
            const result = await AddVoterService(addVoter);
            setMessage(result.message)
            setOpenAlert(true);
            setAlertType("info");
            props.setIsUpdating(!props.isUpdating);
            if (result.statusCode === 'Success') {
                handleCloseForm();
                props.setIsUpdating(!props.isUpdating);
                setShowProgressBar("none");
            } else {
                setMessage("لطفاً فرم را کامل کنید");
                setOpenAlert(true);
                setAlertType("error");
                setShowProgressBar("none");
            }
        };
        response().catch(console.error);
    };

    const handleCloseForm = () => {
        props.setOpenAddForm(false);
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
            <Dialog open={props.openAddForm} onClose={handleCloseForm}>
                <DialogTitle
                    variant="h5">اضافه کردن رأی دهنده</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            onChange={(e) => setFirstName(e.target.value)}
                            fullWidth variant="standard"
                            sx={{m: '10px'}}
                            margin="dense"
                            label="نام"
                        />
                        <TextField
                            onChange={(e) => setLastName(e.target.value)}
                            fullWidth variant="standard"
                            label="نام خانوادگی"
                            sx={{m: '10px'}}
                            margin="dense"
                        />
                        <TextField
                            onChange={(e) => setNationalCode(e.target.value)}
                            label="کد ملی" fullWidth
                            variant="standard"
                            sx={{m: '10px'}}
                            margin="dense"
                            type="number"
                        />
                        <TextField
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            fullWidth variant="standard"
                            label="شماره تلفن"
                            sx={{m: '10px'}}
                            margin="dense"
                            type="number"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseForm}>لفو</Button>
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

export default AddVoter;