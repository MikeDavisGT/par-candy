import React, { Component, useEffect, useState } from 'react';
import { SelectEvent } from './SelectEvent';
import { Match } from './Match';
import { GlobalData } from './GlobalData';

//https://vijayamalla.azurewebsites.net/how-to-assign-custom-url-to-azure-website-on-app-service/

export class MatchPlay extends Component {
  
  constructor(props) {
    super(props);

    console.log("construct match play");
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

  matchPoints() {
    var objReturn = [];
    if (this.state.data != null) {
      if (this.state.data.results.match_play.points_summary != null) {
        objReturn = this.state.data.results.match_play.points_summary;
      }
    }
    return objReturn;
  }

  matches() {
    var objReturn = [];
    if (this.state.data != null) {
      if (this.state.data.results.match_play.matches != null) {
        objReturn = this.state.data.results.match_play.matches;
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

        {this.state.isFetching > 0 &&
          <p>
          <img src="wait.gif" height="30"/>Fetching Results...
          </p>
        }
     
        <div id="tbl" className="scrollable skins">
          <div id="tbl-caption2">{this.eventSummary()}</div>
          <div id="tbl-header">
            <div className="tbl-header-cell">Player</div>
            <div className="tbl-header-cell centered">Points Won</div>
          </div>

          <div id="tbl-body">
            {
              this.matchPoints().map(item => {
                return (

                  <div className="tbl-row">
                    <div className="tbl-cell">{item.player}</div>
                    <div className="tbl-cell centered">{item.points_won}</div>
                  </div>
                )
              })
            }
          </div>
        </div>  

        <div id="tbl" className="scrollable">
          <div id="tbl-header">
            <div className="tbl-header-cell">Matches</div>
          </div>

          <div id="tbl-body">
            {
              this.matches().map(item => {
                return (
                  <div className="tbl-row">
                    <div className="tbl-cell"><Match match={item} holeInfo={this.holeSummary()}  /></div>
                  </div>
                )
              })
            }
          </div>
        </div>  




       
      </React.Fragment>


    );
  }

}
