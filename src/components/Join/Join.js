import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const classes = useStyles();
  const history = useHistory();

  function navigate_to_chat(e) {
    if (!name || !room) {
      return;
    }
    history.push(`/chat?name=${name}&room=${room}`);
  }

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justify="center">
        <Card>
          <CardHeader title="Join" titleTypographyProps={{ align: "center" }} />
          <CardContent>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="form-name"
                label="Name"
                fullWidth={true}
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                id="form-room"
                label="Room"
                fullWidth={true}
                onChange={(event) => setRoom(event.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => navigate_to_chat(e)}
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Join;
