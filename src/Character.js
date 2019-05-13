import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Milestone from './Milestone';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default class Character extends Component {
  static propTypes = {
    progressions: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
      ]),
    ).isRequired,
    displayName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      milestoneDefinitions: [],
    };
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
    const liveDataArray = Object.values(
      progressions.milestones,
    );
    const milestoneDefinitions = await Promise.all(
      liveDataArray.map(milestone => this.getMilestoneFromDB(milestone)),
    );
    await this.setState({
      milestoneDefinitions,
    });
    await this.createMilestoneArray();
  };

  createMilestoneArray = () => {
    const { milestoneDefinitions } = this.state;
    const { progressions } = this.props;
    const milestoneArray = milestoneDefinitions.map(
      milestone => this.createMilestone(milestone, progressions.milestones[milestone.hash]),
    );
    this.setState({
      milestoneArray,
    });
  }

  createMilestone = (definition, liveData) => {
    const milestone = {};
    milestone.progress = this.getLiveProgress(liveData).progress;
    milestone.completionValue = this.getLiveProgress(liveData).completionValue;
    milestone.displayProperties = definition.displayProperties;
    milestone.hash = liveData.milestoneHash;
    return milestone;
  }

  getLiveProgress = (liveData) => {
    if (liveData.activities) {
      return this.handleActivities(liveData);
    }

    if (liveData.availableQuests) {
      return this.handleQuests(liveData);
    }
    return {
      progress: 0,
      completionValue: 0,
    };
  }

  handleQuests = (liveData) => {
  /* eslint-disable prefer-destructuring */
    const objective = liveData.availableQuests[0].status.stepObjectives[0];
    const progress = objective.progress;
    const completionValue = objective.completionValue;
    /* eslint-enable prefer-destructuring */
    return {
      progress,
      completionValue,
    };
  }

  handleActivities = (liveData) => {
    if (liveData.activities[0].challenges.length > 0) {
      /* eslint-disable prefer-destructuring */
      const objective = liveData.activities[0].challenges[0].objective;
      const progress = objective.progress;
      const completionValue = objective.completionValue;
      /* eslint-enable prefer-destructuring */
      return {
        progress,
        completionValue,
      };
    }
    return {
      progress: 0,
      completionValue: 0,
    };
  }

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
    const { milestoneArray } = this.state;
    const { displayName } = this.props;
    return (
      <Wrapper>
        <p>{displayName}</p>
        {milestoneArray
          && milestoneArray.map(milestone => (
            <Milestone
              milestone={milestone}
              key={milestone.hash}
            />
          ))}
      </Wrapper>
    );
  }
}
