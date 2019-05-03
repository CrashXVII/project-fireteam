import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Milestone from './Milestone';

const Img = styled.img`
  background: black;
`;

// const Milestone = ({ milestone }) => (
//   <div>
//     {milestone.displayProperties.hasIcon
//   && <Img src={`https://www.bungie.net${milestone.displayProperties.icon}`} alt="Milestone Icon" />
//   }
//     <p>{milestone.displayProperties.name}</p>
//     <p>{milestone.displayProperties.description}</p>
//   </div>
// );

export default class Character extends Component {
  static propTypes = {
    progressions: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
      ]),
    ).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getMilestoneArray();
  }

  int32 = (x) => {
    let y = x;
    if (y > 0xfffffffff) {
      throw new Error('Hash too big');
    }
    if (y > 0x7fffffff) {
      y = 0x100000000 - x;
      if (y < 2147483648) {
        y = -y;
      } else {
        y = -2147483648;
      }
    }
    return y;
  };

  getMilestoneArray = async () => {
    const { progressions } = this.props;
    const milestoneArray = Object.values(
      progressions.milestones,
    );
    const milestoneList = await Promise.all(
      milestoneArray.map(milestone => this.getMilestoneFromDB(milestone)),
    );
    await this.setState({
      milestoneList,
    });
  };


  getMilestoneFromDB = async (milestone) => {
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
      const milestones = await JSON.parse(
        data.json,
      );
      // TODO: There will be failure here when database is out of date!
      return await milestones;
    } catch (error) {
      throw new Error(error);
    }
  };

  // TODO: Next up is calls to the API to check live status of Milestone progression.

  render() {
    const { milestoneList } = this.state;
    return (
      <div>
        <p>Milestone Testing</p>
        {milestoneList
          && milestoneList.map(milestone => (
            <Milestone
              key={milestone.hash}
              milestone={milestone}
            />
          ))}
      </div>
    );
  }
}
