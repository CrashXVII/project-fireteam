import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid black;
  background-image: url(http://www.bungie.net${props => props.character.emblemBackgroundPath});
  color: #fff;
  height: 96px;
  width: 474px;
  cursor: pointer;
`;

function CharacterSelect({ character, getCharacter }) {
  return (
    <Container
      character={character}
      onClick={
        () => getCharacter(character.membershipType, character.membershipId, character.characterId)}
    >
      <p>{character.light}</p>
    </Container>
  );
}

CharacterSelect.propTypes = {
  character: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  ).isRequired,
  getCharacter: PropTypes.func.isRequired,
};

export default CharacterSelect;
