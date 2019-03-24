import React, { Component } from 'react';
import styled from 'styled-components';
import ProfileList from './ProfileList';

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


export default class ProfileSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charSearch: '',
      profile: [],
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

  getProfile = async (e) => {
    e.preventDefault();
    const { charSearch } = this.state;
    const profile = await this.apiCall(`/Platform/Destiny2/SearchDestinyPlayer/all/${charSearch}/`);
    this.setState({
      profile,
    });
  };

  handleInput = (e) => {
    this.setState({ charSearch: e.target.value });
  }

  render() {
    const { charSearch, profile } = this.state;
    return (
      <div>
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
        {profile.length > 0 && <ProfileList profile={profile} />}
      </div>
    );
  }
}
