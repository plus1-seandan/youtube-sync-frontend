import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  Center,
  Input,
  VStack,
  Button,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { Rating } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

const Account = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    await axios.post(
      `http://localhost:5001/friends?friendId=${data.id}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setLoading(false);
  };
  return (
    <Box p={5} shadow="md" borderWidth="1px" w="100%">
      <Box d="flex" alignItems="flex-start" flexDirection="column">
        <HStack>
          <Avatar
            size="sm"
            name="Kent Dodds"
            src="https://crhscountyline.com/wp-content/uploads/2020/03/Capture.png"
          />
          <Heading fontSize="xl">{data.email}</Heading>
        </HStack>
        <Box d="flex" w="100%">
          <Text>
            {data.firstName} {data.lastName}
          </Text>
          <Spacer />
          <Button
            onClick={handleClick}
            isLoading={loading}
            disabled={data.friend}
          >
            Add as Friend
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const initState = {
  loading: false,
  accounts: [],
  page: 1,
  numPages: 0,
  search: "",
};
const SearchAccountBody = () => {
  const classes = useStyles();
  const [state, setState] = useState(initState);

  useEffect(() => {
    setState({ ...state, loading: true });
    const asyncFunc = async () => {
      await getAccountsWithPagination(state.search, state.page);
    };
    asyncFunc();
    setState({ ...state, loading: false });
  }, []);

  const getAccountsWithPagination = async (search, page) => {
    const { data } = await axios.get(
      `http://localhost:5001/accounts/search?search=${search}&page=${page}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const { accts, pages } = data;
    const res = await axios.get(`http://localhost:5001/friends`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    //loop and check if already friend
    const acctsWFriends = accts.map((acct) => {
      let result = res.data.filter((friend) => {
        return friend.id === acct.id;
      });
      if (result.length > 0) {
        acct["friend"] = true;
      } else {
        acct["friend"] = false;
      }
      return acct;
    });
    setState({
      ...state,
      accounts: acctsWFriends,
      page,
      numPages: pages,
    });

    return accts;
  };

  const handlePageChange = async (_, value) => {
    await getAccountsWithPagination(state.search, value);
  };

  const handleClick = async (e) => {
    await getAccountsWithPagination(state.search, 1);
  };

  return (
    <Box h="100%">
      <Box w="200px">
        <Stack>
          <Input
            placeholder="Search keywords..."
            onChange={(e) => setState({ ...state, search: e.target.value })}
          />
          <Button onClick={handleClick}>Search</Button>
        </Stack>
      </Box>
      <Box h="70%" overflowY="scroll" w="50%">
        <Stack spacing={8}>
          {state.loading && <Box>Loading...</Box>}
          {state.accounts &&
            state.accounts.map((acct) => <Account data={acct} />)}
        </Stack>
      </Box>
      <Center className={classes.root} mt="50px">
        <Pagination
          count={state.numPages}
          page={state.page}
          onChange={handlePageChange}
        />
      </Center>
    </Box>
  );
};

export default SearchAccountBody;
