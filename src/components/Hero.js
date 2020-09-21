import React, { useState } from "react";
import {
  Header,
  Button,
  Container,
  Menu,
  Segment,
  Visibility,
  Icon,
  Grid,
} from "semantic-ui-react";
import Countdown from "./Countdown";
import "./Hero.css";

function Hero() {
  const [fixed, setFixed] = useState(false);

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
              <Button
                as="a"
                inverted={!fixed}
                primary={fixed}
                style={{ marginLeft: "0.5em" }}
              >
                Liên hệ
              </Button>
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
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, necessitatibus."
              inverted
              className="text-subhead"
            />
            <Countdown date="Sun Oct 13 2020 16:51:50 GMT+0700" />
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
