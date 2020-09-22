import React from "react";
import { Divider, Grid, Item, ItemContent, Message } from "semantic-ui-react";
import { getCartTotalCost, getTicketsQuantity } from "./reducer";
import { useGlobalState } from "./store";
import { currencyFormat } from "./util";

function Checkout() {
  const { cart } = useGlobalState();
  const tickets = getTicketsQuantity(cart);
  console.log(tickets);

  return (
    <Grid
      // textAlign="center"
      style={{ height: "93vh" }}
      verticalAlign="middle"
      container
      stackable
      columns={2}
    >
      <Grid.Column>
        <Message>
          <Item.Group divided>
            {tickets.map((item, index) => (
              <Item>
                <Item.Content>
                  <Item.Header>{item.name}</Item.Header>
                  <Item.Meta>{currencyFormat(item.price)}</Item.Meta>
                </Item.Content>
                <Item.Content></Item.Content>
              </Item>
            ))}
            <Item>
              <Item.Content>
                <Item.Header className="right floated">
                  {currencyFormat(getCartTotalCost(cart))}
                </Item.Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Message>
      </Grid.Column>
      <Grid.Column></Grid.Column>
    </Grid>
  );
}

export default Checkout;
