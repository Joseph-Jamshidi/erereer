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
  background-color: #EAF8FF;
  border-bottom: 5px solid #5072A4;
  border-left: 5px solid #5072A4;
  border-right: 5px solid #5072A4;
  padding: 0 2% 2%;
  margin: 2% 12px 1% 12px;
`;
export const TitleText = styled(Typography)`
  font-family: 'Sahel-Bold', sans-serif;
  font-style: normal;
  font-size: 22px;
  line-height: 18px;
  color: #425C81;
  margin: 5px;
  padding: 5px;
`;
export const TitleText2 = styled(Typography)`
  font-family: 'Sahel', sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 16px;
  line-height: 25px;
  color: #425C81;
  margin: 15px;
  padding: 5px;
`;
export const TitleBox=styled(Box)`
  border: 1px dashed #425C81;
  width: fit-content;
  margin: 12px;
  padding: 4px;
`;
export const SubmitButton=styled(Button)`
  background-color: #425C81;
  padding: 3px 4px 3px 0;
  margin: 4px 0 0 6px;
  color: white;
  font-family: 'Sahel', sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 16px;
  line-height: 25px;
`;

