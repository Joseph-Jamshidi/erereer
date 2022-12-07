import styled from "@emotion/styled";
import {Collapse, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

export const DashboardList = styled(ListItem)`
  padding: 0;
  margin: 8px 0;
  background-color: #425C81;
  border-radius: 10px;

`;
export const DashboardButton = styled(ListItemButton)`
  padding: 4px 0;
`;
export const DashboardText = styled(ListItemText)`
  color: white;
  margin: auto 0;
`;
export const MenuItems = styled(RouterLink)`
  padding: 0;
  text-decoration: none;
  color: #5072A4;
  width: 100%;
`;
export const TextCollapse = styled(Typography)`
  text-decoration: none;
  color: #5072A4;
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
`;
export const Pic = styled("img")`
  max-width: 100%;
  height: auto;
`;
export const Pic2 = styled("img")`
  max-width: 50%;
  height: 50%;
  margin: auto 3px auto 0;

`;
export const Text = styled(Typography)`
  text-decoration: none;
  color: white;
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
`;
export const UserNameText = styled(Typography)`
  text-decoration: none;
  color: #425C81;
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
  margin: 8px 0 25px;
`;
export const CollapseMenu = styled(Collapse)`
  background-color: #EAF8FF;
  border-right: 4px solid #425C81;
  border-left: 4px solid #425C81;
  border-bottom: 4px solid #425C81;
  border-radius: 10px;
`;