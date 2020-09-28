import React, { useEffect, useState } from "react";
import {
  Header,
  Button,
  Container,
  Menu,
  Segment,
  Visibility,
  Icon,
  Grid,
  Popup,
} from "semantic-ui-react";
import Countdown from "./Countdown";
import "./Hero.css";
import { useGlobalState } from "../store";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    const countdown = setTimeout(() => {
      setTime((time) => (time > 0 ? time - 1 : 0));
      if (time === 0) {
        setPopup(false);
      }
    }, 1000);
    return () => {
      clearTimeout(countdown);
    };
  }, [time]);

  const showFixedMenu = () => setFixed(true);
  const hideFixedMenu = () => setFixed(false);

  return (
    <Visibility
      once={false}
      onBottomPassed={showFixedMenu}
      onBottomPassedReverse={hideFixedMenu}
    >
      <Segment inverted vertical textAlign="center" className="hero">
        <Menu
          fixed={fixed ? "top" : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size="large"
        >
          <Container>
            <Menu.Item as="a">Dreams Concert</Menu.Item>
            <Menu.Item position="right">
              <Popup
                trigger={
                  <Button
                    as={Link}
                    to={user ? "/checkout" : "/login"}
                    inverted={!fixed}
                    primary={fixed}
                    icon="cart"
                    style={{ marginLeft: "0.5em" }}
                    content={cart.length > 0 ? cart.length : false}
                  />
                }
                open={popup}
                position="bottom center"
                content="Bấm vào đây để thanh toán"
              />
            </Menu.Item>
          </Container>
        </Menu>
        <Grid
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container text>
            <Header
              as="h1"
              content="Dreamers Concert"
              inverted
              className="text-header"
            />
            <Header
              content="Dreamers Concert là chương trình âm nhạc đưa những kẻ mộng mơ say mê âm nhạc đến với nhau, cùng hò reo trong âm nhạc."
              inverted
              className="text-subhead"
            />
            <Countdown date="Dec 05 2020 16:51:50 GMT+0700" />
            <Button primary size="huge">
              Đặt vé ngay
              <Icon name="right arrow" />
            </Button>
          </Container>
        </Grid>
      </Segment>
    </Visibility>
  );
}

export default Hero;
