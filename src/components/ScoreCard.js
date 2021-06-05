import React, { Component } from 'react';
import { ScoreLine } from './ScoreLine';
import { ScoringHeader } from './ScoringHeader';

export class ScoreCard extends Component {

  constructor(props) {
    super(props);
    this.data = props.data;
  }

  render() {
    return (

      <React.Fragment>
        <ScoringHeader data={this.data} />

        
        {this.data.scores.map(item => (
          <ScoreLine score={ item }/>
        ))}
        

      </React.Fragment>  
    );
  }



}
