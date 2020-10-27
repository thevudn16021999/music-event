import React from "react";
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
          "linear-gradient(#000000,rgba(0, 0, 0, 0.2)),url(img/map.png)",
        backgroundSize: "cover",
      }}
    >
      <Segment inverted textAlign="center" id="map">
        <Header sub textAlign="center" className="section-header">
          Sơ đồ sân khấu
        </Header>
        <Container>
          <Divider inverted horizontal>
            <Icon name="calendar outline" />
          </Divider>
        </Container>
        <Image.Group>
          <Image src="https://dventertainment.vn/assets/images/upload/stadium.svg" />
        </Image.Group>
      </Segment>

      <div id="partner">
        <Segment inverted textAlign="center">
          <Header sub textAlign="center" className="section-header">
            Nhà tài trợ
          </Header>
          <Divider inverted horizontal>
            <Icon name="diamond" />
          </Divider>
          <Image.Group size="small">
            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
          </Image.Group>
        </Segment>
      </div>
      <Segment inverted textAlign="center">
        <Header sub textAlign="center" className="section-header">
          Bảo trợ truyền thông
        </Header>
        <Divider inverted horizontal>
          <Icon name="diamond" />
        </Divider>
        <Image.Group size="small">
          <Image src="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/49949891_2215632811809434_3224796621342507008_n.jpg?_nc_cat=1&ccb=2&_nc_sid=85a577&_nc_ohc=yRKKfH0VgdUAX_q-Tqm&_nc_ht=scontent.fdad3-1.fna&oh=27995637c0d08ca83ac2d077879aaf56&oe=5FB87150" />
          <Image src="img/logoEDM.png" />
        </Image.Group>
      </Segment>
      <Segment inverted textAlign="center">
        <Header sub textAlign="center" className="section-header">
          Hỗ trợ truyền thông
        </Header>
        <Divider inverted horizontal>
          <Icon name="diamond" />
        </Divider>
        <Image.Group size="small">
          <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
          <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
          <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
        </Image.Group>
      </Segment>
    </Segment>
  );
}

export default Schedule;
