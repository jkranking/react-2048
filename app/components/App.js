import React, {Component} from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import HighScores from './HighScores'

export default class App extends Component {
  render() {
    return (

    	<BrowserRouter>
	    	<div className='container'>
	    	  <Nav />

	    	  <Switch>
	    	    <Route exact path='/' component={Home} />
	    	    <Route exact path='/highscores' component={HighScores} />
	    	  </Switch>
	    	</div>
    	</BrowserRouter>
    )
  }
}
