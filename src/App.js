
import React, { Component } from 'react';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      url: 'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/All/CrashXVII/',
    };
  }

  async componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const { data, url } = this.state;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Key': '5d7089e50cbe489d8e4da672a35a3bd1',
        },
      });
      const json = await response.json();
      const results = await json.Response;
      console.log(results);
      this.setState({ data: results }, console.log(data));
    } catch (e) {
      throw new Error(e);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
