import React, { Component } from 'react';

export default class Header extends Component {

constructor(props){
  super(props);
  
}

showTranform(){
  alert(this.props.link);
  // this.setState({
  //   link:this.props.link
  // })
}

  render() {
    return (
      // <h1>hello world</h1>
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <h1>Header</h1>
            <h4>{this.props.link}</h4>
            <button onClick={this.showTranform.bind(this)}>test</button>
          </div>
        </div>
      </div>
    );
  }
}

