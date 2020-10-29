import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { auth } from "./firebase";
import QRCode from "qrcode.react";
import { useGlobalState } from "./store";

function Profile() {
  const history = useHistory();
  const { user } = useGlobalState(); 

  return (
    <>
      <Menu>
        <Menu.Item href="/">Trang chủ</Menu.Item>
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
      {user ? <QRCode value={user?.id} /> : ""}
    </>
  );
}

export default Profile;
