import React, { Component } from 'react';
import RenderScoreEntry from './RenderScoreEntry';


class ScoreEntryContainer extends Component {
  state = { loading: true };

  render() {
    const { loading, user } = this.state;
    return loading ? <Loading /> : <RenderScoreEntry user={user} />;
  }

  componentDidMount() {
    fetchData(this.props.id)
      .then(user => { this.setState({ loading: false, user }) })
  }


  fetchData() {

  }

}