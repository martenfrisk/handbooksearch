// @ts-nocheck
import React, { ReactElement } from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'

import Search from './components/search'
import Layout from './components/layout'
import Ep from './components/ep'
import './styles/main.css'

function App(props: any): ReactElement {
	return (
		<React.Fragment>
			<Router>
				<Layout />
				<div className="container w-full px-2 mx-auto md:px-10 lg:w-1/2">
					<Route exact path="/">
					
						<Search />
					</Route>
					<Route path="/subreddit">
					<Redirect to="/?q=subreddit" />
					</Route>
          <Route path="/ep/:ep">
            <Ep />
          </Route>
				</div>
			</Router>
		</React.Fragment>
	)
}

export default App
