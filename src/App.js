import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charData: {},
      historicalStats: {},
      profile: {},
      charSearch: '',
      url:
        'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/1/CrashXVII/',
      baseUrl: 'https://www.bungie.net/Platform/Destiny2/',
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

  getProfile = async () => {
    const { charSearch } = this.state;
    const profile = await this.apiCall(`SearchDestinyPlayer/1/${charSearch}/`);
    this.setState({
      profile,
    });
  };

  getHistoricalStats = async () => {
    const historicalStats = await this.apiCall(
      '1/Account/4611686018434143187/Stats/',
    );
    this.setState({
      historicalStats,
    });
  };

  getCharacterData = async () => {
    const charData = await this.apiCall(
      '1/Profile/4611686018434143187/Character/2305843009271724646/?components=Characters,CharacterActivities',
    );
    this.setState({
      charData,
    });
  };

  handleInput = (e) => {
    this.setState({ charSearch: e.target.value });
  }

  render() {
    const { charSearch } = this.state;
    return (
      <div>
        <label htmlFor="search">Profile Name:</label>
        <input id="search" type="text" value={charSearch} onChange={this.handleInput} />
        <button type="button" onClick={this.getProfile}>
          Get Profile
        </button>
        <div>
          <button type="button" onClick={this.getHistoricalStats}>
            Historical Stats
          </button>
        </div>
        <div>
          <button type="button" onClick={this.getCharacterData}>
            Get Char Data
          </button>
        </div>
      </div>
    );
  }
}
