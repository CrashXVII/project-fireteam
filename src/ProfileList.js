import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  padding: 0;

`;

const Li = styled.li`
  display: flex;
  padding: 0 0 10px 10px;
  span {
    font-size: 20px;
    padding-left: 10px;
    
  }
`;

const Profile = ({ profile }) => (
  <Li>
    <img src={`https://www.bungie.net${profile.iconPath}`} alt="platform logo" />
    <span>{profile.displayName}</span>
  </Li>
);

const ProfileList = ({ profileList }) => (
  <Ul>
    {profileList.map(profile => (
      <Profile key={profile.membershipId} profile={profile} />
    ))}
  </Ul>
);

ProfileList.defaultProps = {
  profileList: [],
};

ProfileList.propTypes = {
  profileList: PropTypes.arrayOf(PropTypes.object),
};

Profile.defaultProps = {
  profile: {},
};

Profile.propTypes = {
  profile: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};


export default ProfileList;
