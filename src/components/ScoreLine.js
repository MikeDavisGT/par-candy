import React, { Component } from 'react';

export class ScoreLine extends Component {
  
  constructor(props) {
    super(props);

    this.state = { score: props.score };
    
    //this.scores = props.scores;
    this.handleChange = this.handleChange.bind(this);
  }

  handleFocus(event) {
    event.target.select();
  }

  handleChange(event) {
    var i = parseInt(event.target.getAttribute("data-index"));
    var sVal = event.target.value;
    var iVal = parseInt(sVal);
    var iNext = 0;
    console.log(i + " " + event.target.value);

    if (isNaN(iVal)) {
      event.target.focus();
    } else {
      var scoreCopy = { ...this.state.score }
      var aTemp = scoreCopy.scoring;
      if (iVal > 1) {
        for (var j = 0; j < sVal.length; j++) {
          console.log('j:' + j);
          if (i + j < aTemp.length) {
            var iVal = parseInt(sVal.substr(j, 1));
            console.log(iVal);
            aTemp[i + j] = iVal;
            iNext = i + j + 1;
          }
        }
      } else {
        aTemp[i] = iVal;
      }
      scoreCopy.scoring = aTemp;
      console.log(this.state.score.scoring);
      this.setState({ score: scoreCopy });
      console.log(this.state.score.scoring);
    }

    if (iNext > 0 && iNext < aTemp.length) {
      var ctlNext = this.refs['score_' + (iNext)]
      if (ctlNext != null) ctlNext.focus();
    }
    





    //if (!isNaN(iVal)) {
    //  var scoreCopy = { ...this.state.score }
    //  var aTemp = scoreCopy.scoring;
    //  aTemp[i] = parseInt(event.target.value);
    //  this.setState({ score: scoreCopy });
    //}

    //if (iNext < aTemp.length) {
    //  var ctlNext = this.refs['score_' + (iNext)]
    //  if (ctlNext != null) ctlNext.focus();
    //}

  }

  total() {
    var iReturn = 0;
    this.state.score.scoring.map(function (score) {
      iReturn += score;
    });
    return iReturn;
  }


  render() {
    return (
      <React.Fragment>
        <div className="tbl-row">
          <div className="tbl-cell">
            {this.state.score.golfer} 
          </div>
          {this.state.score.scoring.map( (n, i) => (
            <div className="tbl-cell">
              <input type="text" value={n} key={i} className="score-input" data-index={i} ref={'score_' + i}
                onFocus={this.handleFocus}
                onChange={this.handleChange} />
            </div>
          ))}
          <div className="tbl-cell">
            {this.total()}
          </div>
        </div>  
        </React.Fragment>
    );
  }



}
