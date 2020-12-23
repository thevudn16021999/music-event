import React from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  List,
  Segment,
} from "semantic-ui-react";

function Footer() {
  return (
    <Segment
      inverted
      vertical
      style={{ padding: "5em 0em", backgroundColor: "#000" }}
    >
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <img
                src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logo.png"
                className="ui fluid image"
                alt="logo dreamerconcert"
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h4" inverted>
                Dreamers Concert
              </Header>
              <p style={{ fontStyle: "italic", fontWeight: "bold" }}>
                <Icon name="calendar" />
                Ngày 05 tháng 12 năm 2020
              </p>
              <p>
                <Icon name="map marker alternate" />
                Nhà thi đấu Quân khu 5, 07 Duy Tân, Hải Châu, TP Đà Nẵng
              </p>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item
                  as="a"
                  href="https://www.facebook.com/dreamersconcert"
                  target="_blank"
                >
                  <Icon name="facebook f" />
                  /dreamersconcert
                </List.Item>
                <List.Item as="a" href="mailto:dreamersconcert.dn@gmail.com">
                  <Icon name="mail" /> Dreamersconcert.DN@gmail.com
                </List.Item>
                <List.Item as="a" href="tel:+84586032585">
                  <Icon name="phone" /> 0586 032 585
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider style={{ marginTop: "3em" }} />
        <Segment
          inverted
          textAlign="center"
          content="© 2020 Dreamers Concert. All rights reserved."
        ></Segment>
      </Container>
    </Segment>
  );
}

export default Footer;
