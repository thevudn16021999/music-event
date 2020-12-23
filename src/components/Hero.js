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
    { key: "partner", name: "Đối Tác", href: "#partner", target: "_parent" },
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
                <Image
                  size="tiny"
                  src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logo.png"
                />
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
                      target={item.target}
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
                  <Image
                    size="tiny"
                    src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logo-IM.png"
                  />
                </Grid>
                {/* <Grid
                  centered
                  style={{ display: fixed ? "none" : "", marginTop: "0" }}
                >
                  <Grid.Row>Bảo trợ truyền thông</Grid.Row>
                  <Image
                    size="tiny"
                    src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoMTV.jpg"
                  />
                  <Image size="tiny" src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoCD.png" />
                  <Image size="tiny" src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoEDM.png" />
                </Grid> */}
              </Navbar.Collapse>
            </Navbar>
          </Container>
        </Menu>
        <Popup
          trigger={
            <Button
              as={Link}
              to={user ? "/checkout" : "/login"}
              color="blue"
              size="huge"
              primary={fixed}
              icon="cart"
              content={cart.size > 0 ? getTicketQuantity(cart) : "Giỏ hàng"}
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
          {Date.now() < Date.parse("Dec 05 2020 16:30:00 GMT+0700") ? (
            <Container text>
              <Countdown date="Dec 05 2020 16:30:00 GMT+0700" />
            </Container>
          ) : (
            ""
          )}
        </Grid>
      </Segment>
    </Visibility>
  );
}

export default Hero;
