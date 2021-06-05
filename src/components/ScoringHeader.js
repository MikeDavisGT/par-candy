import React, { Component } from 'react';

export class ScoringHeader extends Component {
  
  constructor(props) {
    super(props);
    this.data = props.data;
  }

  render() {
    return (
      <React.Fragment>
        <div class="tbl-row blue-60" >
          <div class="tbl-cell">
            Hole
          </div>
          {this.data.Holes.map(item => (
            <div class="tbl-cell">
              {item.hole } 
            </div>
          ))}
          <div class="tbl-cell">
            TOT
           </div>
        </div>
        <div class="tbl-row brown-80" >
          <div class="tbl-cell">
            Par
          </div>
          {this.data.Holes.map(item => (
            <div class="tbl-cell">
              {item.par}
            </div>
          ))}
          <div class="tbl-cell"/>
        </div>
        </React.Fragment>
    );
  }



}
