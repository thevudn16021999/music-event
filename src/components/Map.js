import React from "react";
import { Divider, Header, Icon, Image, Segment } from "semantic-ui-react";

function Map() {
  return (
    <Segment
      id="Map"
      inverted
      vertical
      style={{
        padding: "2em",
        background:
          "url(https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/122176740_175678167439635_2733517958916577493_o.jpg?_nc_cat=106&ccb=2&_nc_sid=dd9801&_nc_ohc=vNDkVR4z-UcAX9Swu3U&_nc_ht=scontent.fdad3-1.fna&oh=71843b8aebad90ae8a076b091c6e065b&oe=5FB67883) no-repeat top fixed",
        backgroundSize: "cover",
      }}
    >
      <Segment inverted textAlign="center">
        <Header sub textAlign="center" className="section-header">
          Bảo trợ truyền thông
        </Header>
        <Divider inverted horizontal>
          <Icon name="diamond" />
        </Divider>
        <Image.Group size="small">
          <Image src="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/49949891_2215632811809434_3224796621342507008_n.jpg?_nc_cat=1&ccb=2&_nc_sid=85a577&_nc_ohc=yRKKfH0VgdUAX_q-Tqm&_nc_ht=scontent.fdad3-1.fna&oh=27995637c0d08ca83ac2d077879aaf56&oe=5FB87150" />
        </Image.Group>
      </Segment>
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
    </Segment>
  );
}

export default Map;
