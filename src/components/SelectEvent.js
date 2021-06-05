import React, { Component } from 'react';
import { GlobalData } from './GlobalData';

export class SelectEvent extends Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isFetching: true,
      eventData: [] 
    };
  }


componentDidMount() {
    fetch(GlobalData.apiPrefix() + '/api/events')
      .then(response => response.json())
      .then(result => {
        this.props.onChange(this.getOpenEvent(result));
        this.setState({ eventData: result, isFetching: false })
      })
  }


  handleChange(e) {
    console.log(e.target.value); 
    //console.log(this.props);
    this.props.onChange(e.target.value);
  }

  getOpenEvent(eventsData) {
    var evReturn = "";
    for (var i = 0; i < eventsData.length; i++) {
      if (eventsData[i].IsOpen) {
        evReturn = eventsData[i].ID;
        break;
      }
    }
    return evReturn;
  }



  render() {
    return (
      <React.Fragment>

        {this.state.isFetching > 0 &&
          <div className="wait">Fetching Events Data...</div>
        }

        {!this.state.isFetching &&
          <select style={{ width: 200 }} onChange={this.handleChange}>
            {this.state.eventData.map(item => (
              <option value={item.ID} disabled={!item.IsActive} selected={item.IsOpen}>{item.Name}</option>
            ))}

          </select>
        }
        
      </React.Fragment>
    );
  }



}
