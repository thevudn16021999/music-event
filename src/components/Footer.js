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
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={10}>
              <Header as="h4" inverted>
                Dreamers
              </Header>
              <p>
                Dreamers Concert là chương trình âm nhạc đưa những kẻ mộng mơ
                say mê âm nhạc đến với nhau, cùng hò reo trong âm nhạc. Dreamers
                Concert mong muốn tạo ra một chương trình âm nhạc chuyên nghiệp
                tại Đà Nẵng
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
                <List.Item as="a" href="mailto:dreamersconcert@gmail.com">
                  <Icon name="mail" /> dreamersconcert@gmail.com
                </List.Item>
                <List.Item as="a" href="tel:+84969733929">
                  <Icon name="phone" /> 096 973 39 29
                </List.Item>
              </List>
            </Grid.Column>
            {/* <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Banana Pre-Order</List.Item>
                <List.Item as="a">DNA FAQ</List.Item>
                <List.Item as="a">How To Access</List.Item>
                <List.Item as="a">Favorite X-Men</List.Item>
              </List>
            </Grid.Column> */}
          </Grid.Row>
        </Grid>
        <Divider style={{ marginTop: "3em" }} />
        <Segment
          inverted
          textAlign="center"
          content="Powered by Semantic-UI"
        ></Segment>
      </Container>
    </Segment>
  );
}

export default Footer;
