import styled from "@emotion/styled";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Box, Button, Typography} from "@mui/material";

export const MainDashboard = styled(Grid2)`
  background-color: white;
  border: 1px solid #425C81;
  border-radius: 4px;
  width: 100%;
`;
export const Section = styled(Grid2)`
  padding: 4px 8px;
  background-color: white;
  border: 1px solid #425C81;
  border-radius: 4px;
  margin: 8px 6px;
`;
export const TitleText = styled(Typography)`
  font-family: 'Sahel-Bold', sans-serif;
  font-style: normal;
  font-size: 16px;
  line-height: 25px;
  margin-top: 4px;
`;
export const Pic = styled("img")`
  max-width: 100%;
  padding: 3px 4px 3px 0;
`;
export const CandidateButton = styled(Button)`
  max-width: 100%;
  background-color: #425C81;
  padding: 3px 4px 3px 0;
  margin: auto 0;
  color: white;
  font-family: 'Sahel', sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 14px;
  line-height: 25px;
  height: fit-content;
`;
export const CandidateIcon = styled(Button)`
  min-width: fit-content;
  max-width: fit-content;
  padding: 3px;
  margin: 4px;
  color: #425C81;
  font-family: 'Sahel', sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 14px;
  line-height: 25px;
  height: fit-content;
`;
export const AddTextButton = styled(Typography)`
  color: white;
  font-family: 'Sahel', sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 16px;
  line-height: 25px;
`;
export const CandidateText = styled("p")`
  font-family: 'Sahel', sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 14px;
  line-height: 25px;
  margin: 0;
`;
export const RowNumber = styled(Typography)`
  font-family: 'Sahel', sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  margin: 1% 2% auto 0;
`;
export const TitleBox = styled(Box)`
  border: 1px dashed #425C81;
  width: fit-content;
  margin: 12px;
  padding: 4px;
`;
export const MainTitleText = styled(Typography)`
  font-family: 'Sahel-Bold', sans-serif;
  font-style: normal;
  font-size: 20px;
  line-height: 18px;
  color: #425C81;
  margin: 5px;
  padding: 5px;
`;