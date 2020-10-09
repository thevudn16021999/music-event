import { auth, db, firebase } from "./firebase";
import React, { useEffect, useState } from "react";
import { Button, Form, Grid, Header, Icon, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useGlobalDispatch, useGlobalState } from "./store";
import { ACTION } from "./reducer";

function Login() {
  const { cart, user } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      if (cart.length > 0) {
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
        const { displayName, email, uid } = result.user;
        const userData = { id: uid, name: displayName, email: email };
        const userRef = db.collection("users").doc(uid);
        userRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              dispatch({
                type: ACTION.SET_USER,
                user: { ...doc.data(), id: uid },
              });
            } else {
              userRef.set(userData, { merge: true });
              dispatch({ type: ACTION.SET_USER, user: userData });
            }
          })
          .finally(() => {
            history.push("/checkout");
          });
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
