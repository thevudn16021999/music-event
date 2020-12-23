import React from "react";
import {
  Button,
  Container,
  Segment,
  Grid,
  Header,
  Icon,
  Divider,
} from "semantic-ui-react";
import "./Hero.css";

function Description() {
  return (
    <Segment
      inverted
      vertical
      textAlign="center"
      style={{
        background: "#fff",
        color: "rgba(50,51,51,.8)",
        padding: "60px 0px",
      }}
    >
      <Container>
        <Grid
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(50,51,51,.8)",
          }}
        >
          <Container text>
            <Header
              as="h1"
              content="Xin Chào"
              inverted
              className="text-header"
              style={{ color: "rgba(50,51,51,.8)", fontSize: "3rem" }}
            />
            <Container>
              <Divider inverted horizontal>
                <Icon name="hand peace" /><Icon name="hand peace" /><Icon name="hand peace" />
              </Divider>
            </Container>
            <p style={{ color: "#da3769", fontSize: "2vh" }}>
              Những Kẻ Mộng Mơ
            </p>
            <p style={{ fontSize: "2.3vh", paddingTop:"1.5vh", paddingBottom:"1.5vh"}}>
              Dreamers Concert là đêm nhạc tổ chức tại Đà Nẵng. Là nơi tập hợp
              và trú ngụ của những kẻ mộng mơ đang đi tìm sự đồng cảm của tâm
              hồn
            </p>
            <p
              style={{
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: "2vh",
              }}
            >
              <Icon name="calendar" />
              Ngày 05 tháng 12 năm 2020
            </p>
            <p
              style={{
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: "2vh",
              }}
            >
              <Icon name="map marker alternate" />
              Nhà thi đấu Quân khu 5, 07 Duy Tân, Hải Châu, TP Đà Nẵng
            </p>
            <Button primary size="huge" href="#booking">
              Đặt vé ngay
              <Icon name="right arrow" />
            </Button>
          </Container>
        </Grid>
      </Container>
    </Segment>
  );
}

export default Description;
