import styled from "@emotion/styled";
import {Box, Button, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2";

export const LinkButton = styled(RouterLink)`
  padding: 0;
  text-decoration: none;
  color: white;
`;
export const MainDashboard = styled(Grid2)`
  background-color: white;
  border: 1px solid #425C81;
  border-radius: 4px;
  width: 100%;
`;
export const Pic = styled("img")`
  max-width: 100%;
  height: auto;
`;
export const Section = styled(Grid2)`
  padding: 4px 8px;
  background-color: white;
  border: 1px solid #425C81;
  border-radius: 4px;
  margin: 8px 6px;
`;
export const ElectionButton = styled(Button)`
  background-color: #425C81;
  padding: 3px;
  color: white;
  margin: 4px;
  min-width: fit-content;
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 14px;
  line-height: 25px;
`;
export const ManageButton = styled(Button)`
  max-width: 100%;
  background-color: #425C81;
  padding: 4px;
  color: white;
  margin: 3px;
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 14px;
  line-height: 25px;
`;
export const ElectionText = styled(Typography)`
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 14px;
  line-height: 25px;
`;
export const TitleText = styled(Typography)`
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 25px;
  margin-top: 4px;
`;
export const RowBox = styled(Box)`
  border-radius: 50%;
  border: 1px solid #425C81;
  height: 0.5%;
  width: 3%;
  margin: auto 10px auto 0;
`;
export const RowNumber = styled(Typography)`
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 16px;
  line-height: 25px;
  text-align: center;
`;
export const TitleBox=styled(Box)`
  border: 1px dashed #425C81;
  width: fit-content;
  margin: 12px;
  padding: 4px;
`;
export const MainTitleText = styled(Typography)`
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 18px;
  color: #425C81;
  margin: 5px;
  padding: 5px;
`;