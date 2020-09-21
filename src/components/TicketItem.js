import React from "react";
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  List,
  Statistic,
} from "semantic-ui-react";

function TicketItem({ name, services, price, handleClick }) {
  return (
    <Container textAlign="center">
      <Header>{name}</Header>
      <Statistic
        size="large"
        value={Number(price).toLocaleString("vi-VN")}
        label="vnđ"
      />
      <List relaxed="very" items={services}></List>
      <Divider horizontal style={{ padding: "2em 5em" }}>
        <Icon name="hand point down" />
        <Icon name="hand point down" />
        <Icon name="hand point down" />
      </Divider>
      <Button animated primary size="huge" onClick={handleClick}>
        <Button.Content visible>Đặt vé ngay</Button.Content>
        <Button.Content hidden>
          <Icon name="cart" />
        </Button.Content>
      </Button>
    </Container>
  );
}

export default TicketItem;
