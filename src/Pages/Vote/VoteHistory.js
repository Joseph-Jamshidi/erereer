import React, {useContext, useEffect, useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import {MainDashboard} from "../../StyledTags/VoteHistoryTags";
import Dashboard from "../../Layout/Dashboard";
import {VoteHistoryService} from "../../Services/VoteServices";
import {
    FormControl, MenuItem,
    Pagination,
    Paper, Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {MainTitleText, RowBox, RowNumber, Section, TitleBox, VoteText, TitleText} from "../../StyledTags/VoteTags";
import ProgressBarContext from "../../Contexts/PublickContext";
import {toPersianNumber} from "../../Common/Utitlity";

const VoteHistory = () => {

    const [votes, setVotes] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState('');

    const {setShowProgressBar} = useContext(ProgressBarContext);

    useEffect(() => {
        setShowProgressBar("block");
        const response = async () => {
            const result = await VoteHistoryService(1, 10)
            setVotes(result.data);
            setPageCount(result.total);
            setShowProgressBar("none");
        }
        response().catch(console.error);
    }, [pageNumber, pageSize]);

    return (
        <>
            <Grid2 container sx={{width: '98%', mx: 'auto', mt: '32px'}}>
                <Grid2 md={3} lg={2}>
                    <MainDashboard container sx={{display: {md: 'block', xs: 'none'}}}>
                        <Dashboard/>
                    </MainDashboard>
                </Grid2>
                <Grid2 md={9} lg={10} sx={{width: '100%', pl: {md: '10px'}}}>
                    <Grid2 sx={{borderRadius: '4px', border: '1px solid #425C81'}}>
                        <Stack direction="row" justifyContent="space-between" sx={{mr: '12px'}}>
                            <TitleBox>
                                <MainTitleText>
                                    رأی های من
                                </MainTitleText>
                            </TitleBox>
                        </Stack>
                        <TableContainer component={Paper} sx={{display: {xs: 'none', md: 'block'}}}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ردیف</TableCell>
                                        <TableCell>عنوان انتخابات</TableCell>
                                        <TableCell align="center">کاندیدهای انتخاب شده</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        votes?.map((v, index) =>
                                            <TableRow key={v.id}>
                                                <TableCell sx={{pl: 2}}>
                                                    {toPersianNumber((pageNumber - 1) * 10 + (index + 1))}
                                                </TableCell>
                                                <TableCell>{v.election.name}</TableCell>
                                                <TableCell align="center">
                                                    {
                                                        v.voteCandidates.map((c) =>
                                                            <React.Fragment key={c.candidate.id}>
                                                                <div>{c.candidate.name}</div>
                                                            </React.Fragment>
                                                        )
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid2 sx={{display: {xs: 'block', md: 'none'}}}>
                            {
                                votes?.map((v, index) =>
                                    <Section key={v.id}>
                                        <Stack direction="row">
                                            <RowBox>
                                                <RowNumber>{(pageNumber - 1) * 10 + (index + 1)}</RowNumber>
                                            </RowBox>
                                            <Grid2 xs={12}>
                                                <Stack direction="row" justifyContent="space-between" sx={{mb: '4px'}}>
                                                    <TitleText variant="h5">عنوان
                                                        انتخابات:&nbsp;{v.election.name}</TitleText>
                                                </Stack>
                                                <Stack direction="column" justifyContent="space-start" sx={{mb: '4px'}}>
                                                    <Grid2 xs={12}>
                                                        <VoteText>کاندید های انتخاب شده:</VoteText>
                                                    </Grid2>
                                                    <Grid2 xs={12}>
                                                        {
                                                            v.voteCandidates?.map((c) =>
                                                                <Grid2 key={c.candidate.id}>
                                                                    <Grid2 sx={{pl: 2}}>
                                                                        <VoteText>{c.candidate.name}</VoteText>
                                                                    </Grid2>
                                                                </Grid2>
                                                            )
                                                        }
                                                    </Grid2>
                                                </Stack>
                                            </Grid2>
                                        </Stack>
                                    </Section>
                                )
                            }
                        </Grid2>
                    </Grid2>
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
                </Grid2>
            </Grid2>
        </>
    );
};

export default VoteHistory;