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

const ProfileList = (props) => {
  const { profile } = props;
  return (
    <Ul>
      {profile.map(profiles => (
        <Li key={`li${profiles.membershipId}`}>
          <img src={`https://www.bungie.net${profiles.iconPath}`} alt="platform logo" key={`img${profiles.membershipId}`} />
          <span key={profiles.membershipId}>{profiles.displayName}</span>
        </Li>
      ))}
    </Ul>
  );
};

ProfileList.defaultProps = {
  profile: [],
};

ProfileList.propTypes = {
  profile: PropTypes.arrayOf(PropTypes.object),
};

export default ProfileList;
