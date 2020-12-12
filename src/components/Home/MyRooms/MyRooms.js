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

  useEffect(() => {
    axios
      .get("http://localhost:5001/search-myRooms", {
        params: {
          userId: currUser.id,
        },
      })
      .then(function (response) {
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
      history.push({
        pathname: `/room`,
        state: {
          roomId: room.id,
        },
      });
    }
    return inner;
  };

  if (isLoading) {
    return null;
  }
  return (
    <div>
      <h1>My Rooms</h1>
      <div>
        {myRooms && (
          <div>
            <List>
              {Object.entries(myRooms).map(([key, value], i) => (
                <ListItem className={classes.item} button key={key}>
                  <ListItemText
                    id={value.room.id}
                    primary={<p>{value.room.name}</p>}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="myRoom"
                      onClick={handleClick(value.room)}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRooms;
