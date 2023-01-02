import {Box, Button, Menu, Stack} from '@mui/material';
import React, {useState} from 'react';
import {ListBtn, NavBtn, NavBtnReg} from "../StyledTags/DropdownMenu";
import {token, UserInfo} from "../Services/info";
import MenuIcon from '@mui/icons-material/Menu';


const DropdownMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        localStorage.clear();
        window.location.href = "/"
    };

    const handleLogOutClose = () => {
        logOut();
        handleClose();
    };

    return (
        <>
            <Stack direction={"row"}>
                <Stack sx={{background: 'red'}}>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        sx={{
                            width: '240px', minHeight: '100%', ml: 'auto'
                        }}
                    >
                        <Box sx={{background: '#A5D4DE', px: '10px'}}>
                            <ListBtn to="./" onClick={handleClose}>
                                <NavBtn>صفحه اصلی</NavBtn>
                            </ListBtn>
                            <ListBtn onClick={handleClose} to={token ? './ElectionsInProgress' : './login'}>
                                <NavBtn>خدمات</NavBtn>
                            </ListBtn>
                            <ListBtn onClick={handleClose}>
                                <NavBtn>تعرفه ها</NavBtn>
                            </ListBtn>
                            <ListBtn onClick={handleClose}>
                                <NavBtn>درباره ی ما</NavBtn>
                            </ListBtn>
                            <ListBtn onClick={handleClose} to="">
                                <NavBtn>تماس با ما</NavBtn>
                            </ListBtn>
                            {token ?
                                <>
                                    <ListBtn onClick={handleClose}>
                                        <NavBtnReg>{UserInfo.firstName}{UserInfo.lastName}</NavBtnReg>
                                    </ListBtn>
                                    <ListBtn onClick={handleClose} to="./UserProfile">
                                        <NavBtnReg>ویرایش اطلاعات کاربری</NavBtnReg>
                                    </ListBtn>
                                    <ListBtn onClick={handleClose} to="./ResetPassword">
                                        <NavBtnReg>تغییر رمز عبور</NavBtnReg>
                                    </ListBtn>
                                    <ListBtn onClick={handleLogOutClose} to="../">
                                        <NavBtnReg>خروج</NavBtnReg>
                                    </ListBtn>
                                </>
                                :
                                <>
                                    <ListBtn to="./register" onClick={handleClose}>
                                        <NavBtnReg>ثبت نام</NavBtnReg>
                                    </ListBtn>
                                    <ListBtn to="./login" onClick={handleClose}>
                                        <NavBtn>ورود</NavBtn>
                                    </ListBtn>
                                </>
                            }
                        </Box>
                    </Menu>
                </Stack>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{color: '#425C81'}}
                >
                    <MenuIcon/>
                </Button>
            </Stack>
        </>
    )
}

export default DropdownMenu;