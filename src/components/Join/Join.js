import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import axios from "axios";
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

const Join = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get("http://localhost:5001/search-room", {
        params: {
          name: event.target.elements.roomName.value,
        },
      })
      .then(function (response) {
        const room = response.data;
        const userId = user.id;
        const roomId = room.id;
        axios
          .post("http://localhost:5001/add-member", {
            userId,
            roomId,
          })
          .then(function (response) {
            history.push({
              pathname: `/room?name=${user.id}&room=${room.name}`,
              state: {
                email: user.email,
                room: room.name,
                roomId: roomId,
              },
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justify="center">
        <Card>
          <CardHeader title="Join" titleTypographyProps={{ align: "center" }} />
          <CardContent>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                id="form-name"
                label="Name"
                name="user"
                fullWidth={true}
                defaultValue={user.email}
                inputProps={{
                  readOnly: true,
                }}
                // onChange={(event) => setName(event.target.value)}
              />
              <TextField
                id="form-room"
                label="Room Name"
                name="roomName"
                fullWidth={true}
                // onChange={(event) => setRoom(event.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Join Room
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Join;