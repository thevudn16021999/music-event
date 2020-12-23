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
    if (prompt("Có chắc chắn muốn xoá (y/n)?") === "y") {
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
        alert("Xoá thành công");
        await handleSearch();
      } catch (e) {
        console.log(e);
        alert("Có lỗi xảy ra");
      }
    }
  };

  const confirmOrder = async (order) => {
    if (prompt("Chắc chắn rằng hoá đơn này đã thanh toán (y/n)") === "y") {
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
        alert("Đã thêm vé thành công");
        await handleSearch();
      } catch (e) {
        console.log(e);
        alert("Có lỗi xảy ra");
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
          Trang chủ
        </Menu.Item>
        <Menu.Item position="right">
          <Button
            onClick={() => {
              auth.signOut();
              history.push("/");
            }}
          >
            Đăng Xuất
          </Button>
        </Menu.Item>
      </Menu>
      <Container>
        <Header size="huge">Thêm vé cho người dùng</Header>
        <Form>
          <Input
            onBlur={(e) => setEmail(e.target.value)}
            placeholder="SĐT hoặc email"
            type="text"
          />
          <Button onClick={handleSearch}>Tìm</Button>
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
                      {order.paid ? "Đã thanh toán" : "Chưa thanh toán"}
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
                          Xác nhận
                        </Button>
                        <Button
                          basic
                          color="red"
                          onClick={() => removeOrder(order.id)}
                        >
                          Xoá hoá đơn
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
                          Xác nhận
                        </Button>
                        <Button
                          basic
                          color="red"
                          onClick={() => removeOrder(order.id)}
                        >
                          Xoá hoá đơn
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
        <Header size="huge">Thống kê số lượng vé đã thanh toán (online)</Header>
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
        <Header size="huge">Danh sách email ({emailList.length})</Header>
        <Table basic="very" celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>SĐT</Table.HeaderCell>
              <Table.HeaderCell>Tên</Table.HeaderCell>
              <Table.HeaderCell>Tiền thanh toán</Table.HeaderCell>
              <Table.HeaderCell>Loại Vé</Table.HeaderCell>
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
