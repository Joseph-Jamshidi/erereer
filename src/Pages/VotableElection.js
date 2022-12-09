import React, {useEffect, useState} from 'react';
import ElectionsServices from "../Services/ElectionServices";
import {Box, Container} from "@mui/material";
import {ElectionBox, ElectionButton, ElectionItems, HeaderText, Pic} from "../StyledTags/HomePageTags";
import {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import Rectangle11082 from "../images/Rectangle11082.png"
import Grid2 from "@mui/material/Unstable_Grid2";

const VotableElection = () => {

    const [activeElections, setActiveElections] = useState([])

    useEffect(() => {
        ElectionsServices.votableElection().then((r) => {
            setActiveElections(prepareData(r.data));
        })
    }, []);

    const convertTime = (date) => {
        const dateObj = new Date(date);
        const object = {dateObj, format: "DD-MM-YYYY"}
        const persianDate = new DateObject(object).convert(persian, persian_en).format();
        return (persianDate)
    };

    const prepareData = (elections) => {
        return elections.map(m => {
            m.persianStartDate = convertTime(m.startDate);
            m.persianEndDate = convertTime(m.endDate);
            return m;
        });
    };

    return (
        <>
            {activeElections.length !== 0 ?
                <>
                    <Container maxWidth="sm">
                        <Grid2 display="flex" justifyContent={{xs: "center", md: "flex-start"}}>
                            <Pic src={Rectangle11082}/>
                        </Grid2>
                        {
                            activeElections.map((e) =>
                                <Box key={e.id} sx={{background: '#EAF8FF', p: '3px'}}>
                                    <ElectionBox direction="row" justifyContent="space-between">
                                        <ElectionItems>عنوان: {e.name}</ElectionItems>
                                        <ElectionItems>مهلت: {e.persianEndDate}</ElectionItems>
                                        <ElectionButton>شرکت</ElectionButton>
                                    </ElectionBox>
                                </Box>
                            )
                        }
                    </Container>
                </> :
                <Grid2 sx={{width: '100%', my: '1%'}}>
                    <HeaderText>
                        انتخاباتی فعالی وجئد ندارد
                    </HeaderText>
                </Grid2>
            }
        </>
    );
};

export default VotableElection;