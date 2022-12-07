import {MenuItem, styled} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

export const NavItem = styled(MenuItem)`
  background-color: #425C81;
  min-width: 6%;
  margin-right: 8px;
  border-radius: 10px;
  text-decoration: none;
  font-family: 'Vazir FD-UI', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  padding: 0;

  :hover {
    background-color: #425C81;
  }
`;
export const NavItemReg = styled(NavItem)`
  border: 1px solid #425C81;
  background-color: white;
  margin-left: auto;
  font-family: 'Vazir FD-UI', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
`;
export const NavItemRegCollapse = styled(NavItem)`
  border: 1px solid #425C81;
  color: #425C81;
  background-color: white;
  margin-left: auto;
  font-family: 'Vazir FD-UI', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 30px;
  justify-content: center;
  padding: 0 3px;

  :hover {
    background-color: #425C81;
    color: white;
  }
`;
export const MenuItems = styled(RouterLink)`
  justify-content: center;
  padding: 4px 18px 4px;
  text-decoration: none;
  color: white;
  width: 100%;
  text-align: center;

  :hover {
    color: black;
    transition: all 0.3s ease-out;
  }
`;
export const CollapseItems = styled(MenuItem)`
  background-color: #A5D4DE;
  font-family: 'Vazir FD-UI', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 30px;

  :hover {
    background-color: #425C81;
    color: white;
    transition: all 0.3s ease-out;
  }
`;
export const CollapseLink = styled(MenuItems)`
  margin: 0;
  padding: 0;
  font-family: 'Vazir FD-UI', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 30px;
  color: black;
  height: auto;
`;

