import React from 'react';
import PropTypes from 'prop-types';
import Character from './Character';

const CharacterList = ({ characterList, getCharacter }) => (
  <div>
    {characterList.map(character => (
      <Character key={character.characterId} getCharacter={getCharacter} character={character} />
    ))}
  </div>
);

CharacterList.propTypes = {
  characterList: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  getCharacter: PropTypes.func.isRequired,
};

export default CharacterList;
