import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  border-radius: 5px;
  background: rgb(70, 101, 184);
  color: white;
  width: 120px;
  height: 35px;
  :hover {
    border: solid 2px rgb(95, 207, 235);
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;


export default class ProfileSearch extends Component {
  static propTypes = {
    sendProfiles: PropTypes.func.isRequired,
    apiCall: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      charSearch: '',
    };
  }

  handleInput = (e) => {
    this.setState({ charSearch: e.target.value });
  }

  searchProfiles = async (e) => {
    e.preventDefault();
    const { charSearch } = this.state;
    const { sendProfiles, apiCall } = this.props;
    if (!charSearch) {
      return;
    }
    const profileList = await apiCall(`/Platform/Destiny2/SearchDestinyPlayer/all/${charSearch}/`);
    await sendProfiles(profileList);
  };

  render() {
    const { charSearch } = this.state;
    return (
      <Wrapper>
        <div>
          <form onSubmit={this.searchProfiles}>
            <label htmlFor="charSearch">
                Profile Name:
              <input
                name="charSearch"
                type="search"
                value={charSearch}
                onChange={this.handleInput}
              />
            </label>
            <Button type="submit">Get Profile</Button>
          </form>
        </div>
        <div />
      </Wrapper>
    );
  }
}
