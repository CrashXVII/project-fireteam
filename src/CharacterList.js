import React from 'react';
import PropTypes from 'prop-types';
import Character from './Character';

const CharacterList = ({ characterValues, getCharacter }) => (
  <div>
    {characterValues.map(character => (
      <Character key={character.characterId} onClick={getCharacter} character={character} />
    ))}
  </div>
);

CharacterList.propTypes = {
  characterValues: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  getCharacter: PropTypes.func.isRequired,
};

export default CharacterList;
