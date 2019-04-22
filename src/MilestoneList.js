import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MilestoneList extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
    this.state = {
      milestones: [],
    };
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
        progressions: this.props.progressions,
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
