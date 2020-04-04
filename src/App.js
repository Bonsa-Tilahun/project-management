import React, { Component } from 'react';
import Header from './components/Header/Header.component'
import SignInUpPage from './pages/sign-in-sign-up/sign-in-sign-up';
import HomePage from './pages/home/home';
// import {Switch, Route} from 'react-router-dom'
import './App.css';

class App extends Component {
  constructor(){
    super()

    this.state={
      loggedIn: false,
      userName:'',
      projects: [],
      colabrationProj:[]
    }
    this.logUserIn = this.logUserIn.bind(this)
  }

  logUserIn(user){
    console.log(this.state)
    this.setState({
      loggedIn: !this.state.loggedIn,
      ...user
    })
    console.log(this.state)
  }

  render(){
    return (
      <div className="App">
        <Header userName={this.state.userName} loggedIn={this.state.loggedIn} logUserIn={this.logUserIn} />
        {this.state.loggedIn ? <HomePage project={this.state.projects} colabs={this.state.colabrationProj} id={this.state.id}/> : (
          <div className='sign-in'>
            <SignInUpPage logUserIn={this.logUserIn}/>
          </div>
        )}
      </div>
    );
  }
}

export default App;
