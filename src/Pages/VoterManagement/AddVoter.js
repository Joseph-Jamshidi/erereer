import React, {useState} from 'react';
import {
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import {useParams} from "react-router-dom";
import VoteServices from "../../Services/VoteServices";


const AddVoter = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nationalCode, setNationalCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const params = useParams();

    const handleSubmit = (e) => {
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
            electionId: params.id
        };

        VoteServices.addVoter(addVoter).then((res) => {
            alert(res.message);
            props.setIsUpdating(!props.isUpdating);
            if (res.statusCode === 'Success') {
                handleClose();
                props.setIsUpdating(!props.isUpdating);
            } else {
                alert(res.message)
            }
        })
    };

    const handleClose = () => {
        props.setOpenAddForm(false);
    };

    return (
        <>
            <Dialog open={props.openAddForm} onClose={handleClose}>
                <DialogTitle
                    variant="h5">اضافه کردن رأی دهنده</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField margin="dense" label="نام" fullWidth variant="standard"
                                   onChange={(e) => setFirstName(e.target.value)} sx={{m: '10px'}}
                        />
                        <TextField margin="dense" label="نام خانوادگی" fullWidth variant="standard"
                                   onChange={(e) => setLastName(e.target.value)} sx={{m: '10px'}}
                        />
                        <TextField margin="dense" label="کد ملی" fullWidth variant="standard" type="number"
                                   onChange={(e) => setNationalCode(e.target.value)} sx={{m: '10px'}}
                        />
                        <TextField margin="dense" label="شماره تلفن" fullWidth variant="standard" type="number"
                                   onChange={(e) => setPhoneNumber(e.target.value)} sx={{m: '10px'}}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>لفو</Button>
                    <Button onClick={handleSubmit}>افزودن</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddVoter;