import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav () {
	return(
		<ul className='nav'>
			<li>
				<NavLink exact activeClassName='active' to='/'>
					2048! 
				</NavLink>
			</li>
			<li>
				<NavLink exact activeClassName='active' to='/'>
					Home 
				</NavLink>
			</li>
			<li>
				<NavLink exact activeClassName='active' to='/highscores'>
					High Scores
				</NavLink>
			</li>
		</ul>
	)
}

module.exports = Nav
