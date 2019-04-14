import React from 'react';
import PropTypes from 'prop-types';
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

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

const ProfileSearch = ({
  charSearch, profileList, getProfiles, handleInput, getCharData,
}) => (
  <Wrapper>
    <div>
      <form onSubmit={getProfiles}>
        <label htmlFor="search">
              Profile Name:
          <input
            id="search"
            type="text"
            value={charSearch}
            onChange={handleInput}
          />
        </label>
        <Button type="submit">Get Profile</Button>
      </form>
      {profileList.length > 0 && (
      <ProfileList profileList={profileList} getCharData={getCharData} />
      )}
    </div>
    <div />
  </Wrapper>
);

ProfileSearch.propTypes = {
  charSearch: PropTypes.string.isRequired,
  profileList: PropTypes.arrayOf(PropTypes.object),
  getProfiles: PropTypes.func.isRequired,
  getCharData: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
};

ProfileSearch.defaultProps = {
  profileList: [],
};

export default ProfileSearch;
