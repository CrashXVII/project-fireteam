import React, { Component, Fragment } from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    const { value } = this.state;
    return (
      <Fragment>
        <input type="text" value={value} />
      </Fragment>
    );
  }
}
