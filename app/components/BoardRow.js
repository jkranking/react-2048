import React, { Component } from 'react'
import Cell from './Cell'

export default class BoardRow extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    const cells = this.props.numArray.map((num, i) => {
      return(
        <Cell
          className = 'cell'
          num = {num}
          key={i}
        />
      )
    })
    return(
      <div>
        {cells}
      </div>
    )
  }
}
