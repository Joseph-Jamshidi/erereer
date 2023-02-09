import React, {useContext, useEffect, useState} from 'react';
import {
    Alert, Avatar, Badge,
    Box,
    Button, Card,
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
import ProgressBarContext from "../../Contexts/PublickContext";


const AddCandidateForm = (props) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");
    const [attachments, setAttachments] = useState([]);

    const {setShowProgressBar} = useContext(ProgressBarContext);
    const params = useParams();

    useEffect(() => {
        const select = props.selectedCandidate;
        setName(select.name);
        setDescription(select.description);
        setIsEnabled(select.isEnabled);
        setAttachments(select.attachments);
        setAttachments(select.attachments);
    }, [props.selectedCandidate]);

    const handleSubmit = (e) => {
        setShowProgressBar("block");
        e.preventDefault();
        const addCandidate = {
            name: name,
            description: description,
            isEnabled: isEnabled,
            electionId: params.id,
            attachments: attachments,
            id: props.selectedCandidate ? props.selectedCandidate.id : 0
        };

        if (props.selectedCandidate.id) {
            const response = async () => {
                const result = await EditCandidateService(addCandidate);
                setMessage(result.message);
                setOpenAlert(true);
                setAlertType("success");
                setShowProgressBar("none");
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
                setAlertType("success");
                setShowProgressBar("none");
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
        const base64FileContent = await toBase64(e.target.files[0]);
        const newAttachment = {
            base64: base64FileContent,
            electionId: params.id,
            extension: e.target.files[0].name.split('.').slice(-1)[0],
            name: e.target.files[0].name.split('.')[0]
        };

        setAttachments([...attachments, newAttachment]);
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleDelete = (id) => {
        const imageList = attachments.filter((i) => i.id !== id);
        setAttachments(imageList);
    };

    const handleCloseAlert = (e, reason) => {
        if (reason === "clickaway") {
            return
        }
        setOpenAlert(false);
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
                        <Card sx={{width: "100%", my: 2, py: 1}}>
                            <Stack direction="row" spacing={3}>
                                <Button sx={{background: '#425C81', pr: 0, pl: 1, m: 1}} variant="contained"
                                        component="label">
                                    <PhotoCamera/>
                                    <Typography sx={{mx: 2}}>اپلود عکس</Typography>
                                    <input hidden accept="image/*" multiple type="file" onChange={handleProfile}/>
                                </Button>
                                {
                                    (attachments || []).map((image, index) =>
                                        <Badge key={index} anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                                               badgeContent={
                                                   <IconButton onClick={() => handleDelete(image.id)}>
                                                       <CloseIcon/>
                                                   </IconButton>
                                               }>
                                            <Avatar variant="rounded" src={image.base64}/>
                                        </Badge>
                                    )
                                }
                            </Stack>
                        </Card>
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
                    <Button onClick={handleSubmit}>{props.selectedCandidate.id ? "ثبت تغییرات" : "افزودن"}</Button>
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