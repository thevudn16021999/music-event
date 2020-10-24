import React from "react";
import { Button, Card, Header, Icon, List, Statistic } from "semantic-ui-react";

function TicketItem({ name, services, price, handleClick }) {
  return (
    <div className="card fl-left">
      <section className="date">
        <Card.Content style={{ padding: "3rem 2.5rem" }}>
          <Header>{name}</Header>
        </Card.Content>
      </section>
      <section className="card-cont">
        <Statistic
          // size="large"
          value={Number(price).toLocaleString("vi-VN")}
          label="vnđ"
        />
        {/* { <Image src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg" /> } */}
        <Card.Content style={{ padding: "3rem 2.5rem" }}>
          <List relaxed="very" items={services}></List>
        </Card.Content>
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
      </section>
    </div>
  );
}

export default TicketItem;
