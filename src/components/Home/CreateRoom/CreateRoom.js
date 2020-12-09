import React, { useState, useEffect } from "react";
// import "./Join.css";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { addMyRoom } from "../../../actions";

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

const CreateRoom = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.currUserInfo);
  console.log(currUser);
  const [isPrivate, setIsPrivate] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRoom = {
      id: uuidv4(),
      name: event.target.elements.roomName.value,
      isPrivate: event.target.elements.isPrivate.checked,
    };
    if (newRoom.isPrivate) {
      newRoom.password = event.target.elements.password.value;
    } else {
      newRoom.password = "";
    }

    axios
      .post("http://localhost:5001/create-room", newRoom)
      .then(function (response) {
        console.log("room created successfully");
        const roomId = newRoom.id;
        const userId = currUser.id;

        axios
          .post("http://localhost:5001/add-member", {
            userId,
            roomId,
          })
          .then(function (response) {
            dispatch(addMyRoom(newRoom));
            history.push({
              pathname: `/room`,
              state: {
                email: currUser.email,
                userId: currUser.id,
                room: newRoom.name,
                roomId: newRoom.id,
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
          <CardHeader
            title="Create New Room"
            titleTypographyProps={{ align: "center" }}
          />
          <CardContent>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                id="form-room"
                label="Room Name"
                name="roomName"
                fullWidth={true}
              />
              <Checkbox
                name="isPrivate"
                checked={isPrivate}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                onClick={() => {
                  setIsPrivate(!isPrivate);
                }}
              />
              {isPrivate ? (
                <TextField
                  id="form-room"
                  label="Password"
                  name="password"
                  defaultValue=""
                  fullWidth={true}
                />
              ) : null}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create Room
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default CreateRoom;
