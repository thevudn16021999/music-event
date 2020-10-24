import React from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  List,
  Segment,
  Image,
} from "semantic-ui-react";
import { Media } from "./MediaQuery";

function Footer() {
  return (
    <Segment inverted vertical style={{ padding: "5em 0em",backgroundColor:"#000" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <img src="../img/logo.png" class="ui fluid image" />
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h4" inverted>
                Dreamers Concert 
              </Header>
              <p style={{ fontStyle:"italic",fontWeight: "bold"}} > 
              <Icon name="calendar" />December 05 2020
              </p>
              <p><Icon name="map marker" />
              Nhà thi đấu Quân khu 5, TP Đà Nẵng
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
                <List.Item as="a" href="tel:+84969733929">
                  <Icon name="phone" /> 096 973 39 29
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
