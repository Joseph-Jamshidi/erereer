import React, {useEffect, useState} from 'react';
import ElectionsServices from "../Services/ElectionServices";
import {Box, Button, Typography} from "@mui/material";
import {ElectionBox} from "../StyledTags/VotableElectionTags";

const VotableElection = () => {

    const [activeElections, setActiveElections] = useState([])

    useEffect(() => {
        ElectionsServices.votableElection().then((r) => {
            setActiveElections(r.data);
        })
    }, []);

    return (
        <>
            {
                activeElections.map((e, i) =>
                    <Box key={e.id} sx={{background: 'white', p: '3px'}}>
                        <ElectionBox direction="row">
                            <Typography>{e.name} asdfd</Typography>
                            <Typography>{e.sendDate} asdfd</Typography>
                            <Button>شروع انتخابات</Button>
                        </ElectionBox>
                    </Box>
                )
            }
        </>
    );
};

export default VotableElection;