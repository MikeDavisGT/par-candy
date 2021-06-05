import React, { Component } from 'react';

export class CheckBox extends Component {
  
  constructor(props) {
    super(props);
    //this.state = { label: props.label, checked: props.checked };
   
  }

  toggleChecked() {
    var bCurVal = ! this.checkBoolVal(this.props.checked);
    //this.setState({ checked: !bCurVal })
    this.props.onchange(bCurVal);
    console.log(bCurVal);
  }

  checkBoolVal(item) {
    var bReturn = false;
    if (item != null) {
      if (typeof (item) == "string") {
        
        bReturn = item.toLowerCase() == "true";
      } else {
        bReturn = !!item;
        console.log(bReturn);
      }

    }
    return bReturn;
  }

  
  render() {
    const bReadonly = this.checkBoolVal(this.props.readonly); 
    const bChecked = this.props.checked;
    
    switch (bReadonly) {
      case true:
        return <div className="vcenter">Paid</div>;
        break;
      case false:
        return (
          (bChecked != null) && //conditionally render only when state.checked is not null
          <div className="checkbox">
            <div className="chkborder" onClick={() => this.toggleChecked()}>
              <div className={this.checkBoolVal(bChecked) ? "indicator checked" : "indicator"} />
            </div>
          </div>
        );
        break;
      default:
        return null;
    }


    
    
  }
}
