import React, { Component } from 'react';
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
export default class HashConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',

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

  handleInput = (e) => {
    this.setState({ input: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { input } = this.state;
    const hash = this.int32(input);
    this.setState({
      hash,
    });
  }


  render() {
    const { input, hash } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search">
            Hash Search:
            <input
              id="search"
              type="text"
              value={input}
              onChange={this.handleInput}
            />
          </label>
          <Button type="submit">Get Hash</Button>
        </form>
        <p>{hash}</p>
      </div>
    );
  }
}
