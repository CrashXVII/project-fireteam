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

const ProfileList = ({ profileList }) => (
  <Ul>
    {profileList.map(profile => (
      <Li key={`li${profile.membershipId}`}>
        <img src={`https://www.bungie.net${profile.iconPath}`} alt="platform logo" key={`img${profile.membershipId}`} />
        <span key={profile.membershipId}>{profile.displayName}</span>
      </Li>
    ))}
  </Ul>
);

ProfileList.defaultProps = {
  profileList: [],
};

ProfileList.propTypes = {
  profileList: PropTypes.arrayOf(PropTypes.object),
};

export default ProfileList;
