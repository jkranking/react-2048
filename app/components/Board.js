import React, { Component } from 'react'
import BoardRow from './BoardRow'

export default class Board extends Component {
	constructor(props) {
	  super(props)
	}

	render(){
		return(
      <div className="board">
        {this.props.board.map((numArray, i) => {
        	return (
        		<BoardRow 
							numArray = {numArray}
							key={i}
						/>
        	)
        })}
			</div>
		)
	}
}
