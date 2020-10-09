import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { auth } from "./firebase";

function Profile() {
  const history = useHistory();
  return (
    <div>
      <Button
        onClick={() => {
          auth.signOut();
          history.push("/");
        }}
      >
        Sign out
      </Button>
    </div>
  );
}

export default Profile;
