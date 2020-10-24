import React, { useState } from "react";
import { useEffect } from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import { ACTION, getTicketType } from "../reducer";
import { useGlobalDispatch, useGlobalState } from "../store";
import TicketItem from "./TicketItem";
import "./Tickets.css";

function Tickets() {
  const dispatch = useGlobalDispatch();
  const { ticketType } = useGlobalState();

  useEffect(() => {
    (async () => {
      if (ticketType.length === 0) {
        let tickets = await getTicketType();
        console.log(tickets);
        dispatch({
          type: ACTION.LOAD_TICKETTYPE,
          tickets: tickets,
        });
      }
    })();
  }, []);

  const addTicketToCart = (ticket) => {
    dispatch({
      type: ACTION.ADD_TO_CART,
      item: ticket,
    });
  };

  return (
    <Segment vertical padded="very" style={{background:"#dadde6"}}>
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
        {ticketType?.map((ticket) => (
          <Grid.Row key={ticket.id}>
            <TicketItem
              {...ticket}
              handleClick={() => addTicketToCart(ticket)}
            />
          </Grid.Row>
        ))}
      </Grid>
    </Segment>
  );
}

export default Tickets;
