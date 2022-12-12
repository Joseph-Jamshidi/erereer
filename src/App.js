import React from 'react';
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
import CreateVote from "./Pages/CreateVote";
import Voting from "./Pages/Voting/Voting";
import CandidateManagement from "./Pages/CandidateManagement/CandidateManagement";
import VoterManagement from "./Pages/VoterManagement/VoterManagement";
import UserProfile from "./Pages/UserProfile";
import ResetPassword from "./Pages/ResetPassword";
import RegisterVerification from "./Pages/Register/RegisterVerification";
import Vote from "./Pages/Vote";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const App = () => {

    return (
        <>
            <CacheProvider value={cacheRtl}>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/Login" element={<Login/>}/>
                        <Route path="/Register" element={<Register/>}/>
                        <Route path="/RegisterVerification" element={<RegisterVerification/>}/>
                        <Route path="/CreateVote" element={<CreateVote/>}/>
                        <Route path="/CreateVote/:id" element={<CreateVote/>}/>
                        <Route path="/Voting" element={<Voting/>}/>
                        <Route path="/CandidateManagement/:id" element={<CandidateManagement/>}/>
                        <Route path="/VoterManagement/:id" element={<VoterManagement/>}/>
                        <Route path="/UserProfile" element={<UserProfile/>}/>
                        <Route path="/ResetPassword" element={<ResetPassword/>}/>
                        <Route path="/Vote/:id" element={<Vote/>}/>
                    </Routes>
                </BrowserRouter>
            </CacheProvider>
        </>
    );
};

export default App;