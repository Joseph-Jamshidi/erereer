import React, {useState} from 'react';
import {Divider, List, ListItemButton, Stack} from "@mui/material";
import {
    CollapseMenu,
    DashboardButton,
    DashboardList,
    DashboardText,
    MenuItems,
    Pic,
    Pic2, Pic3,
    Text,
    TextCollapse, UserNameText
} from '../StyledTags/DashboardTags';
import circle1 from "../images/circle1.png";
import TimeSquare from "../images/TimeSquare.png";
import EditSquare from "../images/EditSquare.png";
import Login from "../images/Login.png";
import Profile from "../images/Profile.png";
import Document from "../images/Document.png";
import circle2 from "../images/circle2.png";
import Ellipse655 from "../images/Ellipse655.png";
import {UserInfo} from "../Services/info";

const Dashboard = (props) => {

    const [openMyElectionCollapse, setOpenMyElectionCollapse] = useState(false);

    const imageProfile = (UserInfo.profile || [])?.filter((img) => img.type === "PersonalPhoto")[0];
    const handleCollapse = () => {
        setOpenMyElectionCollapse(!openMyElectionCollapse);
    };

    const handleCloseDrawer = () => {
        // props.setOpenDrawerDashboard(false);
    };

    const logOut = () => {
        localStorage.clear();
        window.location.href = "/";
        // props.setOpenDrawerDashboard(false);
    };

    return (
        <>
            <Stack direction="column" sx={{my: {md: '20px'}}}>
                <Stack justifyContent="center" alignItems="center" spacing={{xs: 1, md: 4}} sx={{mb: 2}}>
                    {
                        imageProfile?.base64 ?
                            <Pic3 src={imageProfile.base64} alt=""/> :
                            <Pic src={Ellipse655} alt=""/>
                    }
                    <UserNameText>{UserInfo.firstName} {UserInfo.lastName}</UserNameText>
                </Stack>
                <Divider variant="middle"/>
                <Stack sx={{my: '8px', mx: '12px'}}>
                    <List>
                        <DashboardList>
                            <MenuItems onClick={handleCloseDrawer} to="../UserProfile">
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
                            <Stack direction="column" sx={{minWidth: '100%'}}>
                                <DashboardButton onClick={handleCollapse}>
                                    <DashboardText>
                                        <Stack direction='row'>
                                            <Pic src={Document}/>
                                            <Text sx={{mt: 'auto'}}>انتخابات های من</Text>
                                        </Stack>
                                    </DashboardText>
                                </DashboardButton>
                                <CollapseMenu in={openMyElectionCollapse} timeout="auto" unmountOnExit
                                              sx={{background: '#EAF8FF'}}>
                                    <List component="div" disablePadding>
                                        <MenuItems onClick={handleCloseDrawer} to="../CreateElection">
                                            <ListItemButton>
                                                <Stack direction='row'>
                                                    <Pic2 src={circle1}/>
                                                    <TextCollapse>ایجاد انتخابات جدید</TextCollapse>
                                                </Stack>
                                            </ListItemButton>
                                        </MenuItems>
                                        <MenuItems onClick={handleCloseDrawer} to="../ElectionsInProgress">
                                            <ListItemButton>
                                                <Stack direction='row'>
                                                    <Pic2 src={circle2}/>
                                                    <TextCollapse>انتخابات های ایجاد شده</TextCollapse>
                                                </Stack>
                                            </ListItemButton>
                                        </MenuItems>
                                    </List>
                                </CollapseMenu>
                            </Stack>
                        </DashboardList>
                        <DashboardList>
                            <MenuItems onClick={handleCloseDrawer} to="../VoteHistory">
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
                            <MenuItems onClick={handleCloseDrawer} to="">
                                <DashboardButton>
                                    <DashboardText>
                                        <Stack direction='row'>
                                            <Pic src={EditSquare}/>
                                            <Text sx={{mt: 'auto'}}>مدیریت کاربران</Text>
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