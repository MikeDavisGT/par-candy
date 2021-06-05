import React, { Component } from 'react';

export class Match extends Component {
  
  constructor(props) {
    super(props);


    this.state = {
      isFetching: false,
      matchData: props.match,
      holeInfo: props.holeInfo
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ matchData: nextProps.match, holeInfo: nextProps.holeInfo });
  }


  matchSummary(i) {
    var sReturn = "";
    if (this.state.matchData) {
      if (i == 1 && this.state.matchData.match_score >= 0) {
        sReturn = this.state.matchData.short_summary;
      } else if (i == -1 && this.state.matchData.match_score < 0) {
        sReturn = this.state.matchData.short_summary;
      }
    }
    return sReturn;
  }  

  player(iPlayer) {
    var player = this.state.matchData.player_b;
    if (iPlayer == 0) {
      player = this.state.matchData.player_a;
    }
    return player;
  }  

  holeClass(h, iPlayer) {
    var sReturn = "";
    var iHoleDetail = this.state.matchData.match_detail[h];
    if (iHoleDetail == 7) {
      sReturn = "match_complete";
    }
    else if (iPlayer == 1 && iHoleDetail == 1) {
      sReturn = "match_win_a";
    }
    else if (iPlayer == -1 && iHoleDetail == -1) {
      sReturn = "match_win_b";
    }
    return sReturn;
  }  

  matchSummaryClass(i) {
    var sReturn = "";
    if (this.state.matchData) {
      if (i == 1 && this.state.matchData.match_score > 0) {
        sReturn = "match_win_a";
      } else if (i == -1 && this.state.matchData.match_score < 0) {
        sReturn = "match_win_b";
      }
    }
    return sReturn;
  }  



  render() {
    return (
      <React.Fragment>

        <div>{this.state.matchData.match_summary}</div>


        <div id="tbl-match" className="matchplay">
          <div id="tbl-match-header">
            <div className="tbl-match-header-cell match_player">Player</div>
            {this.state.holeInfo.map((hole, i) => (
              <div className="tbl-header-cell matchplay centered">{hole}</div>
            ))}
            <div className="tbl-header-cell matchplay centered match_summary">Final</div>
          </div>


          <div id="tbl-body">
            <div className="tbl-match-row">
              <div className="tbl-cell match_player">{this.state.matchData.player_a.name}</div>
              {this.state.matchData.player_a.score.map((n, i) => (
                <div className={"tbl-cell centered " + this.holeClass(i, 1) }>{n}</div>
              ))}
              <div className={"tbl-cell match_summary " + this.matchSummaryClass(1)}>{this.matchSummary(1)}</div>
            </div>
            <div className="tbl-match-row">
              <div className="tbl-cell match_player">{this.state.matchData.player_b.name}</div>
              {this.state.matchData.player_b.score.map((n, i) => (
                <div className={"tbl-cell centered " + this.holeClass(i, -1)}>{n}</div>
              ))}
              <div className={"tbl-cell match_summary " + this.matchSummaryClass(-1)}>{this.matchSummary(-1)}</div>
            </div>
          </div>
        </div>
        

        
      </React.Fragment>
    );
  }



}
