import React from 'react';
import {AppBar, Box, Menu, Stack, Toolbar} from "@mui/material";
import DropdownMenu from "./DropdownMenu";
import {
    NavItem,
    MenuItems,
    NavItemReg,
    CollapseItems,
    NavItemRegCollapse,
    CollapseLink, NavItemPanel, ProgressBars
} from "../StyledTags/HeaderTags";
import DrawerDashboard from "./DrawerDashboard";
import {token, UserInfo} from "../Services/info";
import LinearProgress from '@mui/material/LinearProgress';


const Header = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseLogOut = () => {
        logOut();
        handleClose();
    };

    const logOut = () => {
        localStorage.clear();
        window.location.href = "/"
    };

    return (
        <>
            <AppBar component="nav"
                    sx={{background: '#A5D4DE', width: '98%', mx: 'auto', my: '8px', borderRadius: '10px'}}
                    position="relative">
                <Toolbar>
                    <Box sx={{display: {md: 'none', width: '100%'}}}>
                        <DropdownMenu/>
                    </Box>
                    {
                        token ?
                            <Box sx={{display: {md: 'none', width: '100%'}}}>
                                <DrawerDashboard/>
                            </Box>
                            :
                            ''
                    }

                    <Box sx={{width: '100%', display: {xs: 'none', md: 'block'}}}>
                        <Stack direction={"row"}>
                            <NavItem>
                                <MenuItems to="./">صفحه اصلی</MenuItems>
                            </NavItem>
                            <NavItem>
                                <MenuItems>تعرفه ها</MenuItems>
                            </NavItem>
                            <NavItem>
                                <MenuItems>درباره ما</MenuItems>
                            </NavItem>
                            <NavItem>
                                <MenuItems>تماس با ما</MenuItems>
                            </NavItem>
                            {token ?
                                <>
                                    <NavItemPanel variant="contained">
                                        <MenuItems to='./ElectionsInProgress'>
                                            پنل کاربری
                                        </MenuItems>
                                    </NavItemPanel>
                                    <NavItemRegCollapse id="basic-button"
                                                        aria-controls={open ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={handleClick}>
                                        {UserInfo.firstName} {UserInfo.lastName}
                                    </NavItemRegCollapse>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <CollapseLink to="./UserProfile">
                                            <CollapseItems onClick={handleClose}>ویرایش اطلاعات کاربری</CollapseItems>
                                        </CollapseLink>
                                        <CollapseLink to="./ResetPassword">
                                            <CollapseItems onClick={handleClose}>تغییر رمز عبور</CollapseItems>
                                        </CollapseLink>
                                        <CollapseItems onClick={handleCloseLogOut}>خروج</CollapseItems>
                                    </Menu>
                                </>
                                :
                                <>
                                    <NavItemReg sx={{"&:hover": {background: '#425C81'}}}>
                                        <MenuItems to="./register" sx={{color: '#425C81', "&:hover": {color: 'black'}}}>
                                            ثبت نام
                                        </MenuItems>
                                    </NavItemReg>
                                    <NavItem sx={{ml: '0'}}>
                                        <MenuItems to="./login">ورود</MenuItems>
                                    </NavItem>
                                </>
                            }
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;