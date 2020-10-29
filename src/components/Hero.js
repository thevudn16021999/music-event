import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Menu,
  Segment,
  Visibility,
  Grid,
  Popup,
  Image,
} from "semantic-ui-react";
import Countdown from "./Countdown";
import "./Hero.css";
import { useGlobalState } from "../store";
import { Link } from "react-router-dom";
import { getTicketQuantity } from "../reducer";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Hero() {
  const { cart, user } = useGlobalState();
  const [fixed, setFixed] = useState(false);
  const [popup, setPopup] = useState(false);
  const [time, setTime] = useState(3);

  const items = [
    { key: "Artlists", name: "Nghệ Sĩ", href: "#Artlists", target: "_self" },
    { key: "booking", name: "Đặt Vé", href: "#booking", target: "_self" },
    { key: "map", name: "Sơ Đồ", href: "#map" },
    { key: "partner", name: "Đối Tác", href: "#partner", target: "_top" },
    { key: "faq", name: "FAQ", href: "#sectionFAQ", target: "_parent" },
  ];

  useEffect(() => {
    if (cart.size > 0) {
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
            <Navbar
              variant={fixed ? "light" : "dark"}
              expand="lg"
              style={{ width: "100%" }}
            >
              <Navbar.Brand href="/" style={{ fontWeight: "bold" }}>
                <Image size="tiny" src="img/logo.png" />
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />

              <Navbar.Collapse id="basic-navbar-nav" position="right">
                <Nav
                  className="mr-auto"
                  style={{ flex: "1", justifyContent: "center" }}
                >
                  {items.map((item) => (
                    <Nav.Link
                      href={item.href}
                      key={item.key}
                      className="nav-item nav-link"
                      style={{ padding: "10px 20px" }}
                    >
                      {item.name}
                    </Nav.Link>
                  ))}
                </Nav>
                <Grid centered style={{ display: fixed ? "none" : "" }}>
                  <Grid.Row>Đơn vị tổ chức</Grid.Row>
                  <Image size="tiny" src="img/logo-IM.png" />
                </Grid>
                <Grid
                  centered
                  style={{ display: fixed ? "none" : "", marginTop: "0" }}
                >
                  <Grid.Row>Bảo trợ truyền thông</Grid.Row>
                  <Image
                    size="tiny"
                    src="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/49949891_2215632811809434_3224796621342507008_n.jpg?_nc_cat=1&ccb=2&_nc_sid=85a577&_nc_ohc=yRKKfH0VgdUAX_q-Tqm&_nc_ht=scontent.fdad3-1.fna&oh=27995637c0d08ca83ac2d077879aaf56&oe=5FB87150"
                  />
                  <Image size="tiny" src="img/logoEDM.png" />
                </Grid>
              </Navbar.Collapse>
            </Navbar>
          </Container>
        </Menu>
        <Popup
          trigger={
            <Button
              as={Link}
              to={user ? "/checkout" : "/login"}
              inverted={!fixed}
              primary={fixed}
              icon="ticket alternate"
              content={cart.size > 0 ? getTicketQuantity(cart) : null}
              style={{
                cursor: "pointer",
                position: "fixed",
                right: "20px",
                bottom: "20px",
                zIndex: "99999999",
              }}
            />
          }
          open={popup}
          position="left center"
          content="Bấm vào đây để thanh toán"
        />
        <Grid
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "12vh",
          }}
        >
          <Container text>
            <Countdown date="Dec 05 2020 00:00:00 GMT+0700" />
          </Container>
        </Grid>
      </Segment>
    </Visibility>
  );
}

export default Hero;
