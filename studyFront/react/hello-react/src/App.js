import React, { Component } from 'react';

import Header from './components/Header';
import Home from './components/Home';


class App extends Component {
  constructor(){
    super();
    this.state = {
      age:0,
      link:"aaa"
    }
  }

  onGreet(age){
    console.log(age);
  }

  onTranform(linkName){
    console.log(linkName);
    this.setState({
      link:linkName
    })
  }

  render() {
    const user_hang = {
      name:"hang",
      hobbies:["music","sports"],
    }

    return (
      // <h1>hello world</h1>
      <div className="container">
        <div className="row">
          {/* <div className="col-xs-1 col-xs-offset-11"> */}
            <Header link={this.state.link} />
          {/* </div> */}
        </div>
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <h1>hello world</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <Home name={"max"} age={17} user={user_hang} greet={this.onGreet}
              tranform={this.onTranform.bind(this)} initName={this.state.link}
            >
              <p>I am children</p>
            </Home>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
