import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  background: black;
  height: 60px;
  width: 60px;
`;


const Milestone = ({ milestone }) => (
  <div>
    {milestone.displayProperties.hasIcon && (
      <Img
        src={`https://www.bungie.net${milestone.displayProperties.icon}`}
        alt="Milestone Icon"
      />
    )}
    <p>{milestone.displayProperties.name}</p>
    <p>{milestone.displayProperties.description}</p>
    {milestone.completionValue > 0 && (
      <p>
        <span>{milestone.progress}</span>
        <span> of </span>
        <span>{milestone.completionValue}</span>
      </p>
    )}
  </div>
);

Milestone.propTypes = {
  milestone: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
  ).isRequired,
};
export default Milestone;
