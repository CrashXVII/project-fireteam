import React, { Component } from 'react';
import styled from 'styled-components';
import ProfileSearch from './ProfileSearch';
import MilestoneList from './MilestoneList';

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
      charSearch: '',
      profileList: [],
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

  getProfile = async (e) => {
    e.preventDefault();
    const { charSearch } = this.state;
    const profileList = await this.apiCall(`/Platform/Destiny2/SearchDestinyPlayer/all/${charSearch}/`);
    this.setState({
      profileList,
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
    const hash = await this.getSQLiteHash(4253138191);
    const milestoneContent = await this.apiCall(
      `/Platform/Destiny2/Milestones/${hash}/Content/`,
    );
    this.setState({ milestoneContent });
  }

  getManifest = async () => {
    const manifest = await this.apiCall(
      '/Platform/Destiny2/Manifest/',
    );
    this.setState({ manifest });
  }

  getXur = async () => {
    const xur = await this.apiCall(
      '/Platform/Destiny2/Vendors/?components=402',
    );
    this.setState({ xur });
  }

  getFromManifest = (hashID) => {
    const hash = this.int32(hashID);
    console.log(hash);
    return hash;
  }

  int32 = (x) => {
    let y = x;
    if (y > 0xFFFFFFFFF) {
      console.log('Error too big');
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


  render() {
    const {
      charSearch,
      profileList,
    } = this.state;
    return (
      <div>
        <ProfileSearch
          charSearch={charSearch}
          profileList={profileList}
          getProfile={this.getProfile}
          handleInput={this.handleInput}
        />
        <div>
          <Button type="button" onClick={this.getCharacterData}>
            Get Char Data
          </Button>
          <Button type="button" onClick={this.getMilestoneContent}>
            Get Milestone Content
          </Button>
          <Button type="button" onClick={this.getManifest}>
            Manifest stuff
          </Button>
          <Button
            type="button"
            onClick={() => this.getFromManifest(4253138191)}
          >
            HASH!?
          </Button>
        </div>
      </div>
    );
  }
}
