import React from "react";
import {
  Card,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import { Media } from "./MediaQuery";

function Artists() {
  const artists = [
    {
      image:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
      header: "Thịnh Suy",
      meta: "Dòng nhạc",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
      header: "Hoàng Dũng",
      meta: "Dòng nhạc",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
      header: "Vũ",
      meta: "Dòng nhạc",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
      header: "Chillies",
      meta: "Dòng nhạc",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
      header: "Cá Hồi Hoang",
      meta: "Dòng nhạc",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
      header: "Tên ca sĩ",
      meta: "Dòng nhạc",
    },
  ];

  return (
    <Segment vertical padded="very">
      <Header sub textAlign="center" className="section-header">
        Nghệ sĩ
      </Header>
      <Container>
        <Divider horizontal>
          <Icon name="music" />
        </Divider>
      </Container>
      <Media greaterThan="sm">
        <Grid
          stackable
          container
          columns={3}
          textAlign="center"
          verticalAlign="middle"
        >
          {artists.map((artist, index) => (
            <Grid.Column key={index}>
              <Card raised {...artist} />
            </Grid.Column>
          ))}
        </Grid>
      </Media>
      <Media at="sm">
        <Container textAlign="center">
          <Image.Group size="tiny">
            {artists.map((artist, index) => (
              <Image key={index} circular src={artist.image} centered />
            ))}
          </Image.Group>
        </Container>
      </Media>
    </Segment>
  );
}

export default Artists;
