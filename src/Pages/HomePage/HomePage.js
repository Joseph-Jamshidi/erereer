import React from 'react';
import {Box, Stack,} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
    FooterText,
    FootSection,
    Grid3, ImgBox, Item, LeftBoxes,
    Main,
    MenuItems,
    MidSection,
    NavItem,
    NavItemReg,
    Paragraph,
    Pic, Pict, RightBoxes,
    TextBox
} from "../../StyledTags/HomePageTags";
import {token} from "../../Services/info";
import Rectangle10975 from "../../images/Rectangle10975.png";
import Ellipse647 from "../../images/Ellipse647.png";
import Ellipse648 from "../../images/Ellipse648.png";
import Polygon2 from "../../images/Polygon 2.png";
import Polygon1 from "../../images/Polygon 1.png";
import Polygon3 from "../../images/Polygon 3.png";
import Polygon4 from "../../images/Polygon 4.png";
import Vector1 from "../../images/Vector1.png";
import Vector from "../../images/Vector.png";
import Group from "../../images/Group.png";
import r3 from "../../images/r3.png";
import r2 from "../../images/r2.png";
import r1 from "../../images/r1.png";
import VotableElection from "./VotableElection";

const HomePage = () => {

    return (
        <>
            <Main>
                <Grid2 container sx={{mx: {md: '5%'}, mt: '50px', position: 'relative', pb: '100px'}}>
                    <Grid2 md={6} xs={12}>
                        {token ?
                            <>
                                <VotableElection/>
                            </>
                            :
                            <Box sx={{
                                textAlign: {md: 'start', xs: 'center'},
                                minWidth: '100%',
                                mr: {md: '10%'},
                                mt: {md: '20%'}
                            }}>
                                <TextBox>متن ساختگی</TextBox>
                                <Paragraph>چاپ و با استفاده از طراحان گرافیک</Paragraph>
                                <Paragraph>چاپ و با استفاده از طراحان گرافیک</Paragraph>
                                <Grid2 container xs={10} md={6} lg={4} justifyContent={{md: 'start', xs: 'center'}}
                                       sx={{width: '100%'}}>
                                    <Grid2 xs={7} sm={3} md={6} sx={{p: '3%'}}>
                                        <NavItemReg>
                                            <MenuItems to='./register'>ثبت نام</MenuItems>
                                        </NavItemReg>
                                    </Grid2>
                                    <Grid2 xs={7} sm={3} md={6} sx={{p: '3%'}}>
                                        <NavItem>
                                            <MenuItems to='./login' sx={{color: 'white'}}>ورود</MenuItems>
                                        </NavItem>
                                    </Grid2>
                                </Grid2>
                            </Box>
                        }
                    </Grid2>
                    <Grid2 md={6} xs={12}>
                        <Box sx={{maxWidth: '100%', height: 'auto'}}>
                            <Stack direction="row" alignItems="center" justifyContent={"center"}>
                                <Pic src={Group}/>
                            </Stack>
                        </Box>
                    </Grid2>
                </Grid2>
                <RightBoxes sx={{bottom: '0', display: {md: 'block', xs: 'none'}}}>
                    <Pic src={Vector} alt=""/>
                </RightBoxes>
                <RightBoxes sx={{bottom: '-2%', display: {md: 'block', xs: 'none'}}}>
                    <Pic src={Polygon4} alt=""/>
                </RightBoxes>
                <RightBoxes sx={{bottom: '-3%', display: {md: 'block', xs: 'none'}}}>
                    <Pic src={Polygon3} alt=""/>
                </RightBoxes>
                <LeftBoxes
                    sx={{bottom: '-8%', display: {md: 'block', xs: 'none'}}}>
                    <Pic src={Polygon1} alt=""/>
                </LeftBoxes>
                <LeftBoxes
                    sx={{bottom: '0', display: {md: 'block', xs: 'none'}}}>
                    <Pic src={Polygon2} alt=""/>
                </LeftBoxes>
                <LeftBoxes sx={{top: '8%', display: {md: 'block', xs: 'none'}}}>
                    <Pic src={Vector1} alt=""/>
                </LeftBoxes>
            </Main>
            <MidSection>
                <Grid3 container justifyContent='center'>
                    <Grid2 xs={11} sm={7} md={4} lg={3}>
                        <Item>
                            <Pict src={r1}/>
                            <ImgBox sx={{mx: {md: '-10%'}}}>ایجاد انتخابات</ImgBox>
                        </Item>
                    </Grid2>
                    <Grid2 xs={11} sm={7} md={4} lg={3}>
                        <Item>
                            <Pict src={r2}/>
                            <ImgBox sx={{mx: {md: '-10%'}}}>ثبت رأی</ImgBox>
                        </Item>
                    </Grid2>
                    <Grid2 xs={11} sm={7} md={4} lg={3}>
                        <Item>
                            <Pict src={r3}/>
                            <ImgBox sx={{mx: {md: '-10%'}}}>راهنمای ایجاد انتخابات</ImgBox>
                        </Item>
                    </Grid2>
                </Grid3>
            </MidSection>
            <FootSection>
                <Box sx={{border: '2px solid #425C81', p: '2%'}}>
                    <FooterText sx={{px: '2%'}}>مزایای انتخابات الکترونیکی</FooterText>
                    <Grid2 container justifyContent="center" spacing={5}>
                        <Grid2 xs={11} sm={7} md={4} lg={3}>
                            <Grid2>
                                <Pic src={Rectangle10975}/>
                            </Grid2>
                        </Grid2>
                        <Grid2 xs={11} sm={7} md={4} lg={3}>
                            <Grid2>
                                <Pic src={Rectangle10975}/>
                            </Grid2>
                        </Grid2>
                        <Grid2 xs={11} sm={7} md={4} lg={3}>
                            <Grid2>
                                <Pic src={Rectangle10975}/>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Box>
                <Box sx={{position: 'absolute', top: '0', right: 0, zIndex: -1, display: {md: 'block', xs: 'none'}}}>
                    <Pic src={Ellipse647} alt=""/>
                </Box>
                <Box sx={{position: 'absolute', top: '0', right: 0, zIndex: -1, display: {md: 'block', xs: 'none'}}}>
                    <Pic src={Ellipse648} alt=""/>
                </Box>
            </FootSection>
        </>
    );
};

export default HomePage;