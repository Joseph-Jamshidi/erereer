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
import {AddCandidateService, EditCandidateService} from "../../Services/CandidateServices";
import {useParams} from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from '@mui/icons-material/PhotoCamera';


const AddCandidateForm = (props) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");
    const [candidateImage, setCandidateImage] = useState(null);
    const [extension, setExtension] = useState('');
    const [imageName, setImageName] = useState('');

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
            attachments: [{
                base64: candidateImage,
                extension: extension,
                name: imageName,
                electionId: params.id
            }],
            id: props.selectedCandidate ? props.selectedCandidate.id : 0
        };

        if (props.selectedCandidate.id) {
            const response = async () => {
                const result = await EditCandidateService(addCandidate);
                setMessage(result.message);
                setOpenAlert(true);
                setAlertType("info");
                if (result.statusCode === 'Success') {
                    handleCloseForm();
                    props.setIsUpdating(!props.isUpdating);
                }
            }
            response().catch(console.error);
        } else {
            const response = async () => {
                const result = await AddCandidateService(addCandidate);
                setMessage(result.message);
                setOpenAlert(true);
                setAlertType("info");
                if (result.statusCode === 'Success') {
                    handleCloseForm();
                    props.setIsUpdating(!props.isUpdating);
                } else {
                    setMessage(result.message);
                    setOpenAlert(true);
                    setAlertType("error");
                }
            }
            response().catch(console.error);
        }
    };

    const handleCloseForm = () => {
        props.setOpenAddForm(false);
        props.setSelectedCandidate({
            name: '',
            description: '',
            isEnabled: false,
            attachments: []
        });
    };

    const handleProfile = async (e) => {
        let base64FileContent = await toBase64(e.target.files[0]);
        setCandidateImage(base64FileContent);
        setExtension(e.target.files[0].name.split('.').slice(-1)[0]);
        setImageName(e.target.files[0].name.split('.')[0]);
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

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
                        <Button sx={{background: '#425C81', pr: 0, pl: 1, m: 1}} variant="contained" component="label">
                            <PhotoCamera/>
                            <Typography sx={{mx: 2}}>اپلود عکس</Typography>
                            <input hidden accept="image/*" multiple type="file" onChange={handleProfile}/>
                        </Button>
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