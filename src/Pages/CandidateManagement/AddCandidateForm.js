import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormGroup, IconButton, Snackbar, Stack, Switch,
    TextField, Typography
} from "@mui/material";
import CandidateServices from "../../Services/CandidateServices";
import {useParams} from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";


const AddCandidateForm = (props) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const params = useParams();

    useEffect(() => {
        const select = props.selectedCandidate;
        setName(select.name);
        setDescription(select.description);
        setIsEnabled(select.isEnabled);
    }, [props.selectedCandidate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const addCandidate = {
            name: name,
            description: description,
            isEnabled: isEnabled,
            electionId: params.id,
            id: props.selectedCandidate ? props.selectedCandidate.id : 0
        };
        if (props.selectedCandidate.id) {
            const response = async () => {
                const result = await CandidateServices.editCandidate(props.selectedCandidate.id, addCandidate);
                setMessage(result.message)
                setOpenAlert(true);
                setAlertType("info");
                if (result.statusCode === 'Success') {
                    handleCloseForm()
                    props.setIsUpdating(!props.isUpdating);
                }
            }
            response().catch(console.error);
        } else {
            const response = async () => {
                const result = await CandidateServices.addCandidate(addCandidate);
                setMessage(result.message)
                setOpenAlert(true);
                setAlertType("info");
                if (result.statusCode === 'Success') {
                    props.setIsUpdating(!props.isUpdating);
                } else {
                    setMessage(result.message)
                    setOpenAlert(true);
                    setAlertType("error");                }
            }
            response().catch(console.error);
        }
    }

    const handleCloseForm = () => {
        props.setOpenAddForm(false);
        props.setSelectedCandidate({
            name: '',
            description: '',
            isEnabled: false
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
            <Dialog open={props.openAddForm} onClose={handleCloseForm}>
                <DialogTitle
                    variant="h5">{props.selectedCandidate.id ? "ویرایش کاندید" : "اضافه کردن کاندید"}</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField margin="dense" label="نام و نام خانوادگی" fullWidth variant="standard"
                                   onChange={(e) => setName(e.target.value)}
                                   sx={{m: '10px'}} value={name}
                        />
                        <TextField label="توضیحات" multiline minRows={3} fullWidth variant="standard"
                                   onChange={(e) => setDescription(e.target.value)}
                                   sx={{m: '10px'}} value={description}
                        />
                        <FormGroup>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography>غیر فعال</Typography>
                                <Switch checked={isEnabled === true}
                                        onChange={() => setIsEnabled(!isEnabled)}/>
                                <Typography>فعال</Typography>
                            </Stack>
                        </FormGroup>
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

export default AddCandidateForm;