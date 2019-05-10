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

  render() {
    const { milestone } = this.props;
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
      </div>
    );
  }
}
