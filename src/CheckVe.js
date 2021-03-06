import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Input,
  Label,
  List,
  Menu,
  Statistic,
  Table,
} from "semantic-ui-react";
import { auth, db } from "./firebase";
import { getOrderByEmail, getOrderByPhone } from "./reducer";
import { currencyFormat } from "./util";
import { useGlobalState } from "./store";
// import axios from "./api";

function CheckVe() {
  const { user } = useGlobalState();
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [stat, setStat] = useState([]);

  useEffect(() => {
    (async () => {
      db.collection("orders")
        .where("paid", "==", false)
        .onSnapshot(async (querySnapshot) => {
          let list = [];
          for (const doc of querySnapshot.docs) {
            let data = doc.data();
            list.push({
              amount: data.amount,
              email: data.email,
              phone: data.userPhone,
              name: data.userName,
              detail: data.detail,
            });
          }
          setEmailList(list);
        });
      db.collection("orders")
        .where("paid", "==", true)
        .onSnapshot((querySnapshot) => {
          let localStat = new Map();
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            for (const item of data.detail) {
              if (localStat.has(item.name)) {
                localStat.set(item.name, localStat.get(item.name) + item.qty);
              } else {
                localStat.set(item.name, 0);
              }
            }
          });
          setStat([...localStat]);
        });
    })();
  }, []);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSearch = async () => {
    if (validateEmail(email)) {
      setOrders(await getOrderByEmail(email));
    } else {
      setOrders(await getOrderByPhone(email));
    }
  };

  const removeOrder = async (order_id) => {
    if (prompt("C?? ch???c ch???n mu???n xo?? (y/n)?") === "y") {
      try {
        const snapshot = await db
          .collection("tickets")
          .where("order", "==", order_id)
          .get();
        snapshot.forEach(async (doc) => await doc.ref.delete());
        await db.collection("orders").doc(order_id).delete();
        // const res = await axios.post("/order/delete", {
        //   order_id: id,
        // });
        // console.log(res);
        alert("Xo?? th??nh c??ng");
        await handleSearch();
      } catch (e) {
        console.log(e);
        alert("C?? l???i x???y ra");
      }
    }
  };

  const confirmOrder = async (order) => {
    if (prompt("Ch???c ch???n r???ng ho?? ????n n??y ???? thanh to??n (y/n)") === "y") {
      try {
        const snapshot = await db
          .collection("tickets")
          .where("order", "==", order.id)
          .get();
        snapshot.forEach(async (doc) => await doc.ref.delete());
        for (const item of order.detail) {
          const ticketTypeRef = db.collection("ticketType").doc(item.id);
          for (let i = 0; i < item.qty; i++) {
            await db.collection("tickets").add({
              uid: order.uid.id,
              timeCheck: false,
              checked: false,
              type: ticketTypeRef,
              order: order.id,
            });
          }
        }

        await db
          .collection("orders")
          .doc(order.id)
          .set({ paid: true }, { merge: true });
        // console.log(order);
        // const res = await axios.post("/order/confirm", {
        //   order_id: order.id,
        //   user_id: order.uid.id,
        //   detail: order.detail,
        // });
        alert("???? th??m v?? th??nh c??ng");
        await handleSearch();
      } catch (e) {
        console.log(e);
        alert("C?? l???i x???y ra");
      }
    }
  };

  // const handleChange = (e, { name, value }) => {
  //   setEmail(String(value).toLowerCase());
  // };

  return (
    <>
      <Menu>
        <Menu.Item as={Link} to={"/"}>
          Trang ch???
        </Menu.Item>
        <Menu.Item position="right">
          <Button
            onClick={() => {
              auth.signOut();
              history.push("/");
            }}
          >
            ????ng Xu???t
          </Button>
        </Menu.Item>
      </Menu>
      <Container>
        <Header size="huge">Th??m v?? cho ng?????i d??ng</Header>
        <Form>
          <Input
            onBlur={(e) => setEmail(e.target.value)}
            placeholder="S??T ho???c email"
            type="text"
          />
          <Button onClick={handleSearch}>T??m</Button>
        </Form>
        <Grid stackable columns={2}>
          {orders.length > 0 &&
            orders.map((order) => (
              <Grid.Column textAlign="center" key={order.id}>
                <Card>
                  <Card.Content>
                    <Card.Header>{order.id}</Card.Header>
                    <Card.Meta>{currencyFormat(order.amount)}</Card.Meta>
                    <Card.Meta>
                      {order.paid ? "???? thanh to??n" : "Ch??a thanh to??n"}
                    </Card.Meta>
                    <Card.Description>
                      <List divided selection>
                        {order.detail.map((item) => (
                          <List.Item key={item.name}>
                            <Label horizontal>
                              {item.qty}
                              <Label.Detail>{item.name}</Label.Detail>
                            </Label>
                          </List.Item>
                        ))}
                      </List>
                    </Card.Description>
                  </Card.Content>
                  {user.email === "murindeventa@gmail.com" ? (
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Button
                          basic
                          color="green"
                          onClick={() => confirmOrder(order)}
                        >
                          X??c nh???n
                        </Button>
                        <Button
                          basic
                          color="red"
                          onClick={() => removeOrder(order.id)}
                        >
                          Xo?? ho?? ????n
                        </Button>
                      </div>
                    </Card.Content>
                  ) : order.paid ? (
                    ""
                  ) : (
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Button
                          basic
                          color="green"
                          onClick={() => confirmOrder(order)}
                        >
                          X??c nh???n
                        </Button>
                        <Button
                          basic
                          color="red"
                          onClick={() => removeOrder(order.id)}
                        >
                          Xo?? ho?? ????n
                        </Button>
                      </div>
                    </Card.Content>
                  )}
                </Card>
              </Grid.Column>
            ))}
        </Grid>
      </Container>
      <Divider />
      <Container>
        <Header size="huge">Th???ng k?? s??? l?????ng v?? ???? thanh to??n (online)</Header>
        <Statistic.Group>
          {stat.length > 0 &&
            stat.map((s) => (
              <Statistic key={s[1] + s[0]}>
                <Statistic.Value>{s[1]}</Statistic.Value>
                <Statistic.Label>{s[0]}</Statistic.Label>
              </Statistic>
            ))}
        </Statistic.Group>
      </Container>
      <Divider />
      <Container>
        <Header size="huge">Danh s??ch email ({emailList.length})</Header>
        <Table basic="very" celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>S??T</Table.HeaderCell>
              <Table.HeaderCell>T??n</Table.HeaderCell>
              <Table.HeaderCell>Ti???n thanh to??n</Table.HeaderCell>
              <Table.HeaderCell>Lo???i V??</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {emailList.map((item, index) => (
              <Table.Row key={item.email + index}>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.phone}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>
                  <Label color="red" horizontal>
                    {currencyFormat(item.amount)}
                  </Label>
                </Table.Cell>
                <Table.Cell>
                  {item.detail.map((item) => (
                    <Label key={item.name + item.qty}>
                      {item.qty}
                      <Label.Detail>{item.name}</Label.Detail>
                    </Label>
                  ))}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    </>
  );
}

export default CheckVe;
