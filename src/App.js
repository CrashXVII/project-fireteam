import React, { Component } from 'react';
import styled from 'styled-components';
import Profiles from './Profiles';
import Milestones from './Milestones';

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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charData: {},
      historicalStats: {},
      profile: {},
      charSearch: '',
      baseUrl: 'https://www.bungie.net/Platform/Destiny2',
      milestones: {},
      milestoneHashes: [],
      milestoneContent: {},
    };
  }

  apiCall = async (urlFinish) => {
    try {
      const { baseUrl } = this.state;
      const response = await fetch(`${baseUrl}${urlFinish}`, {
        method: 'GET',
        headers: {
          'X-API-Key': '5d7089e50cbe489d8e4da672a35a3bd1',
        },
      });
      const json = await response.json();
      const results = await json.Response;
      return results;
    } catch (e) {
      throw new Error(e);
    }
  };

  getProfile = async (e) => {
    e.preventDefault();
    const { charSearch } = this.state;
    const profile = await this.apiCall(`/SearchDestinyPlayer/all/${charSearch}/`);
    this.setState({
      profile,
    });
  };

  getHistoricalStats = async () => {
    const historicalStats = await this.apiCall(
      '/1/Account/4611686018434143187/Stats/',
    );
    this.setState({
      historicalStats,
    });
  };

  getCharacterData = async () => {
    const charData = await this.apiCall(
      '/1/Profile/4611686018434143187/Character/2305843009271724646/?components=Characters,CharacterProgressions',
    );
    this.setState({
      charData,
    });
  };

  getMilestones = async () => {
    const milestones = await this.apiCall(
      '/Milestones/',
    );
    const milestoneHashes = await Object.keys(milestones);
    this.setState({ milestones, milestoneHashes });
  }

  getMilestoneContent = async (milestoneHash) => {
    const milestoneContent = await this.apiCall(
      `/Milestones/${milestoneHash}/Content/`,
    );
    this.setState({ milestoneContent });
  }

  handleInput = (e) => {
    this.setState({ charSearch: e.target.value });
  }

  render() {
    const {
      charSearch, profile, milestoneHashes,
    } = this.state;
    return (
      <div>
        {profile.length > 0 && <Profiles profile={profile} />}
        <form onSubmit={this.getProfile}>
          <label htmlFor="search">
            Profile Name:
            <input
              id="search"
              type="text"
              value={charSearch}
              onChange={this.handleInput}
            />
          </label>
          <Button type="submit">Get Profile</Button>
        </form>
        <div>
          <Button type="button" onClick={this.getHistoricalStats}>
            Historical Stats
          </Button>
        </div>
        <div>
          {milestoneHashes.length > 0
          && milestoneHashes.map(hash => (
            <Milestones
              key={hash}
              hash={hash}
              clickHandler={() => this.getMilestoneContent(hash)}
            />
          ))
          }
          <Button type="button" onClick={this.getMilestones}>
            Get Milestones
          </Button>
        </div>
        <div>
          <Button type="button" onClick={this.getCharacterData}>
            Get Char Data
          </Button>
        </div>
      </div>
    );
  }
}
