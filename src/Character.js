import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  background: black;
`;

const Milestone = ({ milestones }) => (
  <div>
    {milestones.displayProperties.hasIcon
    && <Img src={`https://www.bungie.net${milestones.displayProperties.icon}`} alt="Milestone Icon" />
    }
    <p>{milestones.displayProperties.name}</p>
    <p>{milestones.displayProperties.description}</p>
  </div>
);

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
    this.state = {

    };
  }

  componentDidMount() {
    this.getMilestoneArray();
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

  getMilestoneArray = async () => {
    const { progressions } = this.props;
    const milestoneArray = Object.values(progressions.milestones);
    const milestoneList = await Promise.all(milestoneArray.map(
      milestone => this.getFromDB(milestone),
    ));
    await this.setState({
      milestoneList,
    });
  }

  getFromDB = async (milestone) => {
    try {
      const hash = milestone.milestoneHash;
      const hashId = this.int32(hash);
      const response = await fetch(
        `http://localhost:3000/milestones/${hashId}`,
        {
          method: 'GET',
        },
      );
      const data = await response.json();
      const milestones = await JSON.parse(data.json);
      return await milestones;
    } catch (error) {
      throw new Error(error);
    }
  }

  render() {
    const { milestoneList } = this.state;
    return (
      <div>
        <p>Milestone Testing</p>
        {milestoneList
          && milestoneList.map(milestones => <Milestone key={milestones.hash} milestones={milestones} />)}
      </div>
    );
  }
}
