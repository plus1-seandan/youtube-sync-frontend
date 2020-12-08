import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useHistory } from "react-router-dom";

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

const MyRooms = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();

  const [myRooms, setMyRooms] = useState([]);
  console.log(user.id);

  useEffect(() => {
    axios
      .get("http://localhost:5001/search-myRooms", {
        params: {
          userId: user.id,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setMyRooms(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, [user]);

  const handleClick = (room) => {
    function inner(e) {
      const { id, name } = room;
      history.push({
        pathname: `/room?name=${user.id}&room=${name}`,
        state: {
          email: user.email,
          room: name,
          roomId: id,
        },
      });
    }
    return inner;
  };

  return (
    <div>
      <h1>My Rooms</h1>
      <div>
        {myRooms && !!myRooms.length > 0 && (
          <div>
            <List>
              {myRooms.map((room) => (
                <ListItem
                  className={classes.item}
                  button
                  key={room}
                  value="testRoomId"
                  onClick={handleClick(room)}
                >
                  {room.name}
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
