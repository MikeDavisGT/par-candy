import React, { Component, useEffect, useState } from 'react';
import { CheckBox } from './CheckBox';
//import { scoreData } from './scoreData';
import { DataModel } from './DataModel';
import { SelectEvent } from './SelectEvent';
import { GlobalData } from './GlobalData';


export class SignInView extends Component {
  //static displayName = ScoreEntry.name;

  constructor(props) {
    super(props);
    this.handleEventChange = this.handleEventChange.bind(this);

    this.state = {
      isFetching: true, updatect: 0, sign_in_data: { Roster: [] } };

  }

  componentDidMount() {
    //fetch('/api/sign-in/905FF2A5-8341-42FB-AA43-C90A709E77E7')
    //  .then(response => response.json())
    //  .then(result => {
    //    this.setState({ sign_in_data: result, isFetching: false })
    //  })
  }

  componentWillUnmount() {
    console.log("signin unmount");
    this.postUpdate(); 
  }

  async postUpdate() {
    if (this.state.sign_in_data.Roster.length > 0) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.sign_in_data)
      };
      const response = await fetch(GlobalData.apiPrefix() +'/api/sign-in/', requestOptions);
      const data = await response.json();
    }
  }

  handleItemChange(rosterItemID, key1, key2, value) {
    //this.setState(targetItem, value);
    var signinCopy = { ...this.state.sign_in_data }

    signinCopy.Roster.forEach(item => {
      if (item.ID == rosterItemID) {
        item[key1][key2].value = value;  
        item.changed = true;
      }
     });
    this.setState({ sign_in_data: signinCopy });

    console.log("stateChange : " + rosterItemID + " " + value);
  } 


  handleEventChange(eventID) {
    this.postUpdate();
    if (eventID) {
      console.log("event change: " + eventID);
      fetch( GlobalData.apiPrefix() + '/api/sign-in/' + eventID)
        .then(response => response.json())
        .then(result => {
          this.setState({ sign_in_data: result, isFetching: false })
        })
    }
  }
  


  render() {
    return (
      
      <React.Fragment>  

        <SelectEvent onChange={ this.handleEventChange }/>

        {this.state.isFetching  > 0 &&
          <p>
          <img src="wait.gif" height="30"/>Fetching Sign-in Data...
          </p>
        }
        
        
        <div id="tbl" className="scrollable">
            <div id="tbl-caption">{this.state.sign_in_data.Season && this.state.sign_in_data.Season.Name}</div>
            <div id="tbl-caption2">{this.state.sign_in_data.Event && this.state.sign_in_data.Event.Name}</div>
            <div id="tbl-header">
              <div class="tbl-header-cell">
              Player
              </div>
              <div class="tbl-header-cell">
                Checked In    
              </div>
              <div class="tbl-header-cell">
                League Dues 
              </div>
              <div class="tbl-header-cell">
                Match Play 
              </div>
              <div class="tbl-header-cell">
                Skins
              </div>
              <div class="tbl-header-cell">
                Confirm Email
              </div>
            </div>
            <div id="tbl-body">
              {this.state.sign_in_data.Roster.map(item => (
                <div class="tbl-row">
                  <div class="tbl-cell">{item.GolferName}</div>
                  <div class="tbl-cell">
                    <CheckBox checked={item.EventMetadata && item.EventMetadata.checked_in.value}
                      onchange={(b) => { this.handleItemChange(item.ID, "EventMetadata", "checked_in", b) }} />
                  </div>
                  <div class="tbl-cell">
                    <CheckBox checked={item.SeasonMetadata && item.SeasonMetadata.league_dues_paid.value}
                      readonly={item.SeasonMetadata && item.SeasonMetadata.league_dues_paid.readonly}
                      onchange={(b) => { this.handleItemChange(item.ID, "SeasonMetadata", "league_dues_paid", b) }} />
                  </div>
                  <div class="tbl-cell">
                    <CheckBox checked={item.SeasonMetadata && item.SeasonMetadata.match_play.value}
                      readonly={item.SeasonMetadata && item.SeasonMetadata.match_play.readonly}
                      onchange={(b) => { this.handleItemChange(item.ID, "SeasonMetadata", "match_play", b) }} />
                  </div>
                  <div class="tbl-cell">
                    <CheckBox checked={item.EventMetadata && item.EventMetadata.skins_paid.value}
                      onchange={(b) => { this.handleItemChange(item.ID, "EventMetadata", "skins_paid", b) }} />
                  </div>
                
                  <div class="tbl-cell">{item.GolferEmailMasked}</div>
                </div>
              ))}
            </div>
          </div>
          
        
        <div className="bottom-menu">
            <div> toolbar here....</div>
          </div>
        
        
      </React.Fragment>
      


    );
  }

  //<div class="tbl-cell"><CheckBox checked={item.SeasonMetadata && item.SeasonMetadata.match_play}/></div>
                //<div class="tbl-cell"><CheckBox checked={item.EventMetadata && item.EventMetadata.skins_paid} /></div>

}
