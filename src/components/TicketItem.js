import React from "react";
import { Button, Card, Container, Icon, Image } from "semantic-ui-react";

function TicketItem({ name, img, services, price, handleClick }) {
  return (
    <Container textAlign="center">
      <Card
        fluid
        centered
        style={{ maxWidth: "28rem", backgroundSize: "cover" }}
      >
        {/* <Card.Content style={{ padding: "3rem 2.5rem" }}>
          <Header>{name}</Header>
          <Statistic
            // size="large"
            value={Number(price).toLocaleString("vi-VN")}
            label="vnđ"
          />
        </Card.Content> */}
        <Image src={img} />
        {/* <Card.Content style={{ padding: "3rem 2.5rem" }}>
          <List relaxed="very" items={services}></List>
        </Card.Content> */}
        {/* <Divider horizontal style={{ padding: "2em 5em" }}>
            <Icon name="hand point down" />
            <Icon name="hand point down" />
            <Icon name="hand point down" />
          </Divider> */}
        <Card.Content style={{ padding: "2rem 2rem" }} extra>
          <Button animated primary size="huge" onClick={handleClick}>
            <Button.Content visible>Đặt vé ngay</Button.Content>
            <Button.Content hidden>
              <Icon name="cart" />
            </Button.Content>
          </Button>
        </Card.Content>
      </Card>
    </Container>

    // <div className="card fl-left">
    //   <section className="date">
    //     <Card.Content style={{ padding: "3rem 2.5rem" }}>
    //       <Header>{name}</Header>
    //     </Card.Content>
    //   </section>
    //   <section className="card-cont">
    //     <Statistic
    //       // size="large"
    //       value={Number(price).toLocaleString("vi-VN")}
    //       label="vnđ"
    //     />
    //     {/* { <Image src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg" /> } */}
    //     <div style={{ padding: "3rem 2.5rem" }} className="even-info">
    //       <p>
    //       <List items={services}></List>
    //       </p>
    //     </div>
    //     <Button animated onClick={handleClick}>
    //         <Button.Content visible>Đặt vé ngay</Button.Content>
    //         <Button.Content hidden>
    //           <Icon name="cart" />
    //         </Button.Content>
    //       </Button>
    //     {/* <Divider horizontal style={{ padding: "2em 5em" }}>
    //         <Icon name="hand point down" />
    //         <Icon name="hand point down" />
    //         <Icon name="hand point down" />
    //       </Divider> */}
    //   </section>
    // </div>
  );
}

export default TicketItem;
