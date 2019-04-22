import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
    static propTypes = {
      callBack: PropTypes.func.isRequired,
    }

    constructor(props) {
      super(props);
      this.state = {
        value: '',
      };
    }

  handleChange = (e) => {
    const { value } = this.state;
    const { callBack } = this.props;
    this.setState({ value: e.target.value }, callBack(value));
  }

  render() {
    const { value } = this.state;
    return (
      <Fragment>
        <input type="text" value={value} onChange={this.handleChange} />
      </Fragment>
    );
  }
}
