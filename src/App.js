import React, { Component } from 'react';
import styled from 'styled-components';
import ProfileSearch from './ProfileSearch';
import CharacterList from './CharacterList';
import ProfileList from './ProfileList';
import HashConverter from './HashConverter';
import Character from './Character';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileList: [],
      charList: [],
      progressions: null,
    };
  }

  apiCall = async (urlFinish) => {
    try {
      const response = await fetch(`https://www.bungie.net${urlFinish}`, {
        method: 'GET',
        headers: {
          'X-API-Key': '27791402f9fd44678a53e1384df6565c',
        },
      });
      const json = await response.json();
      const results = await json.Response;
      return results;
    } catch (e) {
      throw new Error(e);
    }
  };

  int32 = (x) => {
    let y = x;
    if (y > 0xFFFFFFFFF) {
      throw new Error('Hash too big');
    }
    if (y > 0x7FFFFFFF) {
      y = 0x100000000 - x;
      if (y < 2147483648) {
        y = -y;
      } else {
        y = -2147483648;
      }
    }
    return y;
  }

  getProfile = async (membershipType, destinyMembershipId, displayName) => {
    const characterList = await this.apiCall(
      `/Platform/Destiny2/${membershipType}/Profile/${destinyMembershipId}/?components=Characters`,
    );
    const charList = await Object.values(characterList.characters.data);
    await this.setState({
      charList,
      displayName,
    });
  }

  getCharacter = async (membershipType, destinyMembershipId, characterId) => {
    const character = await this.apiCall(
      `/Platform/Destiny2/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/?components=Profiles,CharacterActivities,CharacterProgressions,CharacterInventories,CharacterEquipment`,
    );
    const progressions = await character.progressions.data;
    const activities = await character.activities.data;
    this.setState({
      activities,
      character,
      progressions,
    });
  }

  sendProfiles = (profileList) => {
    this.setState({
      profileList,
    });
  }

  getManifestData = async () => {
    const manifest = await this.apiCall(
      '/Platform/Destiny2/Manifest/',
    );
    this.setState({ manifest });
  }

  render() {
    const {
      charList,
      character,
      progressions,
      profileList,
      activities,
    } = this.state;
    return (
      <div>
        <Container>
          <ProfileSearch sendProfiles={this.sendProfiles} apiCall={this.apiCall} />
          <button type="button" onClick={this.getManifestData}>mani</button>
          {profileList.length > 0 && (
          <ProfileList profileList={profileList} getProfile={this.getProfile} />
          )}
          {charList.length > 0 && (
          <CharacterList
            characterList={charList}
            getCharacter={this.getCharacter}
          />
          )}
        </Container>
        <div>
          <HashConverter />
          {progressions && (
          <Character
            progressions={progressions}
            activities={activities}
            character={character}
          />
          )}
        </div>
      </div>
    );
  }
}
