import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  
`;

function Character({ character }) {
  return (
    <Container>
      <p>{character.light}</p>
    </Container>
  );
}

Character.propTypes = {
  character: PropTypes.objectOf(
    PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  ).isRequired,
};

export default Character;
