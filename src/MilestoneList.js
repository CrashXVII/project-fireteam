import React, { Component } from 'react';

export default class MilestoneList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milestones: {},
      milestoneHashes: [],
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

  getMilestoneContent = async () => {
    const milestoneContent = await this.apiCall(
      '/Platform/Destiny2/Milestones/1300394968/Content/',
    );
    this.setState({ milestoneContent });
  }

  render() {
    return (
      <div />
    );
  }
}
