import React, {useState} from 'react';
import Header from "./Layout/Header";
import "./Styles/App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/Login";
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import Register from "./Pages/Register/Register";
import CreateElection from "./Pages/Election/CreateElection";
import ElectionsInProgress from "./Pages/Election/ElectionsInProgress";
import CandidateManagement from "./Pages/CandidateManagement/CandidateManagement";
import VoterManagement from "./Pages/VoterManagement/VoterManagement";
import UserProfile from "./Pages/UserProfile";
import ResetPassword from "./Pages/ResetPassword";
import RegisterVerification from "./Pages/Register/RegisterVerification";
import Vote from "./Pages/Vote/Vote";
import VoteHistory from "./Pages/Vote/VoteHistory";
import ForgetPassword from "./Pages/PasswordRecovery/ForgetPassword";
import SetNewPassword from "./Pages/PasswordRecovery/SetNewPassword";
import {Box} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import {ProgressBars} from "./StyledTags/HeaderTags";
import VoteResult from "./Pages/Vote/VoteResult";
import {ProgressBarContext} from "./Contexts/PublickContext";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const App = () => {

    const [showProgressBar, setShowProgressBar] = useState("none");

    return (
        <>
            <ProgressBarContext.Provider value={{setShowProgressBar}}>
                <CacheProvider value={cacheRtl}>
                    <BrowserRouter>
                        <ProgressBars>
                            <Box sx={{width: '100%'}} display={showProgressBar}>
                                <LinearProgress variant="query"/>
                            </Box>
                        </ProgressBars>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/Login" element={<Login/>}/>
                            <Route path="/Vote/:id" element={<Vote/>}/>
                            <Route path="/Register" element={<Register/>}/>
                            <Route path="/VoteResult/:id" element={<VoteResult/>}/>
                            <Route path="/VoteHistory" element={<VoteHistory/>}/>
                            <Route path="/UserProfile" element={<UserProfile/>}/>
                            <Route path="/ResetPassword" element={<ResetPassword/>}/>
                            <Route path="/SetNewPassword" element={<SetNewPassword/>}/>
                            <Route path="/ForgetPassword" element={<ForgetPassword/>}/>
                            <Route path="/CreateElection" element={<CreateElection/>}/>
                            <Route path="/CreateElection/:id" element={<CreateElection/>}/>
                            <Route path="/VoterManagement/:id" element={<VoterManagement/>}/>
                            <Route path="/ElectionsInProgress" element={<ElectionsInProgress/>}/>
                            <Route path="/RegisterVerification" element={<RegisterVerification/>}/>
                            <Route path="/CandidateManagement/:id" element={<CandidateManagement/>}/>
                        </Routes>
                    </BrowserRouter>
                </CacheProvider>
            </ProgressBarContext.Provider>
        </>
    );
};

export default App;