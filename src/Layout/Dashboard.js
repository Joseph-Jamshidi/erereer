import React, {useState} from 'react';
import {List, ListItemButton, Stack} from "@mui/material";
import {
    CollapseMenu,
    DashboardButton,
    DashboardList,
    DashboardText,
    MenuItems,
    Pic,
    Pic2,
    Text,
    TextCollapse, UserNameText
} from '../StyledTags/DashboardTags';
import circle1 from "../images/circle1.png";
import TimeSquare from "../images/TimeSquare.png";
import EditSquare from "../images/EditSquare.png";
import Login from "../images/Login.png";
import Ellipse655 from "../images/Ellipse655.png";
import Profile from "../images/Profile.png";
import Document from "../images/Document.png";
import circle2 from "../images/circle2.png";
import {UserInfo} from "../Services/info";

const Dashboard = () => {

    const [openMyElectionCollapse, setOpenMyElectionCollapse] = useState(false);

    const handleCollapse = () => {
        setOpenMyElectionCollapse(!openMyElectionCollapse);
    };

    const logOut = () => {
        localStorage.clear();
        window.location.href = "/"
    };

    return (
        <>
            <Stack direction="column" sx={{my: {md: '20px'}}}>
                <Stack justifyContent="center" sx={{mx: 'auto', my: '5%'}}>
                    <img src={Ellipse655} alt=""/>
                    <UserNameText>{UserInfo.firstName} {UserInfo.lastName}</UserNameText>
                </Stack>
                <Stack sx={{my: '8px', mx: '12px'}}>
                    <List>
                        <DashboardList>
                            <MenuItems to="../UserProfile">
                                <DashboardButton>
                                    <DashboardText>
                                        <Stack direction="row">
                                            <Pic src={Profile}/>
                                            <Text sx={{my: 'auto'}}>پروفایل</Text>
                                        </Stack>
                                    </DashboardText>
                                </DashboardButton>
                            </MenuItems>
                        </DashboardList>
                        <DashboardList>
                            <DashboardButton onClick={handleCollapse}>
                                <DashboardText>
                                    <Stack direction='row'>
                                        <Pic src={Document}/>
                                        <Text sx={{mt: 'auto'}}>انتخابات های من</Text>
                                    </Stack>
                                </DashboardText>
                            </DashboardButton>
                        </DashboardList>
                        <CollapseMenu in={openMyElectionCollapse} timeout="auto" unmountOnExit
                                      sx={{background: '#EAF8FF'}}>
                            <List component="div" disablePadding>
                                <MenuItems to="../CreateElection">
                                    <ListItemButton>
                                        <Stack direction='row'>
                                            <Pic2 src={circle1}/>
                                            <TextCollapse>ایجاد انتخابات جدید</TextCollapse>
                                        </Stack>
                                    </ListItemButton>
                                </MenuItems>
                                <MenuItems to="../ElectionsInProgress">
                                    <ListItemButton>
                                        <Stack direction='row'>
                                            <Pic2 src={circle2}/>
                                            <TextCollapse>انتخابات های در حال اجرا</TextCollapse>
                                        </Stack>
                                    </ListItemButton>
                                </MenuItems>
                            </List>
                        </CollapseMenu>
                        <DashboardList>
                            <MenuItems to="">
                                <DashboardButton>
                                    <DashboardText>
                                        <Stack direction='row'>
                                            <Pic src={TimeSquare}/>
                                            <Text sx={{mt: 'auto'}}>سابقه رأی</Text>
                                        </Stack>
                                    </DashboardText>
                                </DashboardButton>
                            </MenuItems>
                        </DashboardList>
                        <DashboardList>
                            <MenuItems to="">
                                <DashboardButton>
                                    <DashboardText>
                                        <Stack direction='row'>
                                            <Pic src={EditSquare}/>
                                            <Text sx={{mt: 'auto'}}>لیست کاربران وارد کرده</Text>
                                        </Stack>
                                    </DashboardText>
                                </DashboardButton>
                            </MenuItems>
                        </DashboardList>
                        <DashboardList>
                            <MenuItems>
                                <DashboardButton onClick={logOut}>
                                    <DashboardText>
                                        <Stack direction='row'>
                                            <Pic src={Login}/>
                                            <Text sx={{mt: 'auto'}}>خروج از حساب کاربری</Text>
                                        </Stack>
                                    </DashboardText>
                                </DashboardButton>
                            </MenuItems>
                        </DashboardList>
                    </List>
                </Stack>
            </Stack>
        </>
    );
};

export default Dashboard;