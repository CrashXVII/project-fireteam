import React from 'react';
import PropTypes from 'prop-types';

const Profiles = (props) => {
  const { profile } = props;
  return (
    <div>
      {profile.map(profiles => (
        <h1 key={profiles.membershipId}>{profiles.displayName}</h1>
      ))}
    </div>
  );
};

Profiles.defaultProps = {
  profile: [],
};

Profiles.propTypes = {
  profile: PropTypes.arrayOf(PropTypes.object),
};

export default Profiles;
