import React, { useState } from "react";
import { Box, Button, VStack, Heading, Text, Input } from "@chakra-ui/react";

const VideoSearch = ({ searchVideos }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Box>
      <Box>
        <Text mb="8px">Search for videos here</Text>
      </Box>
      <Box d="flex">
        <Input
          value={query}
          onChange={handleChange}
          placeholder="Funny Cat Videos"
          size="m"
        />
        <Button onClick={() => searchVideos(query)}>Search</Button>
      </Box>
    </Box>
  );
};

// class Searchbar extends React.Component {
//   handleChange = (event) => {
//     this.setState(
//       {
//         term: event.target.value,
//       },
//       () => {
//         if (event.charCode === 13) {
//           event.preventDefault();
//           this.props.handleFormSubmit(this.state.term);
//         }
//       }
//     );
//   };

//   render() {
//     return (
//       <TextField
//         id="filled-full-width"
//         label="Search Video"
//         style={{ margin: 8 }}
//         placeholder="Funny Cat Videos"
//         helperText="Enter any keywords"
//         fullWidth
//         onKeyPress={this.handleChange}
//         margin="normal"
//         InputLabelProps={{
//           shrink: true,
//         }}
//         variant="filled"
//       />
//     );
//   }
// }
export default VideoSearch;
