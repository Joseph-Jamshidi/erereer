import styled from "@emotion/styled";
import {Box, Button, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

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
export const Section = styled(Box)`
  padding: 14px 12px;
  background-color: white;
  border: 1px solid #425C81;
  border-radius: 4px;
  margin: 8px 6px;
`;
export const Text = styled(Typography)`
  font-family: 'Sahel-Bold', sans-serif;
  font-style: normal;
  font-size: 20px;
  line-height: 25px;
  margin: 10px 5px 20px;
`;
export const SubmitButton = styled(Button)`
  max-width: 100%;
  background-color: #425C81;
  padding: 3px 4px 3px 0;
  margin: 4px 0 0 6px;
  color: white;
  font-family: 'Sahel', sans-serif;
  font-style: normal;
  font-weight: 100;
  font-size: 15px;
  line-height: 25px;
`;