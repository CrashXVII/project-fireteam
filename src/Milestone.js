import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  background: black;
  height: 60px;
  width: 60px;
`;

export default class Milestone extends Component {
  static propTypes = {
    milestone: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
      PropTypes.object,
      PropTypes.number,
      PropTypes.string,
    ])).isRequired,
    liveData: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
      PropTypes.object,
      PropTypes.number,
      PropTypes.string,
    ])).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.handleLiveData();
  }

  handleLiveData = () => {
    const { liveData } = this.props;
    if (liveData.activities) {
      this.handleActivities();
    } else if (liveData.availableQuests) {
      this.handleQuests();
    }
  }

  handleQuests = () => {
    const { liveData } = this.props;
    /* eslint-disable prefer-destructuring */
    const objective = liveData.availableQuests[0].status.stepObjectives[0];
    const progress = objective.progress;
    const completionValue = objective.completionValue;
    /* eslint-enable prefer-destructuring */
    this.setState({
      progress,
      completionValue,
    });
  }

  handleActivities = () => {
    const { liveData } = this.props;
    if (liveData.activities[0].challenges.length > 0) {
      /* eslint-disable prefer-destructuring */
      const objective = liveData.activities[0].challenges[0].objective;
      const progress = objective.progress;
      const completionValue = objective.completionValue;
      /* eslint-enable prefer-destructuring */
      this.setState({
        progress,
        completionValue,
      });
    }
  }

  render() {
    const { milestone } = this.props;
    const { progress, completionValue } = this.state;
    return (
      <div>
        {milestone.displayProperties.hasIcon && (
          <Img
            src={`https://www.bungie.net${
              milestone.displayProperties.icon
            }`}
            alt="Milestone Icon"
          />
        )}
        <p>{milestone.displayProperties.name}</p>
        <p>{milestone.displayProperties.description}</p>
        {completionValue && (
          <p>
            <span>{progress}</span>
            <span>{completionValue}</span>
          </p>
        )}
      </div>
    );
  }
}
