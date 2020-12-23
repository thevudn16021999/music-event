import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Icon, Message } from "semantic-ui-react";
import { ACTION, getTicketQuantity } from "./reducer";
import { useGlobalDispatch, useGlobalState } from "./store";

function Confirm() {
  const [code, setCode] = useState(null);
  const dispatch = useGlobalDispatch();
  const { user, cart } = useGlobalState();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCode(params.get("error_code"));
    return () => {
      dispatch({
        type: ACTION.CLEAR_CART,
      });
    };
  }, []);

  return (
    <Grid
      container
      stackable
      textAlign="center"
      style={{ height: "90vh" }}
      verticalAlign="middle"
    >
      <Grid.Column>
        {
          {
            "00": (
              <Message positive>
                <Message.Header>
                  Cảm ơn bạn ! Chúc một ngày tốt lành
                </Message.Header>
                <h1>Hướng dẫn thanh toán</h1>
                <p>
                  Chuyển khoản vào thông tin tài khoản dưới đây với nội dung
                  <br />
                  <b>
                    "{user?.name} - {user?.phone} - {getTicketQuantity(cart)}{" "}
                    vé"
                  </b>
                  <br />
                  Thanh toán trong vòng 6h kể từ lúc đăng kí. Quá thời hạn này,
                  vé sẽ bị huỷ.
                  <br />
                  Lưu ý : Không chuyển tiền từ cây ATM (vì cây ATM không hỗ trợ
                  nhập nội dung chuyển tiền nên BTC sẽ không thể xác nhận được
                  thông tin chuyển khoản của bạn trên hoá đơn).
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
                  Vui lòng kiểm tra giỏ hàng thường xuyên để cập nhật vé. Nếu
                  quá 3 tiếng vẫn chưa nhận được vé vui lòng liên hệ SĐT{" "}
                  <b>0393249777 - Nguyệt</b>
                  <br />
                  <b>
                    Chúc bạn có trải nghiệm tuyệt vời tại Dreamers Concert! Quẩy
                    hết mình nhé
                  </b>
                </p>
              </Message>
            ),
            NO: (
              <Message negative>
                <Message.Header>Hết Vé</Message.Header>
                <p>Hiện tại đã bán hết vé</p>
              </Message>
            ),
            500: (
              <Message negative>
                <Message.Header>Lỗi hệ thống</Message.Header>
                <p>
                  Xin lỗi vì sự bất tiện này. Bạn có thể chờ một thời gian và
                  thử lại.
                </p>
              </Message>
            ),
            default: (
              <Message>
                <Message.Header>Vui lòng đặt vé trước</Message.Header>
              </Message>
            ),
          }[code || "default"]
        }
        <Link to={"/profile"} style={{ color: "red" }}>
          <Icon name="arrow left" />
          Trở về
        </Link>
      </Grid.Column>
    </Grid>
  );
}

export default Confirm;
