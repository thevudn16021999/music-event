import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Container,
  Card,
  Grid,
  Header,
  Menu,
  Message,
  Label,
} from "semantic-ui-react";
import { auth } from "./firebase";
import QRCode from "qrcode.react";
import { useGlobalDispatch, useGlobalState } from "./store";
import { ACTION, getOrderOfUser, getTicketOfUser } from "./reducer";
import { db } from "./firebase";

function Profile() {
  const history = useHistory();
  const { user, tickets } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const [order, setOrder] = useState(false);

  useEffect(() => {
    (async () => {
      if (user && tickets.length === 0) {
        db.collection("tickets")
          .where("uid", "==", user.id)
          .onSnapshot((querySnapshot) => {
            let tickets = [];
            querySnapshot.forEach((doc) => {
              tickets.push({ ...doc.data(), id: doc.id });
            });
            dispatch({
              type: ACTION.LOAD_TICKETS,
              tickets: tickets,
            });
          });
        // let tickets = await getTicketOfUser(user.id);
        let getOrder = await getOrderOfUser(user.id);
        setOrder(getOrder);
      }
    })();
  }, [user]);

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
      {order === false ? (
        ""
      ) : (
        <Container>
          <Header size="huge">Hướng Dẫn Thanh toán</Header>
          <Message positive>
            <Message.Header>Cảm ơn bạn ! Chúc một ngày tốt lành</Message.Header>
            <p>
              Chuyển khoản vào thông tin tài khoản dưới đây với nội dung
              <br />
              <b>"{user?.name} - số điện thoại - số vé"</b>
              <br />
              Ví dụ: "Nguyễn Văn Tài - 09059999999 - 2 vé"
              <br />
              Thanh toán trong vòng 6h kể từ lúc đăng kí. Quá thời hạn này, vé
              sẽ bị huỷ.
              <br />
              Lưu ý : Không chuyển tiền từ cây ATM (vì cây ATM không hỗ trợ nhập
              nội dung chuyển tiền nên BTC sẽ không thể xác nhận được thông tin
              chuyển khoản của bạn trên hoá đơn).
              <br />
              <br />
              Thông tin tài khoản:
              <br />
              Hồ Hoàng Như Nguyệt - Trưởng ban tổ chức
              <br />
              <b>Số tài khoản: 03687504601</b>
              <br />
              <b>Chủ tài khoản: HO HOANG NHU NGUYET</b>
              <br />
              Tên NH: TP bank (Ngân hàng Tiên Phong)
              <br />
              Chi nhánh: Đà Nẵng
              <br />
              Vui lòng kiểm tra giỏ hàng thường xuyên để cập nhật vé. Nếu quá 3
              tiếng vẫn chưa nhận được vé vui lòng liên hệ SĐT
              <b>0393249777 - Nguyệt</b>
              <br />
              <b>
                Chúc bạn có trải nghiệm tuyệt vời tại Dreamers Concert! Quẩy hết
                mình nhé
              </b>
            </p>
          </Message>
        </Container>
      )}

      {tickets?.length > 0 ? (
        <Container>
          <Header size="huge">Vé đã mua</Header>
          <Grid stackable columns={3}>
            {tickets?.map((ticket) => (
              <Grid.Column textAlign="center" key={ticket.id}>
                <Card centered>
                  <QRCode
                    style={{ margin: "1em auto", borderRadius: "0" }}
                    renderAs={"canvas"}
                    size={250}
                    value={ticket.id}
                  />
                  <Card.Content>
                    <Card.Header>
                      {ticket.checked ? (
                        <Label color="red" attached="top left">
                          Đã Check-in
                        </Label>
                      ) : (
                        ""
                      )}
                      {
                        {
                          Ktlfada4M0hUSQXzmdj5: "Mơ Sớm",
                          g9rl8PEYPMDDZVhJQ0Ey: "Early Bird",
                          mf9pokVR3QKLi4Ib1EPV: "Mơ Xa Hoa",
                          rMlDTF1E3K0ucGl4cgMz: "Mơ Điêu",
                        }[ticket.type.id]
                      }
                    </Card.Header>
                  </Card.Content>
                  {/* <Card.Content></Card.Content> */}
                </Card>
              </Grid.Column>
            ))}
          </Grid>
        </Container>
      ) : (
        ""
      )}
    </>
  );
}

export default Profile;
