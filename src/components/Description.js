import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Menu,
  Segment,
  Visibility,
  Icon,
  Grid,
  Popup,
  Image,
  Header
} from "semantic-ui-react";
import Countdown from "./Countdown";
import "./Hero.css";
import { useGlobalState } from "../store";
import { Link } from "react-router-dom";
import { getTicketQuantity } from "../reducer";

function Hero() {
  const { cart, user } = useGlobalState();
  const [fixed, setFixed] = useState(false);
  const [popup, setPopup] = useState(false);
  const [time, setTime] = useState(3);

  useEffect(() => {
    if (cart.length > 0) {
      setPopup(true);
      setTime(3);
    }
  }, [cart]);


  return (
    
      <Segment inverted vertical textAlign="center" style={{background:"#fff",color:"rgba(50,51,51,.8)", padding:"60px 0px"}}>
      <Container>
        <Grid
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              color:"rgba(50,51,51,.8)"
            }}
          >
            <Container text>
              <Header
                as="h1"
                content="Xin Chào"
                inverted
                className="text-header"
                style={{color:"rgba(50,51,51,.8)", fontSize:"4rem"}}
              />
              <p style={{color:"#da3769",fontSize:"2rem"}}>
              Những Kẻ Mộng Mơ 
              </p>
              <p style={{fontSize:"2rem"}}>
              Dreamers Concert là đêm nhạc tổ chức tại Đà Nẵng. Là nơi tập hợp và trú ngụ của những kẻ mộng mơ đang đi tìm sự đồng cảm của tâm hồn
              </p>              
              <p style={{ fontStyle: "italic", fontWeight: "bold",fontSize:"2rem" }}><Icon name="calendar" />
                December 05 2020 
              </p>
              <p style={{ fontStyle: "italic", fontWeight: "bold",fontSize:"2rem" }}><Icon name="map marker" />
              Nhà thi đấu Quân khu 5, TP Đà Nẵng
              </p>
              <Button primary size="huge" href="#booking">
                Đặt vé ngay
                <Icon name="right arrow" />
              </Button>
            </Container>
          </Grid>
        </Container>
      </Segment>
          
  );
}

export default Hero;
