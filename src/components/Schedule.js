import React from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import "./Schedule.css";

function Schedule() {
  const items = [
    {
      image: "https://cdn.glitch.com/fe1c1ab8-d567-49ec-93a3-b5aa5437dd9e%2Foptick.png",
      header: "Mở bán vé",
      description: "Description",
      meta: "Oct 10 - Oct 31",
    },
    {
      image: "https://cdn.glitch.com/fe1c1ab8-d567-49ec-93a3-b5aa5437dd9e%2Fcheckin.png",
      header: "Check-in",
      description: "Description",
      meta: "12:00 - 19:00 ( 29 / 11 )",
    },
    {
      image: "https://cdn.glitch.com/fe1c1ab8-d567-49ec-93a3-b5aa5437dd9e%2Fclock.svg",
      header: "Xem biểu diễn",
      description: "Description",
      meta: "19:30 - ô vờ lai ( 31/11 )",
    },
  ];
  return (
    <Segment
      inverted
      vertical
      padded="very"
      style={{
      }}
    >
      <Header sub textAlign="center" className="section-header">
        Lịch trình
      </Header>
      <Container>
        <Divider inverted horizontal>
          <Icon name="calendar outline" />
        </Divider>
      </Container>
      <Container>
        <Grid>
          {items.map((item, index) => (
            <Grid.Row key={index}>
              <Grid.Column width={4}>
                <Image src={item.image} />
              </Grid.Column>
              <Grid.Column width={9} verticalAlign="middle" textAlign="left">
                <Header inverted size="huge">
                  {item.header}
                </Header>
                <Header inverted sub>
                  <Icon name="time" /> {item.meta}
                </Header>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
                tenetur similique quasi nulla nemo sit dicta voluptatibus nobis
                id fuga. Aliquam, dolor animi maxime magnam quasi sit a eius
                consequuntur!
                {/* {item.description} */}
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      </Container>
    </Segment>
  );
}

export default Schedule;
