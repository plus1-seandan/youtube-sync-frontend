import { useEffect, useState } from "react";
import {
  GridItem,
  Grid,
  Box,
  Image,
  Button,
  Text,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getMe } from "../util/account";

const PublicRooms = () => {
  const [rooms, setRooms] = useState();

  useEffect(() => {
    async function asyncFunc() {
      const { data } = await axios.get(
        `http://${process.env.REACT_APP_SERVER_URL}:5001/rooms/public`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setRooms(data);
    }
    asyncFunc();
  }, []);

  return (
    <Box mt="30px" overflowY="scroll" h="100%" overflow="scroll">
      <Heading>Join Public Rooms</Heading>
      <Grid templateColumns="repeat(12, 1fr)" gap={8}>
        {rooms?.map((room) => (
          <GridItem colSpan={4}>
            <Room room={room} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
export default PublicRooms;

const Room = ({ room }) => {
  const history = useHistory();

  const handleJoinRoom = async () => {
    const me = await getMe();
    console.log({ me });
    await addRoomMember(me.data.id);
    history.push(`/room/${room.id}`);
  };
  const addRoomMember = async (memberId) => {
    try {
      return await axios.post(
        `http://${process.env.REACT_APP_SERVER_URL}:5001/rooms/members?memberId=${memberId}&roomId=${room.id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box
      d="flex"
      flexDirection="column"
      w="100%"
      h="100%"
      borderWidth="1px"
      borderRadius="lg"
      border="solid"
    >
      <Image
        objectFit="cover"
        src={room.video.snippet.thumbnails.medium.url}
        alt="Could not load image"
      />
      <Heading>{room.name}</Heading>
      <Box
        mt="1"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        overflow="hidden"
      >
        {room.video.snippet.title}
      </Box>
      <Spacer />
      <Box justifyContent="flex-end" pt="20px">
        <Button onClick={handleJoinRoom}>Join Room</Button>
      </Box>
    </Box>
  );
};
