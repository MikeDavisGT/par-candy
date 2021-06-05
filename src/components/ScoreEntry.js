import React, { Component } from 'react';
import { ScoreCard } from './ScoreCard';

import { scoreData } from './scoreData';

export class ScoreEntry extends Component {
    static displayName = ScoreEntry.name;

  constructor(props) {
    super(props);
  }

  

  render() {
    var imgURI = 'http://localhost/GTS/golfimage?id=' + scoreData.scoreCardImageId;
    return (
      
      <div>    
        <div className="float-left"  >
          <img src={imgURI} width="400" />
        </div>  
        <div className="float-left-fill">
          <div id="tbl">
            <div id="tbl-body">
              <ScoreCard data={scoreData} />
            </div>
          </div>
        </div>
      </div>        
         

      
    );
  }



}
