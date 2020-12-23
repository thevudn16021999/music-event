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
import { Media } from "./MediaQuery";
import LazyLoad from "react-lazyload";

function Artists() {
  const artists = [
    {
      image:
        "https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/NS/cahoihang.jpg",
    },
    {
      image:
        "https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/NS/lyly.jpg",
    },
    {
      image:
        "https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/NS/vu.jpg",
    },
    {
      image:
        "https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/NS/HD.png",
    },
    {
      image:
        "https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/NS/Chilies.png",
    },
    {
      image:
        "https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/NS/NSBM.jpg",
    },
  ];

  return (
    <Segment
      id="Artlists"
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
      <Media greaterThanOrEqual="md">
        <Coverflow
          displayQuantityOfSide={2}
          enableScroll={true}
          clickable={true}
          active={0}
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
            <LazyLoad key={index}>
              <Image src={artist.image} className="image" />
            </LazyLoad>
          ))}
        </Coverflow>
      </Media>
      <Media at="xs">
        <Container text textAlign="center">
          <Image.Group size="tiny">
            {artists.map((artist, index) => (
              <LazyLoad key={index} style={{ display: "inline-block" }}>
                <Image src={artist.image} key={index} />
              </LazyLoad>
            ))}
          </Image.Group>
        </Container>
      </Media>
      <Media at="sm">
        <Container text textAlign="center">
          <Image.Group size="small">
            {artists.map((artist, index) => (
              <LazyLoad key={index} style={{ display: "inline-block" }}>
                <Image src={artist.image} key={index} />
              </LazyLoad>
            ))}
          </Image.Group>
        </Container>
      </Media>
    </Segment>
  );
}

export default Artists;
