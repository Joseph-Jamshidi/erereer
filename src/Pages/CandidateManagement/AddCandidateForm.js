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
import {ProgressBarContext} from "../../Contexts/PublicContext";


const AddCandidateForm = (props) => {

    const [addCandidate, setAddCandidate] = useState({
        name: '',
        description: '',
        isEnabled: false,
        attachments: [],
        id: 0
    });
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState("info");

    const {setShowProgressBar} = useContext(ProgressBarContext);
    const params = useParams();

    useEffect(() => {
        const select = props.selectedCandidate;
        setAddCandidate({
            name: select.name,
            description: select.description,
            isEnabled: select.isEnabled,
            attachments: select.attachments,
            id: props.selectedCandidate.id
        })
    }, [props.selectedCandidate]);

    const handleSubmit = (e) => {
        setShowProgressBar("block");
        e.preventDefault();
        Object.assign(addCandidate, {electionId: params.id});

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
            response().catch(() => {
                setShowProgressBar("none")
            });
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
            response().catch(() => {
                setShowProgressBar("none")
            });
        }
    };

    const handleAddCandidateInputs = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setAddCandidate({
            ...addCandidate,
            [e.target.name]: value
        })
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
        setAddCandidate({
            ...addCandidate,
            attachments: [...addCandidate.attachments, newAttachment]
        });
    };
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleDelete = (id) => {
        const attachment = addCandidate.attachments;
        const imageList = attachment.filter((i) => i.id !== id);
        setAddCandidate({
            ...addCandidate,
            attachments: imageList
        });
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
                        <TextField margin="dense" label="نام و نام خانوادگی" fullWidth variant="standard" name="name"
                                   onInput={handleAddCandidateInputs} sx={{m: '10px'}} value={addCandidate.name}/>
                        <TextField label="توضیحات" multiline minRows={3} fullWidth variant="standard" sx={{m: '10px'}}
                                   onInput={handleAddCandidateInputs} name="description"
                                   value={addCandidate.description}/>
                        <Card sx={{width: "100%", my: 2, py: 1}}>
                            <Stack direction="row" spacing={3}>
                                <Button sx={{background: '#425C81', pr: 0, pl: 1, m: 1}} variant="contained"
                                        component="label">
                                    <PhotoCamera/>
                                    <Typography sx={{mx: 2}}>اپلود عکس</Typography>
                                    <input hidden accept="image/*" multiple type="file" onChange={handleProfile}/>
                                </Button>
                                {
                                    (addCandidate.attachments || []).map((image, index) =>
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
                                <Switch checked={addCandidate.isEnabled === true}
                                        onChange={handleAddCandidateInputs} name="isEnabled"/>
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