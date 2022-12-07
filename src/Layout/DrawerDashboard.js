import React, {useState} from 'react';
import {Button, Drawer, Stack} from "@mui/material";
import Dashboard from "./Dashboard";
import {MainDashboardDrawer} from "../StyledTags/DrawerDashboardTags";

const DrawerDashboard = () => {

    const [openDrawerDashboard, setOpenDrawerDashboard] = useState(false);

    return (
        <>
            <Drawer open={openDrawerDashboard} anchor={"right"}>
                <MainDashboardDrawer sx={{display: {xs: 'block', md: 'none'}}}
                                     onClick={() => setOpenDrawerDashboard(false)}>
                    <Dashboard/>
                </MainDashboardDrawer>
            </Drawer>
            <Stack direction={"row"}>
                <Button onClick={() => setOpenDrawerDashboard(!openDrawerDashboard)}
                        sx={{ml: 'auto', color: '#425C81', pr: '0'}}>
                    منو
                </Button>
            </Stack>
        </>
    );
};

export default DrawerDashboard;