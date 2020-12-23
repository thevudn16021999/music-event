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
import Countdown from "./Countdown";
import TicketItem from "./TicketItem";
import "./Tickets.css";

function Tickets() {
  const dispatch = useGlobalDispatch();
  const { ticketType } = useGlobalState();
  const [date] = useState("Oct 31 2020 09:00:00 GMT+0700");

  useEffect(() => {
    (async () => {
      if (ticketType.length === 0) {
        let tickets = await getTicketType();
        dispatch({
          type: ACTION.LOAD_TICKETTYPE,
          tickets: tickets,
        });
      }
    })();
  }, [dispatch, ticketType.length]);

  const addTicketToCart = (ticket) => {
    dispatch({
      type: ACTION.ADD_TO_CART,
      item: ticket,
    });
  };

  return (
    <Segment
      vertical
      padded="very"
      style={{ background: "#dadde6" }}
      id="booking"
    >
      <Header sub textAlign="center" className="section-header">
        Đặt vé
      </Header>
      <Container>
        <Divider horizontal>
          <Icon name="ticket" />
          <Icon name="ticket" />
          <Icon name="ticket" />
        </Divider>
      </Container>
      {Date.now() > Date.parse(date) ? (
        <Grid
          centered
          stackable
          columns={4}
          textAlign="center"
          style={{ maxWidth: "1570px" }}
        >
          {ticketType?.map((ticket) => (
            <Grid.Column key={ticket.id}>
              <TicketItem
                {...ticket}
                handleClick={() => addTicketToCart(ticket)}
              />
            </Grid.Column>
          ))}
        </Grid>
      ) : (
        <Container text>
          <Countdown inverted={false} date={date} />
        </Container>
      )}
    </Segment>
  );
}

export default Tickets;
