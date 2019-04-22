import React from 'react';
import PropTypes from 'prop-types';
import CharacterSelect from './CharacterSelect';

const CharacterList = ({ characterList, getCharacter }) => (
  <div>
    {characterList.map(character => (
      <CharacterSelect
        key={character.characterId}
        getCharacter={getCharacter}
        character={character}
      />
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
