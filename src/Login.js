import { auth, firebase } from "./firebase";
import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import Steps from "./components/Steps";

function Login() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const authGoogle = () => {
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(function (result) {
        console.log(result);
        history.push("/checkout");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Steps step={0} />
      <Grid
        textAlign="center"
        style={{ height: "90vh" }}
        verticalAlign="middle"
      >
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
          <Message>
            New to us? <a href="#">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default Login;
