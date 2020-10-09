import React from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import { ACTION } from "../reducer";
import { useGlobalDispatch } from "../store";
import TicketItem from "./TicketItem";

const tickets = [
  {
    id: 2001,
    name: "Vé thường",
    price: 500000,
    services: ["Quyền lợi 1", "Quyền lợi 2", "Quyền lợi 3"],
  },
  {
    id: 2002,
    name: "Vé V.I.P",
    price: 1000000,
    services: ["Quyền lợi 1", "Quyền lợi 2", "Quyền lợi 3"],
  },
];

function Tickets() {
  const dispatch = useGlobalDispatch();

  const addTicketToCart = (ticket) => {
    dispatch({
      type: ACTION.ADD_TO_CART,
      item: ticket,
    });
  };

  return (
    <Segment vertical padded="very">
      <Header sub textAlign="center" className="section-header" id="booking">
        Đặt vé
      </Header>
      <Container>
        <Divider horizontal>
          <Icon name="hand victory" />
          <Icon name="hand pointer" />
          <Icon name="hand spock" />
        </Divider>
      </Container>
      <Grid container centered stackable columns={2} textAlign="center">
        {tickets.map((ticket) => (
          <Grid.Column key={ticket.id} > 
            <TicketItem
              {...ticket}
              handleClick={() => addTicketToCart(ticket)}
            />
          </Grid.Column>
        ))}
      </Grid>
    </Segment>
  );
}

export default Tickets;
