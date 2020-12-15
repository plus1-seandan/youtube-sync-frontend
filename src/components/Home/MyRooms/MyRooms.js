import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMyRooms } from "../../../actions";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import MyRoom from "./MyRoom/MyRoom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const MyRooms = () => {
  const classes = useStyles();
  const history = useHistory();
  const currUser = useSelector((state) => state.currUserInfo);
  const myRooms = useSelector((state) => state.myRooms);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [pwdInputs, setPwdInputs] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5001/rooms/get-my-rooms", {
        params: {
          userId: currUser.id,
        },
      })
      .then(function (response) {
        console.log(response);
        dispatch(getMyRooms(response.data));
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  const handleClick = (room) => {
    function inner(e) {
      console.log(e);
      // history.push({
      //   pathname: `/room`,
      //   state: {
      //     roomId: room.id,
      //   },
      // });
    }
    return inner;
  };

  const handleOnChange = (e) => {
    console.log(e);
    // setPwdInputs(
    //   produce((draft) => {
    //     draft[]
    //   })
    // );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  if (isLoading) {
    return <h1>My Rooms</h1>;
  }
  return (
    <div>
      <h1>My Rooms</h1>
      <div>
        {myRooms && (
          <div>
            <List>
              {Object.entries(myRooms).map(([key, value], i) => (
                <MyRoom room={value.room} />
              ))}
            </List>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRooms;
