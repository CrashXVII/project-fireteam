import React, { Component } from 'react';
import styled from 'styled-components';
import Milestones from './Milestones';
import ProfileSearch from './ProfileSearch';

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
      milestones: {},
      milestoneHashes: [],
      milestoneContent: {},
    };
  }

  apiCall = async (urlFinish) => {
    try {
      const response = await fetch(
        `https://www.bungie.net${urlFinish}`,
        {
          method: 'GET',
          headers: {
            'X-API-Key': '5d7089e50cbe489d8e4da672a35a3bd1',
          },
        },
      );
      const json = await response.json();
      const results = await json.Response;
      return results;
    } catch (e) {
      throw new Error(e);
    }
  };

  getHistoricalStats = async () => {
    const historicalStats = await this.apiCall(
      '/Platform/Destiny2/1/Account/4611686018434143187/Stats/',
    );
    this.setState({
      historicalStats,
    });
  };

  getCharacterData = async () => {
    const charData = await this.apiCall(
      '/Platform/Destiny2/1/Profile/4611686018434143187/Character/2305843009271724646/?components=Characters,CharacterProgressions',
    );
    this.setState({
      charData,
    });
  };

  getMilestones = async () => {
    const milestones = await this.apiCall(
      '/Platform/Destiny2/Milestones/',
    );
    const milestoneHashes = await Object.keys(milestones);
    this.setState({ milestones, milestoneHashes });
  }

  getMilestoneContent = async () => {
    const milestoneContent = await this.apiCall(
      '/Platform/Destiny2/Milestones/1300394968/Content/',
    );
    this.setState({ milestoneContent });
  }

  handleInput = (e) => {
    this.setState({ charSearch: e.target.value });
  }

  render() {
    const { milestoneHashes } = this.state;
    return (
      <div>
        <ProfileSearch />
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
              clickHandler={this.getMilestoneContent}
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
