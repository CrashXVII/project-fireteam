import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  padding: 0;
`;

const Li = styled.li`
  padding: 0 0 10px 10px;
  p {
    font-size: 20px;
    padding-left: 10px;
    
  }
`;

const Profile = ({ profile, getCharData }) => (
  <Li onClick={() => getCharData(profile.membershipType, profile.membershipId)}>
    <img src={`https://www.bungie.net${profile.iconPath}`} alt="platform logo" />
    <span>{profile.displayName}</span>
  </Li>
);

const ProfileList = ({ profileList, getCharData }) => (
  <Ul>
    {profileList.map(profile => (
      <Profile key={profile.membershipId} profile={profile} getCharData={getCharData} />
    ))}
  </Ul>
);

ProfileList.defaultProps = {
  profileList: [],
};

ProfileList.propTypes = {
  profileList: PropTypes.arrayOf(PropTypes.object),
  getCharData: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  profile: {},
};

Profile.propTypes = {
  getCharData: PropTypes.func.isRequired,
  profile: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
};


export default ProfileList;
