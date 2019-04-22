import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Character extends Component {
  static propTypes = {
    progressions: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
      ]),
    ).isRequired,
  }

  constructor(props) {
    super(props);
    const { progressions } = this.props;
    this.state = {
      milestones: [],
      progressions,
    };
  }

  componentDidUpdate(prevProps) {
    const { progressions } = this.props;
    if (prevProps.progressions !== progressions) {
      this.setState([progressions]);
    }
  }

  int32 = (x) => {
    let y = x;
    if (y > 0xFFFFFFFFF) {
      throw new Error('Hash too big');
    }
    if (y > 0x7FFFFFFF) {
      y = 0x100000000 - x;
      if (y < 2147483648) {
        y = -y;
      } else {
        y = -2147483648;
      }
    }
    return y;
  }

  getFromDB = async (path, hash) => {
    try {
      const hashId = this.int32(hash);
      const response = await fetch(`http://localhost:3000/${path}/${hashId}`, {
        method: 'GET',
      });
      const data = await response.json();
      const milestones = await JSON.parse(data.json);
      this.setState({
        milestones,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  render() {
    const { progressions } = this.props;
    return (
      <div>
        <p>Milestone Testing</p>
      </div>
    );
  }
}
