import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid red;
  background-image: url(http://www.bungie.net${props => props.character.emblemBackgroundPath});
  color: #fff;
`;

function Character({ character }) {
  return (
    <Container character={character}>
      <p>{character.light}</p>
    </Container>
  );
}

Character.propTypes = {
  character: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  ).isRequired,
};

export default Character;
