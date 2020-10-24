import React from "react";
import {
  Container,
  Divider,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import Coverflow from "react-coverflow";
import "./Artists.css";

function Artists() {
  const artists = [
    {
      image:
        "https://cdn.glitch.com/fe1c1ab8-d567-49ec-93a3-b5aa5437dd9e%2FThinhSuy.jpg?v=1601313168463",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    },
    {
      image:
        "https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.15752-9/122433880_2449305778703042_4677206744975216522_n.png?_nc_cat=103&ccb=2&_nc_sid=ae9488&_nc_ohc=KOXKcXXPx9gAX8Drt-i&_nc_ht=scontent.fsgn2-2.fna&oh=6110714a782313a38dc6684172737e53&oe=5FB9B07B",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    },
    {
      image:
        "https://cdn.glitch.com/fe1c1ab8-d567-49ec-93a3-b5aa5437dd9e%2Fcahoihoang.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    },
  ];

  return (
    <Segment
      vertical
      padded="very"
      style={{
        background:
          "linear-gradient(rgb(10, 11, 13), rgba(10, 11, 13, 0) 60%, rgb(10, 11, 13)), linear-gradient(0deg, rgba(101, 106, 188, 0.8), rgb(122, 168, 223)), center top no-repeat fixed",
        backgroundBlendMode: "normal,soft-light,normal",
      }}
    >
      <Header sub textAlign="center" className="section-header">
        Nghệ sĩ
      </Header>
      <Container>
        <Divider horizontal>
          <Icon name="music" />
        </Divider>
      </Container>
      <Coverflow
        displayQuantityOfSide={3}
        navigation={false}
        infiniteScroll
        enableHeading={false}
        media={{
          "@media (max-width: 900px)": {
            width: "100%",
            height: "300px",
          },
          "@media (min-width: 900px)": {
            width: "100%",
            height: "600px",
          },
        }}
      >
        {artists.map((artist, index) => (
          <Image
            key={index}
            src={artist.image}
            className="image"
            size="large"
          />
        ))}
      </Coverflow>
    </Segment>
  );
}

export default Artists;
