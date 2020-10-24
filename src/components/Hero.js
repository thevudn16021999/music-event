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
            <Menu.Item as="a" style={{ fontWeight: "bold" }}>
              Dreams Concert
            </Menu.Item>
            <Menu.Item position="right">
              <Grid centered style={{ display: fixed ? "none" : "" }}>
                <Grid.Row>Bảo trợ truyền thông</Grid.Row>
                <Image
                  size="tiny"
                  src="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/49949891_2215632811809434_3224796621342507008_n.jpg?_nc_cat=1&ccb=2&_nc_sid=85a577&_nc_ohc=yRKKfH0VgdUAX_q-Tqm&_nc_ht=scontent.fdad3-1.fna&oh=27995637c0d08ca83ac2d077879aaf56&oe=5FB87150"
                />
              </Grid>
              <Popup
                trigger={
                  <Button
                    as={Link}
                    to={user ? "/checkout" : "/login"}
                    inverted={!fixed}
                    primary={fixed}
                    icon="cart"
                    content={cart.size > 0 ? getTicketQuantity(cart) : null}
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
            marginTop: "12vh",
          }}
        >
          <Container text>
            <Countdown date="Dec 05 2020 16:51:50 GMT+0700" />
            <Button primary size="huge" href="#booking">
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
