import React, {Component} from 'react'
import axios from 'axios'

export default class Home extends Component {
	constructor(props) {
	  super(props)
	  this.state = { scores: [] }
	  this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this)
	  this.getLeaderBoard = this.getLeaderBoard.bind(this)
	}

	loadCommentsFromServer() {
	  axios.get('http://localhost:3001/api' + this.props.location.pathname)
	    .then(res => {
	      this.setState({ scores: res.data })
	    })
	}

	componentWillMount() {
    this.loadCommentsFromServer()
  }

  getLeaderBoard(){
  	
  	const sortedScores = this.state.scores.sort(function(a, b) {
		  return b.score - a.score
		});

		const leaderBoard = []

		for(var i = 0; i < 20; i++){
			leaderBoard.push(sortedScores[i])
		}
		return leaderBoard
  }

	render(){
		let highScores = []
		if(this.state.scores.length){
			const leaderBoard = this.getLeaderBoard()
			highScores = leaderBoard.map((score, index) => {
		  	return (
		  		<li key={index}> 
						{index + 1}. {score.player} - {score.score}
					</li>
		  	)
		  })
		}

	  return (
	  	<div className="high-scores">
		  	<h3> High Scores </h3>
				<ul>
					{highScores}
				</ul>
			</div>
	  )
	}
}
