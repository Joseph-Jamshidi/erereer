import styled from "@emotion/styled";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Box, Button, Paper, Stack, Typography} from "@mui/material";

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
  width: 80%;
`;
export const CandidateBox = styled(Stack)`
  background-color: white;
  border: 1px solid #425C81;
  border-radius: 4px;
  margin: 4px 0;
  padding: 16px 14px;
`;
export const NumberBox = styled(Box)`
  border-radius: 30%;
  border: 1px solid #425C81;
  margin-right: 4%;
  padding: 0 5px;
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 30px;
`;
export const NameBox = styled(Box)`
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 30px;
`;
export const TextBox = styled(Typography)`
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  color: #425C81;
  margin: 8% 0 3%;
`;
export const SubmitButton = styled(Button)`
  background-color: #425C81;
  color: white;
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 34px;
  margin: 5% auto;
  display: flex;
  justify-content: center;
`;
export const TitleBox = styled(Box)`
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
export const Section = styled(Grid2)`
  padding: 4px 8px;
  background-color: white;
  border: 1px solid #425C81;
  border-radius: 4px;
  margin: 8px 6px;
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
export const VoteText = styled(Typography)`
  font-family: 'Vazir FD', sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 16px;
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