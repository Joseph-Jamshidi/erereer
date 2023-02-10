import {MenuItem, styled} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

export const ListBtn = styled(RouterLink)`
  text-align: center;
  background-color: #425C81;
  border-radius: 10px;
  margin: 5px;
  padding: 0;
  text-decoration: none;
  width: 100%;
`;

export const NavBtn = styled(MenuItem)`
  justify-content: center;
  color: white;
  width: 100%;
  height: 100%;
  padding: 8px 8px;
  border-radius: 10px;
  font-family: 'Sahel', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 30px;
  background-color: #425C81;

  :hover {
    color: black;
    background-color: #425C81;
    transition: all 0.3s ease-out;
  }
`;
export const NavBtnReg = styled(NavBtn)`
  background-color: white;
  color: #425C81;
  border: 1px solid #425C81;
`;