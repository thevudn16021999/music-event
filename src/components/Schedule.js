import React from "react";
import LazyLoad from "react-lazyload";
import {
  Container,
  Divider,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import "./Schedule.css";

function Schedule() {
  return (
    <Segment
      inverted
      vertical
      padded="very"
      style={{
        background:
          "linear-gradient(#000000,rgba(0, 0, 0, 0.2)),url(https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/map.png)",
        backgroundSize: "cover",
      }}
    >
      <Segment inverted textAlign="center" id="map">
        <Header sub textAlign="center" className="section-header">
          Sơ đồ sân khấu
        </Header>
        <Container>
          <Divider inverted horizontal>
            <Icon name="map outline" />
          </Divider>
        </Container>
        <Image.Group>
          <LazyLoad>
            <Image src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/SODO.jpg" />
          </LazyLoad>
        </Image.Group>
      </Segment>

      <Segment
        inverted
        textAlign="center"
        id="partner"
        style={{ paddingTop: "6vh" }}
      >
        <Header sub textAlign="center" className="section-header">
          Đối tác
        </Header>
        <Container>
          <Divider inverted horizontal>
            <Icon name="diamond" />
          </Divider>
        </Container>
        <Image.Group size="tiny">
          <Image src="https://i.imgur.com/ulCIwQu.png" />
          <Image src="https://i.imgur.com/eeu3LHK.jpg" />
        </Image.Group>
      </Segment>

      <Segment inverted textAlign="center">
        <Header sub textAlign="center" className="section-header">
          Bảo trợ truyền thông
        </Header>
        <Container>
          <Divider inverted horizontal>
            <Icon name="diamond" />
          </Divider>
        </Container>
        <Image.Group size="tiny">
          <Image src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoMTV.jpg" />
          <Image src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoTodaytv.png" />
          <Image src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoYoutv.png" />
          <Image src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoCD.png" />
          <Image src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoEDM.png" />
        </Image.Group>
      </Segment>

      <Segment inverted textAlign="center">
        <Header sub textAlign="center" className="section-header">
          Hỗ trợ truyền thông
        </Header>
        <Container>
          <Divider inverted horizontal>
            <Icon name="diamond" />
          </Divider>
        </Container>
        <Image.Group size="tiny">
          <Image src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoTPcfs.JPG" />
        </Image.Group>
      </Segment>

      <Segment inverted textAlign="center">
        <Header sub textAlign="center" className="section-header">
          Tài trợ vật phẩm
        </Header>
        <Container>
          <Divider inverted horizontal>
            <Icon name="diamond" />
          </Divider>
        </Container>
        <Image.Group size="tiny">
          <Image src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoTCH.png" />
          <Image src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoScof.png" />
        </Image.Group>
      </Segment>
    </Segment>
  );
}

export default Schedule;
