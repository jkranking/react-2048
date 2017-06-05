import React, { Component } from 'react'

export default class Cell extends Component {
	constructor(props) {
	  super(props)
	}

	render(){
		if (this.props.num) {
      return (
      	<div className = {"cell _" + this.props.num}>
        	{this.props.num}
				</div>
			)
		} else {
			return (
					<div className ="cell"></div>
			)
		}
	}
}
