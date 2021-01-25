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
} from "@chakra-ui/react";
import { Rating } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

const Account = ({ data }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" w="500px">
      <Box d="flex" alignItems="flex-start" flexDirection="column">
        <Avatar size="sm" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
        <Heading fontSize="xl">{data.email}</Heading>
        <Text>
          {data.firstName} {data.lastName}
        </Text>
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
    setState({
      ...state,
      accounts: accts,
      page,
      numPages: pages,
    });

    return accts;
  };

  const handlePageChange = async (_, value) => {
    // await getReviewsFromServer(state.search, value);
    await getAccountsWithPagination(state.search, value);
  };

  const handleClick = async (e) => {
    await getAccountsWithPagination(state.search, 1);
  };

  useEffect(() => {
    setState({ ...state, loading: true });
    const asyncFunc = async () => {
      await getAccountsWithPagination(state.search, state.page);
    };
    asyncFunc();
    setState({ ...state, loading: false });
  }, []);

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
      <Box h="70%" border="solid" overflowY="scroll">
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
