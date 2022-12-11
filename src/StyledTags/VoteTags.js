import styled from "@emotion/styled";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Box, Paper, Stack} from "@mui/material";

export const MainDashboard = styled(Grid2)`
  background-color: white;
  border: 1px solid #425C81;
  border-radius: 4px;
  width: 100%;
`;
export const Pic = styled("img")`
  max-width: 100%;
  height: auto;
  margin: 0 8px;
`;
export const SearchBox = styled(Paper)`
  display: flex;
  align-items: center;
  border: 1px solid #425C81;
  border-radius: 4px;
  background-color: #EAF8FF;
  width: 80%;
`;
export const CandidateBox = styled(Stack)`
  background-color: white;
  border: 1px solid #425C81;
  border-radius: 4px;
  margin: 4px 0;
  padding: 16px 14px;
`;
export const NumberBox=styled(Box)`
  border-radius: 30%;
  border: 1px solid #425C81;
  margin-right: 4%;
  padding: 0 5px;
  font-family: 'Vazir FD',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 30px;
`;
export const NameBox=styled(Box)`
  font-family: 'Vazir FD',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 30px;
`;