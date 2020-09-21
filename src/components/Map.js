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
      <Grid stretched>
        <Grid.Column width={10}>
          <Embed
            active
            url="https://www.openstreetmap.org/export/embed.html?bbox=108.21241378784181%2C16.027088068241227%2C108.24073791503906%2C16.04622588737448&amp;layer=mapnik&amp;marker=16.03665720748423%2C108.22657585144043"
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Media greaterThan="sm">
            <Segment inverted>
              <Header sub textAlign="center" className="section-header">
                Địa điểm
              </Header>
              <Divider inverted horizontal>
                <Icon name="location arrow" />
              </Divider>
              <Container>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit, necessitatibus aperiam. Vel quaerat eos reiciendis
                suscipit cumque nihil placeat qui. Ipsa perferendis iusto
                recusandae nobis accusantium, rerum asperiores itaque
                voluptatibus.
              </Container>
            </Segment>
          </Media>
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
              <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
              <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
              <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
              <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
              <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
            </Image.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default Map;
