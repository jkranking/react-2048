import React, { Component } from 'react'
// import { Redirect} from 'react-router-dom';

export default class GameOver extends Component {
  constructor(props) {
    super(props)

    this.state = {
    	redirect: false
  	}

    // this.handleClick = this.handleClick.bind(this);
  }

//  handleClick(){
//   	this.setState({ redirect: true })
//   }

  render(){

		return(
	 		<div>
		   	<h1 className="game-over"> Game Over </h1>
		   	<div className="submit-score">
			   	<h3> Submit Your High Score: {this.props.highScore} </h3>
		      <form className = "column" onSubmit={ this.props.submitHighScore }>
		        <input
		          type='text'
		          placeholder='Name'
		          value={ this.props.player }
		          onChange= { this.props.playerChange } 
		        />
		        <button
		        	onClick={this.handleClick}
		          type='submit'>
		        	Submit
		        </button>
		      </form>
	      </div>
	    </div>
		)
	}
}