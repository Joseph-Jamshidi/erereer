import {Button, styled, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export const MainSection = styled(Grid2)`
  border: 12px solid #425C81;
  border-radius: 6px;
  min-width: 100%;
  padding: 2%;
  background-color: white;
`;
export const HeaderText = styled(Typography)`
  font-family: 'Sahel', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: 30px;
  color: #425C81;
  padding-right: 2%;
`;
export const Pic = styled("img")`
  max-width: 100%;
  height: auto;
`;
export const LoginButton = styled(Button)`
  background-color: #425C81;
  font-family: 'Sahel', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 34px;
  padding: 10px;
  margin: 0 auto;
  width: 80%;
`;

