import React, { useState } from "react";
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
// import Checkout from "./Checkout";
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
  const [openCheckout, setOpenCheckout] = useState(false);
  const [ticket, setTicket] = useState(tickets[0]);

  const closeModal = () => setOpenCheckout(false);
  const openModal = () => setOpenCheckout(true);

  const addTicketToCart = (ticket) => {
    dispatch({
      type: ACTION.ADD_TO_CART,
      item: ticket,
    });
  };

  return (
    <Segment vertical padded="very">
      <Header sub textAlign="center" className="section-header">
        Đặt vé
      </Header>
      <Container>
        <Divider horizontal>
          <Icon name="hand victory" />
          <Icon name="hand pointer" />
          <Icon name="hand spock" />
        </Divider>
      </Container>
      <Grid container centered stackable columns={2} textAlign="center" divided>
        {tickets.map((ticket) => (
          <Grid.Column key={ticket.id}>
            <TicketItem
              {...ticket}
              handleClick={() => {
                addTicketToCart(ticket);
                // setTicket(ticket);
                // setOpenCheckout(true);
              }}
            />
          </Grid.Column>
        ))}
      </Grid>
      {/* <Checkout
        open={openCheckout}
        closeModal={closeModal}
        openModal={openModal}
        ticket={ticket}
      /> */}
    </Segment>
  );
}

export default Tickets;
