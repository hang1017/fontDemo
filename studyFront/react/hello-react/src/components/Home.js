import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class Home extends Component {

  constructor(props){
    super(props);
    // this.age = this.props.age;
    this.state = {
      age : props.age,
      status:0,
      link:"father",
      initName:props.initName
    }

    setTimeout(() => {
      // console.log(this.state);
      this.setState({
        status:this.state.status+1
      })
    }, 2000);
  }

  onMakeOlder(){
    this.setState({
      age:this.state.age+3
    })
  }

  handleGreet(){
    this.props.greet(this.state.age)
  }

  hangleTranform(){
    this.props.tranform(this.state.link)
  }

  changeInput(event){
    this.setState({
      link:event.target.value
    })
  }

  render() {
    return (
      // <h1>hello world</h1>
      // console.log(this.state),
      <div className="container">
        <div className="row">
          <div className="col-xs-1 col-xs-offset-11">
            <h1>Home</h1>
          </div>
        </div>
        <div>
            <h4>hobby:</h4>
            <ul>
              {this.props.user.hobbies.map((hobby,i) => <li key={i}>{hobby}</li>)}
            </ul>
            <div>{this.props.children}</div>
        </div>
        <div>
          my age is:{this.state.age}
        </div>
        <div>
          <button onClick={this.onMakeOlder.bind(this)}>click me</button>
          {/* <button onClick={()=>this.onMakeOlder()}>click me</button> */}
        </div>
        <hr/>
        <div>
          <button onClick={this.handleGreet.bind(this)} >for father</button>
        </div>
        <hr/>
        <div>
          <button onClick={this.hangleTranform.bind(this)} >brother</button>

          <input type="text" value={this.state.link} onChange={(event) => this.changeInput(event)}/>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  name:PropTypes.string,
  age:PropTypes.number,
  user:PropTypes.object,
  greet:PropTypes.func,
  initName:PropTypes.string
}

