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

function Schedule() {
  const items = [
    {
      image: "https://react.semantic-ui.com/images/wireframe/image.png",
      header: "Mở bán vé",
      description: "Description",
      meta: "Oct 10 - Oct 31",
    },
    {
      image: "https://react.semantic-ui.com/images/wireframe/image.png",
      header: "Check-in",
      description: "Description",
      meta: "12:00 - 19:00 ( 29 / 11 )",
    },
    {
      image: "https://react.semantic-ui.com/images/wireframe/image.png",
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
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/91364940_655445341685429_3907652578380349440_o.png?_nc_cat=103&_nc_sid=730e14&_nc_ohc=wCX05DQ19TwAX8BEJ5a&_nc_ht=scontent.fsgn2-2.fna&oh=8d420961b8659ce7f81faf31541bd850&oe=5F82946F)",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
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
