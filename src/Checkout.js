import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Item,
  Message,
} from "semantic-ui-react";
import { db } from "./firebase";
import { ACTION, getCartTotalCost, getTicketsQuantity } from "./reducer";
import { useGlobalDispatch, useGlobalState } from "./store";
import { currencyFormat } from "./util";

function Checkout() {
  const { cart, user } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const tickets = getTicketsQuantity(cart);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  });

  const addItem = (item) => {
    dispatch({
      type: ACTION.ADD_TO_CART,
      item: item,
    });
  };

  const removeItem = (item) => {
    dispatch({
      type: ACTION.REMOVE_FROM_CART,
      id: item.id,
    });
  };

  const genderOptions = [
    { key: "m", text: "Nam", value: "male" },
    { key: "f", text: "Nữ", value: "female" },
    { key: "o", text: "Khác", value: "other" },
  ];

  const isCheck = (cond) => {
    if (cond) {
      return { name: "check", color: "green" };
    } else {
      return { name: "x", color: "red" };
    }
  };

  const handleChange = (e, { name, value }) => {
    dispatch({ type: ACTION.SET_USER, user: { ...user, [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tickets);
    let data = {
      name: user.name,
      email: user.email,
      gender: user.gender,
      phone: user.phone,
      age: user.age,
    };
    db.collection("users").doc(user.id).set(data, { merge: true });
  };

  return (
    <Grid
      // textAlign="center"
      style={{ minHeight: "53vh" }}
      verticalAlign="middle"
      container
      stackable
      columns={2}
    >
      <Grid.Column>
        <Header>Thông tin khách hàng</Header>
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="name"
              value={user?.name}
              label="Họ và tên"
              placeholder="Nguyễn Văn A"
              onChange={handleChange}
              required
              // readOnly
              // icon={isCheck(true)}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Select
              fluid
              name="gender"
              value={user?.gender}
              label="Giới tính"
              options={genderOptions}
              placeholder="Nam"
              onChange={handleChange}
              required
            />
            <Form.Input
              fluid
              name="age"
              value={user?.age}
              label="Độ tuổi"
              type="number"
              placeholder="18"
              onChange={handleChange}
              // icon={isCheck(userData.age != null)}
              required
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="phone"
              value={user?.phone}
              label="Số điện thoại"
              type="tel"
              placeholder="0905999999"
              onChange={handleChange}
              // icon={isCheck(userData.phone != null)}
              required
            />
            <Form.Input
              fluid
              name="email"
              value={user?.email}
              label="E-mail"
              type="email"
              placeholder="example@gmail.com"
              // onChange={handleChange}
              required
              readOnly
              icon={isCheck(true)}
            />
          </Form.Group>
          <Link to={"/"} style={{ color: "red" }}>
            <Icon name="arrow left" />
            Trở về Trang Chủ
          </Link>
          <Button type="submit" color="blue" size="large" floated="right">
            Thanh Toán
          </Button>
        </Form>
      </Grid.Column>
      <Grid.Column>
        <Message>
          <Item.Group divided>
            {tickets.map((item, index) => (
              <Item key={item.id}>
                <Item.Content>
                  <Item.Header>{item.name}</Item.Header>
                  <Item.Meta>{currencyFormat(item.price)}</Item.Meta>
                  <Item.Extra>
                    <Input
                      type="number"
                      value={item.qty}
                      size="mini"
                      placeholder="Số vé "
                      action
                    >
                      <input />
                      <Button
                        size="mini"
                        icon="minus"
                        onClick={() => removeItem(item)}
                      />
                      <Button
                        size="mini"
                        icon="plus"
                        onClick={() => addItem(item)}
                      />
                    </Input>
                  </Item.Extra>
                </Item.Content>
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
    </Grid>
  );
}

export default Checkout;
