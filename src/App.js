import React, { Component } from 'react';
import styled from 'styled-components';
import ProfileSearch from './ProfileSearch';
import CharacterList from './CharacterList';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charSearch: '',
      profileList: [],
      charList: [],
    };
  }

  handleInput = (e) => {
    this.setState({ charSearch: e.target.value });
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

  getFromDB = async (path, hash) => {
    try {
      const hashId = this.int32(hash);
      const response = await fetch(`http://localhost:3000/${path}/${hashId}`, {
        method: 'GET',
      });
      const data = await response.json();
      const results = await JSON.parse(data.json);
      this.setState({
        results,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

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

  searchProfiles = async (e) => {
    e.preventDefault();
    const { charSearch } = this.state;
    const profileList = await this.apiCall(`/Platform/Destiny2/SearchDestinyPlayer/all/${charSearch}/`);
    this.setState({
      profileList,
    });
  };

  getProfile = async (membershipType, destinyMembershipId) => {
    const characterList = await this.apiCall(
      `/Platform/Destiny2/${membershipType}/Profile/${destinyMembershipId}/?components=Characters`,
    );
    const charList = await Object.values(characterList.characters.data);
    await this.setState({
      charList,
    });
  }

  getCharacter = async (membershipType, destinyMembershipId, characterId) => {
    const character = await this.apiCall(
      `/Platform/Destiny2/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/?components=CharacterProgressions,CharacterInventories,CharacterEquipment`,
    );
    this.setState({
      character,
    });
  }

  getMilestoneContent = async (hashID) => {
    const hash = await this.getFromManifest(hashID);
    const milestoneContent = await this.apiCall(
      `/Platform/Destiny2/Milestones/${hash}/Content/`,
    );
    this.setState({ milestoneContent });
  }

  getManifestData = async () => {
    const manifest = await this.apiCall(
      '/Platform/Destiny2/Manifest/',
    );
    this.setState({ manifest });
  }

  render() {
    const {
      charSearch,
      profileList,
      charList,
    } = this.state;
    return (
      <Container>
        <ProfileSearch
          charSearch={charSearch}
          profileList={profileList}
          charList={charList}
          searchProfiles={this.searchProfiles}
          getProfile={this.getProfile}
          handleInput={this.handleInput}
        />
        {charList.length > 0 && (
          <CharacterList
            characterList={charList}
            getCharacter={this.getCharacter}
          />
        )}

      </Container>
    );
  }
}
