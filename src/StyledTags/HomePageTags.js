import {Box, Button, Paper, styled, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Link as RouterLink} from "react-router-dom";

export const TextBox = styled(Typography)`
  font-family: 'Vazir FD-UI', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 38px;
`;
export const Pic = styled("img")`
  max-width: 100%;
  height: auto;
`;
export const Pict = styled("img")`
  max-width: 100%;
  height: auto;
  transform: translateY(-15%);
`;
export const Paragraph = styled(Typography)`
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 38px;
`;
export const ImgBox = styled(Typography)`
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 42px;
  background-color: #5072A4;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  transform: translateY(-35%);
  color: white;
`;
export const Main = styled(Box)`
  position: relative;
  padding: 0 0 200px;
  overflow: hidden;
`;
export const MidSection = styled(Box)`
  background-color: white;
  border-bottom: 18px solid #425C81;
  border-top: 18px solid #425C81;
  overflow: hidden;
  padding: 3% 0;
`;
export const NavItem = styled(Button)`
  color: red;
  background-color: #425C81;
  min-width: 6%;
  margin-left: 8px;
  border-radius: 6px;
  text-decoration: none;
  font-family: 'Vazir FD-UI', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  padding: 0;
  width: 100%;

  :hover {
    color: black;
    background-color: #425C81;
    transition: all 0.3s ease-out;
  }
`;
export const NavItemReg = styled(NavItem)`
  border: 1px solid #425C81;
  background-color: white;
  color: #425C81;
`;
export const Grid3 = styled(Grid2)`
  background: #EAF8FF;
  box-shadow: 0 5px 13px 2px rgba(0, 0, 0, 0.43);
  border-radius: 47px;
  margin: 0 5%;
  padding: 1% 0 0 0;
`;
export const FootSection = styled(Box)`
  padding: 2% 5%;
  position: relative;
  overflow: hidden;
`;
export const FooterText = styled(Typography)`
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 42px;
  color: #425C81;
`;
export const MenuItems = styled(RouterLink)`
  justify-content: center;
  padding: 4px 0;
  text-decoration: none;
  color: #425C81;
  width: 100%;

  :hover {
    color: black;
  }
`;
export const RightBoxes = styled(Box)`
  position: absolute;
  left: 0;
  z-index: -1;
`;
export const LeftBoxes = styled(Box)`
  position: absolute;
  right: 0;
  z-index: -1;
`;

export const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#425C81',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.35)',
    borderRadius: '16px',
    ...theme.typography.body2,
    padding: '10px 32px',
    margin: '2rem 2rem',
    textAlign: 'center',
    alignContent: 'center',
}));