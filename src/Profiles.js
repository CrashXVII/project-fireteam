import React from 'react';
import PropTypes from 'prop-types';

const Profiles = (props) => {
  const { profile } = props;
  return (
    <ul>
      {profile.map(profiles => (
        <li key={`li${profiles.membershipId}`}>
          <img src={`https://www.bungie.net${profiles.iconPath}`} alt="platform logo" key={`img${profiles.membershipId}`} />
          <h1 key={profiles.membershipId}>{profiles.displayName}</h1>
        </li>
      ))}
    </ul>
  );
};

Profiles.defaultProps = {
  profile: [],
};

Profiles.propTypes = {
  profile: PropTypes.arrayOf(PropTypes.object),
};

export default Profiles;
