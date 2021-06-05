import React, { Component, useEffect, useState } from 'react';
import { SelectEvent } from './SelectEvent';
import { GlobalData } from './GlobalData';


//https://vijayamalla.azurewebsites.net/how-to-assign-custom-url-to-azure-website-on-app-service/

export class ResultsView extends Component {
  
  constructor(props) {
    super(props);

    this.handleEventChange = this.handleEventChange.bind(this);

    this.state = {
      data: null,
      isFetching: false
    };


  }

  
  handleEventChange(eventID) {
    console.log("event change: " + eventID);
    fetch(GlobalData.apiPrefix() + '/api/event_data/' + eventID)
      .then(response => response.json())
      .then(result => {
        this.setState({ data: result, isFetching: false })
      })
  }

  stabData() {
    var objReturn = [];
    if (this.state.data != null) {
      if (this.state.data.results.stableford_results != null) {
        objReturn = this.state.data.results.stableford_results;
      }
    }
    return objReturn;
  }

  skinsData() {
    var objReturn = [];
    if (this.state.data != null) {
      if (this.state.data.results.skins.payouts != null) {
        objReturn = this.state.data.results.skins.payouts;
      }
    }
    return objReturn;
  }

  eventSummary() {
    var sReturn = "unknown event";
    if (this.state.data != null) {
      if (this.state.data.event.Name != null) {
        sReturn = this.state.data.event.Name;
      }
    }
    return sReturn;
  }

  holeSummary() {
    var aReturn = [];
    if (this.state.data != null) {
      if (this.state.data.event.StartHole != null) {
        for (var i = 0; i < 9; i++)
          aReturn[i] = this.state.data.event.StartHole + i;
      }
    }
    return aReturn;
  }
 

  render() {
    return(
      
      <React.Fragment>  

        <SelectEvent onChange={this.handleEventChange} />

        {this.state.isFetching  > 0 &&
          <p>
          <img src="wait.gif" height="30"/>Fetching Results...
          </p>
        }
      
        <div id="tbl" className="scrollable">
          <div id="tbl-caption">2021 Tomahawk Men's League</div>
          <div id="tbl-caption2">{this.eventSummary()}</div>
          <div id="tbl-header">
            <div className="tbl-header-cell centered">
              Player
            </div>

            {this.holeSummary().map((hole, i) => (
              <div className="tbl-header-cell centered">{hole}</div>
            ))}


            <div className="tbl-header-cell centered">
              Gross
            </div>
            <div className="tbl-header-cell centered">
              Hcp
            </div>
            <div className="tbl-header-cell centered">
              Net
            </div>
            <div className="tbl-header-cell centered">
              Points
            </div>
            <div className="tbl-header-cell centered">
              Payout
            </div>
          </div>

          <div id="tbl-body">
            {this.stabData().map(item => (
              <div className="tbl-row">
                <div className="tbl-cell centered">{item.player}</div>
                {item.gross_scores.map((s, i) => (
                  <div className={'tbl-cell centered strokes' + item.strokes[i]}>{s}</div>
                ))}
               

                <div className="tbl-cell centered">{item.total_gross}</div>
                <div className="tbl-cell centered">{item.total_strokes}</div>
                <div className="tbl-cell centered">{item.total_net}</div>
                <div className="tbl-cell centered">{item.points}</div>
                <div className="tbl-cell centered">{item['make-up'] ? '**make-up' : isNaN(Number(item.payout)) ? '': '$' + Number(item.payout).toFixed(2) }</div>
              </div>
            ))}
          </div>
        </div>

        <div id="tbl" className="scrollable skins">
          <div id="tbl-caption2">Net Skins</div>
          <div id="tbl-header">
            <div className="tbl-header-cell centered">Player</div>
            <div className="tbl-header-cell centered">Hole</div>
            <div className="tbl-header-cell centered">Net Score</div>
            <div className="tbl-header-cell centered">Payout</div>
          </div>

          <div id="tbl-body">
            {
              this.skinsData().map(item => {
                return (

                  item.details.map((d, i) => {
                    return (

                      <div className="tbl-row">
                        <div className="tbl-cell centered">{i==0 ? item.golfer: ''}</div>
                        <div className="tbl-cell centered">{d.hole}</div>
                        <div className={'tbl-cell centered strokes' + d.strokes}>{d.net_score}</div>
                        <div className="tbl-cell centered">{ i== 0 ? '$' + Number(item.amount).toFixed(2) : ''}</div>
                      </div>
                    )}
                  )
                )
              }
            )}
          </div>
        </div>  





       
      </React.Fragment>


    );
  }

}
