import React, {useState} from 'react';
import {Button, Drawer, Stack} from "@mui/material";
import Dashboard from "./Dashboard";
import {MainDashboardDrawer} from "../StyledTags/DrawerDashboardTags";
import MenuIcon from "@mui/icons-material/Menu";

const DrawerDashboard = () => {

    const [openDrawerDashboard, setOpenDrawerDashboard] = useState(false);

    return (
        <>
            <Drawer open={openDrawerDashboard} anchor="right" onClose={() => setOpenDrawerDashboard(false)}>
                <MainDashboardDrawer
                    sx={{display: {xs: 'block', md: 'none'}}}
                    role="presentation"
                >
                    <Dashboard/>
                </MainDashboardDrawer>
            </Drawer>
            <Stack direction="row">
                <Button onClick={() => setOpenDrawerDashboard(!openDrawerDashboard)}
                        sx={{ml: 'auto', color: '#425C81', pr: '0'}}>
                    <MenuIcon/>
                </Button>
            </Stack>
        </>
    );
};

export default DrawerDashboard;