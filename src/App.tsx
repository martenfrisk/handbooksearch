import React, { ReactElement } from 'react'
import { HashRouter as Router } from 'react-router-dom'

// import Search from './components/search'
import Layout from './components/layout'
// import Ep from './components/ep'
import './styles/main.css'

function App(props: any): ReactElement {
	return (
		<React.Fragment>
			<Router>
				<Layout />
				<div className="container w-full px-2 mx-auto md:px-10 lg:w-1/2">
					<h1 className="w-full mb-20 text-3xl text-center">'Hollywood Handbook search' has shut down due to cost-related reasons.</h1>
					<p className="mb-10">You can download the raw transcripts formatted for Elasticsearch here. You can easily use something like Notepad++ to search the file.</p>
					<p>All lines (50mb json): <a className="underline font-blue-800" href="https://mega.nz/file/vfhVEZYZ#6LyDl6JKXb2t6jogKzyNE-J5Izyi2BDy0r4fwTeP69U" target="_blank" rel="noopener noreferrer">https://mega.nz/file/vfhVEZYZ#6LyDl6JKXb2t6jogKzyNE-J5Izyi2BDy0r4fwTeP69U</a></p>
					<p>All episode titles (20mb json): <a className="underline font-blue-800" href="https://mega.nz/file/jf4h0DzA#hHGiaQW0oJsdcQfyi7EsyH4JnAzUZ_yc4XkZhwi5_rY" target="_blank" rel="noopener noreferrer">https://mega.nz/file/jf4h0DzA#hHGiaQW0oJsdcQfyi7EsyH4JnAzUZ_yc4XkZhwi5_rY</a></p>
					{/* <Route exact path="/">
						<Search />
					</Route>
					<Route path="/subreddit">
					<Redirect to="/?q=subreddit" />
					</Route>
          <Route path="/ep/:ep">
            <Ep />
          </Route> */}
				</div>
			</Router>
		</React.Fragment>
	)
}

export default App
