import React from "react";
import TextField from "@material-ui/core/TextField";

class Searchbar extends React.Component {
  handleChange = (event) => {
    console.log({ event });
    this.setState(
      {
        term: event.target.value,
      },
      () => {
        if (event.charCode === 13) {
          event.preventDefault();
          console.log({ term: this.state.term });
          this.props.handleFormSubmit(this.state.term);
        }
      }
    );
  };

  render() {
    return (
      <TextField
        id="filled-full-width"
        label="Search Video"
        style={{ margin: 8 }}
        placeholder="Funny Cat Videos"
        helperText="Enter any keywords"
        fullWidth
        onKeyPress={this.handleChange}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="filled"
      />
    );
  }
}
export default Searchbar;
