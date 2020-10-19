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
import {
  ACTION,
  getCartDetail,
  getCartTotalCost,
  getTicketQuantity,
} from "./reducer";
import { useGlobalDispatch, useGlobalState } from "./store";
import { currencyFormat } from "./util";
import axios, { callPayment } from "./api";

const genderOptions = [
  { key: "m", text: "Nam", value: "male" },
  { key: "f", text: "Nữ", value: "female" },
  { key: "o", text: "Khác", value: "other" },
];

function Checkout() {
  const { cart, user } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const tickets = getCartDetail(cart);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      if (!user.gender || !user.age || !user.phone)
        db.collection("users")
          .doc(user.id)
          .get({ source: "default" })
          .then((doc) => {
            dispatch({
              type: ACTION.SET_USER,
              user: { id: doc.id, ...doc.data() },
            });
          })
          .catch((e) => console.log(e));
    }
  }, []);

  const addItem = (item) => {
    dispatch({
      type: ACTION.ADD_TO_CART,
      item: item,
    });
  };

  const removeItem = (item) => {
    dispatch({
      type: ACTION.REMOVE_FROM_CART,
      item: item,
    });
  };

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

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      name: user.name,
      email: user.email,
      gender: user.gender,
      phone: user.phone,
      age: user.age,
    };
    let orders = [];
    for (const [item, qty] of cart) {
      orders.push({ id: item.id, qty: qty });
    }
    // db.collection("users").doc(user.id).set(data, { merge: true });
    try {
      const res = await axios.post("/order/create", {
        uid: user.id,
        order: orders,
      });
      console.log(res);
      if (res.status === 200) {
        callPayment({ ...res.data, login_msisdn: user.phone });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      // textAlign="center"
      style={{ minHeight: "53vh" }}
      verticalAlign="middle"
      container
      stackable
      reversed="mobile"
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
          <Button
            loading={loading}
            disabled={loading}
            type="submit"
            color="blue"
            size="large"
            floated="right"
          >
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
                      value={getTicketQuantity(cart, item)}
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
