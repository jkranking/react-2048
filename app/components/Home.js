import React, {Component} from 'react'
import Board from './Board'
import BaseBoard from './Board'
import GameLogic from '../utils/GameLogic'
import GameOver from './GameOver'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default class Home extends Component {
	constructor() {
	  super();

	  this.state = {
	    board: null,
  		gameOver: false,
  		player: '',
  		highScore: 8,
  		redirect: false
	  }
	  
	  this._handleKeyDown = this._handleKeyDown.bind(this)
	  this._handleHighScoreSubmit = this._handleHighScoreSubmit.bind(this)
	  this._handlePlayerChange = this._handlePlayerChange.bind(this)
	  this._handleNewGame = this._handleNewGame.bind(this)
	}

	componentWillMount(){
	  document.addEventListener("keydown", this._handleKeyDown)
	  if(!this.state.board){
	  	let board = GameLogic.startGame()
	  	this.setState(function(){
		    return {
	        board: board
	      }
    	})
	  }
	}

	_handleHighScoreSubmit(e) {
		e.preventDefault()
		let player = this.state.player.trim()
    
    axios.post('http://localhost:3001/api/highscores', {player: player, score: this.state.highScore})
      .catch(err => {
        console.error(err)
      })

    this.setState({ redirect: true })
  }

  _handlePlayerChange(e) {
    this.setState({ player: e.target.value })
  }

	_handleKeyDown(event){
		let updatedBoard = this.state.board
		if(event.key === 'ArrowDown') {
			updatedBoard = GameLogic.moveDown(this.state.board)
		} else if (event.key === 'ArrowRight') {
			updatedBoard = GameLogic.moveRight(this.state.board)
		} else if (event.key === 'ArrowLeft') {
			updatedBoard = GameLogic.moveLeft(this.state.board)
    }
    this.setState(function(){
	    return {
        board: updatedBoard,
      }
    })

    if(!GameLogic.areZeroCells(this.state.board)){
			if(!GameLogic.canMoveLeftRight(this.state.board) && !GameLogic.canMoveDown(this.state.board)) {
				const highScore = GameLogic.findHighScore(this.state.board)
				this.setState(function(){
	    		return {
        		gameOver: true,
        		highScore: highScore
		      }
		    })
			}
		}
	}

	_handleNewGame(){
		let board = GameLogic.startGame()
		this.setState(function(){
			return {
		    board: board,
	  		gameOver: false,
	  		player: ''
		  }
		})
	}

	render(){

		if (this.state.redirect) {
      return <Redirect to='/highscores'/>
    }
		return(
      <div onKeyDown={this._handleKeyDown}>
				<Board board={this.state.board} />
				<button className="new-game" onClick={this._handleNewGame}> New Game </button>
       	{this.state.gameOver &&
       		<GameOver 
       			submitHighScore={this._handleHighScoreSubmit}
       			highScore={this.state.highScore}
       			playerChange={this._handlePlayerChange}
       			player={this.state.player}
       		/>
	      }
			</div>
		)
	}
}
