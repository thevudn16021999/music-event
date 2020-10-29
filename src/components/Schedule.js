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
          <Image src="https://dventertainment.vn/assets/images/upload/stadium.svg" />
        </Image.Group>
      </Segment>

      
      <Segment inverted textAlign="center"  id="partner" style={{paddingTop:"6vh"}}>
        <Header sub textAlign="center" className="section-header">
          Bảo trợ truyền thông
        </Header>
          <Container>
            <Divider inverted horizontal>
              <Icon name="diamond" />
            </Divider>
          </Container>
        <Image.Group size="small">
          <Image src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoMTV.jpg" />
          <Image src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoCD.png" />
          <Image src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoEDM.png" />
          
        </Image.Group>
      </Segment>

      <Segment inverted textAlign="center" >
        <Header sub textAlign="center" className="section-header">
          Hỗ trợ truyền thông
        </Header>
          <Container>
            <Divider inverted horizontal>
              <Icon name="diamond" />
            </Divider>
          </Container>
        <Image.Group size="small">
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
          <Image.Group size="small">
            <Image src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/logo/logoScof.png" />
          </Image.Group>
        </Segment>

    </Segment>
  );
}

export default Schedule;
