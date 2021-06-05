import React, { Component, useEffect, useState } from 'react';
import { GlobalData } from './GlobalData';

//https://vijayamalla.azurewebsites.net/how-to-assign-custom-url-to-azure-website-on-app-service/

export class SeasonSummary extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isFetching: false
    };
  }

  componentDidMount() {
    fetch(GlobalData.apiPrefix() + '/api/season_data/B8E59101-375A-4ED3-9812-92CC9E4F7CD2')
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({ data: result, isFetching: false })
      })
    
  }

 
 
  render() {
    return(
      
      <React.Fragment>  

        {this.state.isFetching  > 0 &&
          <p>
          <img src="wait.gif" height="30"/>Fetching Results...
          </p>
        }
                
        {this.state.data != null &&
          <div>
          <div id="tbl" className="scrollable">
            <div id="tbl-caption">2021 Tomahawk Men's League</div>
            <div id="tbl-caption2">Season Summary</div>
            <div id="tbl-header">
              <div className="tbl-header-cell centered">
                Player
            </div>

              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(wk => (
                <div className="tbl-header-cell centered">Week {wk}</div>
              ))}

              <div className="tbl-header-cell centered">
                Total Points
            </div>
              <div className="tbl-header-cell centered">
                Payout
            </div>
            </div>

            <div id="tbl-body">
              {this.state.data.results.stableford_results.map(item => (
                <div className="tbl-row">
                  <div className="tbl-cell">{item.player}</div>
                  {item.weekly_scores.map(score => (
                    <div className="tbl-cell centered">{score==0 ? "": score}</div>
                  ))}
                  <div className="tbl-cell centered">{item.points}</div>
                  <div className="tbl-cell centered"></div>
                </div>
              ))}
            </div>
          </div>

          <div id="tbl" className="scrollable skins">
            <div id="tbl-caption2">Skins Leaderboard</div>
            <div id="tbl-header">
              <div className="tbl-header-cell centered">Player</div>
              <div className="tbl-header-cell centered">Total Skins Earnings</div>
            </div>

            <div id="tbl-body">
              {
                this.state.data.results.skins.map(item => {
                  return (
                    <div className="tbl-row">
                      <div className="tbl-cell ">{item.player}</div>
                      <div className="tbl-cell centered">{'$' + Number(item.total).toFixed(2)}</div>
                    </div>
                  )
                }
                )}
            </div>

          </div> 


          <div id="tbl" className="scrollable skins">
            <div id="tbl-caption2">Match Play Leaderboard</div>
            <div id="tbl-header">
              <div className="tbl-header-cell centered">Player</div>
              <div className="tbl-header-cell centered">Total Match Points</div>
            </div>

            <div id="tbl-body">
              {
                this.state.data.results.match_play.map(item => {
                  return (
                    <div className="tbl-row">
                      <div className="tbl-cell ">{item.player}</div>
                      <div className="tbl-cell centered">{item.total}</div>
                    </div>
                  )
                }
                )}
            </div>

          </div> 


          </div>
        }




       
      </React.Fragment>


    );
  }

}
