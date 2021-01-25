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
  Button,
} from "@chakra-ui/react";
import { Rating } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

const Account = ({ data }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Box d="flex" alignItems="center">
        <Avatar size="sm" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
        <Heading fontSize="xl" ml="20px">
          {data.firstName} {data.lastName[0]}.
        </Heading>
      </Box>
      <Text mt={4}>{data.comments}</Text>
      <Box component="fieldset" mt={3} borderColor="transparent">
        <Rating
          name="read-only"
          value={data.rating}
          readOnly
          icon={<FavoriteIcon fontSize="inherit" />}
        />
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
      `http://localhost:5001/accounts/search?search=${state.search}&page=${state.page}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const { accounts, pages } = data;
    setState({
      ...state,
      accounts,
      page,
      numPages: pages,
    });

    return accounts;
  };

  const handlePageChange = async (_, value) => {
    // await getReviewsFromServer(state.search, value);
  };
  const getReviews = async () => {
    // await getReviewsFromServer(state.search, state.page);
  };
  const handleClick = async (e) => {
    // await getReviewsFromServer(state.search, 1);
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
    <Box>
      <Box mt="20px" w="200px" mb="30px">
        <Stack>
          <Input
            placeholder="Search keywords..."
            onChange={(e) => setState({ ...state, search: e.target.value })}
          />
          <Button onClick={handleClick}>Search</Button>
        </Stack>
      </Box>
      <Stack spacing={8}>
        {state.loading && <Box>Loading...</Box>}
        {state.accounts &&
          state.accounts.map((acct) => <Account data={acct} />)}
        <Center className={classes.root} mt="50px">
          <Pagination
            count={state.numPages}
            page={state.page}
            onChange={handlePageChange}
          />
        </Center>
      </Stack>
    </Box>
  );
};

export default SearchAccountBody;
