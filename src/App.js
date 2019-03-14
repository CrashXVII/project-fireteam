
import React, { Component } from 'react';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charData: {},
      historicalStats: {},
      profile: {},
      manifest: {},
      url: 'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/1/CrashXVII/',
    };
  }

  getProfile = async () => {
    try {
      const { profile, url } = this.state;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Key':
            '5d7089e50cbe489d8e4da672a35a3bd1',
        },
      });
      const json = await response.json();
      const results = await json.Response;
      console.log(results);
      this.setState(
        { profile: results[0] },
        console.log(profile),
      );
    } catch (e) {
      throw new Error(e);
    }
  };

  getManifest = async () => {
    try {
      const { manifest } = this.state;
      const response = await fetch(
        'https://www.bungie.net/Platform/Destiny2/Manifest/',
        {
          method: 'GET',
          headers: {
            'X-API-Key':
              '5d7089e50cbe489d8e4da672a35a3bd1',
          },
        },
      );
      const json = await response.json();
      const results = await json.Response;
      console.log(results);
      this.setState(
        { manifest: results },
        console.log(manifest),
      );
    } catch (e) {
      throw new Error(e);
    }
  };

  getHistoricalStats = async () => {
    try {
      const response = await fetch(
        'https://www.bungie.net/Platform/Destiny2/1/Account/4611686018434143187/Stats/',
        {
          method: 'GET',
          headers: {
            'X-API-Key': '5d7089e50cbe489d8e4da672a35a3bd1',
          },
        },
      );
      const json = await response.json();
      const results = await json.Response;
      console.log(results);
      this.setState(
        { historicalStats: results },
      );
    } catch (e) {
      throw new Error(e);
    }
  };

  getCharacterData = async () => {
    try {
      const { charData } = this.state;
      const response = await fetch(
        'https://www.bungie.net/Platform/Destiny2/1/Profile/4611686018434143187/Character/2305843009271724646/?components=Characters,CharacterActivities',
        {
          method: 'GET',
          headers: {
            'X-API-Key': '5d7089e50cbe489d8e4da672a35a3bd1',
          },
        },
      );
      const json = await response.json();
      const results = await json.Response;
      console.log(results);
      this.setState({ charData: results },
        console.log(charData));
    } catch (e) {
      throw new Error(e);
    }
  }

  render() {
    const { profile } = this.state;
    return (
      <div>
        <h1>{profile.displayName}</h1>
        <button
          type="button"
          onClick={this.getProfile}
        >
          Get Profile
        </button>
        <div>
          <h1>Placeholder</h1>
          <button
            type="button"
            onClick={this.getManifest}
          >
            Manifest
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={this.getHistoricalStats}
          >
          Historical Stats
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={this.getCharacterData}
          >
          Get Char Data
          </button>
        </div>
      </div>
    );
  }
}
