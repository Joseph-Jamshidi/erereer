import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormGroup, Stack, Switch,
    TextField, Typography
} from "@mui/material";
import CandidateServices from "../../Services/CandidateServices";
import {useParams} from "react-router-dom";


const AddCandidateForm = (props) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
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
                alert(result.message)
                if (result.statusCode === 'Success') {
                    handleClose()
                    props.setIsUpdating(!props.isUpdating);
                }
            }
            response().catch(console.error);
        } else {
            const response = async () => {
                const result = await CandidateServices.addCandidate(addCandidate);
                alert(result.message);
                if (result.statusCode === 'Success') {
                    props.setIsUpdating(!props.isUpdating);
                } else {
                    alert(result.message)
                }
            }
            response().catch(console.error);
        }
    }

    const handleClose = () => {
        props.setOpenAddForm(false);
        props.setSelectedCandidate({
            name: '',
            description: '',
            isEnabled: false
        });
    };

    return (
        <>
            <Dialog open={props.openAddForm} onClose={handleClose}>
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
                    <Button onClick={handleClose}>لفو</Button>
                    <Button onClick={handleSubmit}>افزودن</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddCandidateForm;