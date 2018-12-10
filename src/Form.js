import React from 'react';
import TextField from '@material-ui/core/TextField';

export default class Form extends React.Component {
  state = {
    text: ''
  };

  handleChange = (e) => {
    const newText = e.target.value;
    this.setState({text: newText});
  }

  handleKeyDown = (e) => {
    let val = this.state.text.replace(/\s/g, "");
    if (e.key === 'Enter') {
      if (val.length === 3 && !isNaN(val)) {
        this.props.submit(val);
        this.setState({ text: '' });
      } else {
        alert("Oops! You need to enter 3 numbers!");
        this.setState({ text: '' });
      }
    }
  }

  render() {
    const { text } = this.state;
    return (
      <TextField
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        id="outlined-full-width"
        label="Enter 3 digit number please"
        style={{ margin: 8 }}
        fullWidth
        margin="normal"
        variant="outlined"
        value={text}
      />
    );
  }
}
