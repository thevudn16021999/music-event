import React from "react";
import {
  Container,
  Divider,
  Embed,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import { Media } from "./MediaQuery";

function Map() {
  return (
    <Segment inverted vertical style={{ padding: "2em" }}>
    <Segment inverted textAlign="center">
            <Header sub textAlign="center" className="section-header">
               Bảo trợ truyền thông
           </Header>
            <Divider inverted horizontal>
              <Icon name="diamond" />
            </Divider>
            <Image.Group size="small">
              <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
              <Image src="http://mtvwe.com/images/logo.png?r=12413" />
              <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
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
          <Segment inverted textAlign="center">
            <Header sub textAlign="center" className="section-header">
            Đồng tài trợ
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
