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

const Img = styled.img`
  background: black;
`;

const Milestone = ({ milestones }) => (
  <div>
    {milestones.displayProperties.hasIcon
    && <Img src={`https://www.bungie.net${milestones.displayProperties.icon}`} alt="Milestone Icon" />
    }
    <p>{milestones.displayProperties.name}</p>
    <p>{milestones.displayProperties.description}</p>
  </div>
);

export default class Character extends Component {
  static propTypes = {
    progressions: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
      ]),
    ).isRequired,
  }

  constructor(props) {
    super(props);
    const { progressions } = this.props;
    this.state = {
      progressions,
      hash: '',
    };
  }

  int32 = (x) => {
    let y = x;
    if (y > 0xFFFFFFFFF) {
      throw new Error('Hash too big');
    }
    if (y > 0x7FFFFFFF) {
      y = 0x100000000 - x;
      if (y < 2147483648) {
        y = -y;
      } else {
        y = -2147483648;
      }
    }
    return y;
  }

  getFromDB = async (e) => {
    e.preventDefault();
    try {
      const { hash } = this.state;
      const hashId = this.int32(hash);
      const response = await fetch(
        `http://localhost:3000/milestones/${hashId}`,
        {
          method: 'GET',
        },
      );
      const data = await response.json();
      const milestones = await JSON.parse(data.json);
      this.setState({
        milestones,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  handleInput = (e) => {
    this.setState({
      hash: e.target.value,
    });
  }

  render() {
    const { hash, milestones } = this.state;
    return (
      <div>
        <p>Milestone Testing</p>
        <form onSubmit={this.getFromDB}>
          <input
            type="search"
            name="milestone"
            value={hash}
            onChange={this.handleInput}
          />
          <Button type="submit">MILESTONE!</Button>
        </form>

        {milestones && (
          <Milestone milestones={milestones} />
        )}
      </div>
    );
  }
}
