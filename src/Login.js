import { auth, firebase } from "./firebase";
import React, { useEffect, useState } from "react";
import { Button, Form, Grid, Header, Icon, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useGlobalState } from "./store";

function Login() {
  const { cart, user } = useGlobalState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      if (cart.size > 0) {
        history.push("/checkout");
      } else {
        history.push("/profile");
      }
    }
  });

  const authGoogle = () => {
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(function (result) {
        history.push("/checkout");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Grid textAlign="center" style={{ height: "90vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Đăng nhập để tiếp tục
        </Header>
        <Form size="large">
          <Segment stacked>
            <Button
              fluid
              color="google plus"
              size="large"
              loading={loading}
              disabled={loading}
              onClick={authGoogle}
            >
              <Icon name="google" />
              Google
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
