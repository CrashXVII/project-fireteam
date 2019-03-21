import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  border-radius: 5px;
  background: rgb(70, 101, 184);
  color: white;
  width: 120px;
  height: 35px;
  :hover {
    border: solid 2px rgb(95, 207, 235);
  }
`;

const Milestones = ({ hash, clickHandler }) => (
  <Button type="button" onClick={clickHandler}>
    {hash}
  </Button>
);

Milestones.defaultProps = {
  hash: '0',
  clickHandler: () => {},
};

Milestones.propTypes = {
  hash: PropTypes.string,
  clickHandler: PropTypes.func,
};

export default Milestones;
