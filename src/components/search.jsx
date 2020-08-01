import React, { useEffect, useState, useReducer } from 'react'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import moment from 'moment'
import './search.css'
import EpList from './eps.json'
import LazyLoad from 'react-lazyload'
import { Link, withRouter } from 'react-router-dom'
import qs from 'qs'
import { getRandomInt, randomQuery, ExtLink, secToMins } from './utils'

const Search = (props) => {
	let { history } = props
	let initValue = randomQuery[getRandomInt(randomQuery.length)]
	const [ value, setValue ] = useState(history.location.search ? qs.parse(history.location.search)['?q'] : initValue)
	const [ suggestions, setSuggestions ] = useState([])
	const [ exact, setExact ] = useState(false)
	const [ showExactInfo, setShowExactInfo ] = useState(false)
	// const [inputRef, setInputFocus] = useFocus()
	const [ , forceUpdate ] = useReducer((x) => x + 1, 0)

	useEffect(() => {
		setShowExactInfo(() => true)
		setTimeout(() => {
			setShowExactInfo(() => false)
		}, 2000)
	}, [])

	const onSuggestionFetchFuzzy = async ({ value }) => {
		await axios
			.post(
				'https://search-podcast-indexer-4gzssr2fnp27pbrx5fbmc4rml4.us-east-1.es.amazonaws.com/paragraphs/_search',
				{
					from: 0,
					size: 99,
					query: {
						multi_match: {
							query: value,
							fields: [ 'text', 'Episode' ],
							fuzziness: 'AUTO'
						}
					}
				}
			)
			.then((res) => {
				const results = res.data.hits.hits.map((h) => h._source)
				setSuggestions(() => results)
				// history.push({ search: encodeURIComponent(value) })
			})
	}

	const onSuggestionFetchExact = async ({ value }) => {
		await axios
			.post(
				'https://search-podcast-indexer-4gzssr2fnp27pbrx5fbmc4rml4.us-east-1.es.amazonaws.com/paragraphs/_search',
				{
					from: 0,
					size: 99,
					query: {
						multi_match: {
							query: value,
							fields: [ 'text', 'Episode' ],
							type: 'phrase',
							operator: 'and'
						}
					}
				}
			)
			.then((res) => {
				const results = res.data.hits.hits.map((h) => h._source)
				setSuggestions(() => results)
				// history.push({ search: encodeURIComponent(value) })
			})
	}

	const onSuggestionsClearRequested = () => {
		return null
	}

	useEffect(
		() => {
			history.replace({
				search: '?' + new URLSearchParams({ q: value })
			})
		},
		[ history, value ]
	)

	const renderSuggestion = (suggestion, { query }) => {
		let epDetails = EpList.find((x) => x.title === suggestion.Episode)
		let date = moment(epDetails.pubDate)
		const suggestionText = suggestion.text
		const matches = AutosuggestHighlightMatch(suggestionText, query)
		const parts = AutosuggestHighlightParse(suggestionText, matches)

		return (
			<LazyLoad>
				<div className="min-w-full px-4 pt-6 pb-6 mb-6 border-l-4 border-white shadow-md hover:border-gray-400">
					<div className="flex flex-wrap items-center justify-between w-full mb-2">
								<Link
									to={{
										pathname: `/ep/${encodeURIComponent(suggestion.Episode)}`,
										hash: `#:~:text=${secToMins(suggestion.startTime)}`
									}}
									className="flex flex-wrap items-end justify-start pt-1 mr-2 text-base text-gray-700 border-b border-white border-dotted hover:border-gray-400"
								>
									<div className="mr-2">
										{suggestion.Episode}
									</div>
									<div className="mr-2">
										({date.format('YYYY MMM DD')})
									</div>
									<div className="text-xs">
										full ep
									</div>
								</Link>
						<div className="flex items-center font-mono text-right text-gray-600">
							<div className="hidden md:inline">time:&nbsp;</div>
							{secToMins(suggestion.startTime)}&nbsp;
							<div className="mr-2 font-sans text-right text-blue-600 border-b-2 border-dotted">
								<a href={`https://www.stitcher.com/search?q=${suggestion.Episode}#episodes`}>
									Find on Stitcher <div className="inline-block w-3 h-3 mb-px">{ExtLink}</div>
								</a>
							</div>
						</div>
					</div>
					<div className="px-2 py-2 mt-4 border-l-2 border-gray-400 md:px-6 md:text-lg">
						{parts.map((part, index) => {
							const className = part.highlight ? 'highlight' : ''

							return (
								<span className={className} key={index}>
									{part.text.replace(/'/g, '')}
								</span>
							)
						})}
					</div>
				</div>
			</LazyLoad>
		)
	}

	const getSuggestionValue = (suggestions) => value

	const inputProps = {
		placeholder: 'Search',
		value,
		autoFocus: true,
		onChange: (_, { newValue }) => setValue(() => newValue)
	}

	// const renderInputComponent = (inputProps) => {
	// 	return (
	// 		<div>
	// 			<input autoFocus {...inputProps} />
	// 			{/* <div>custom stuff</div> */}
	// 		</div>
	// 	)
	// }

	const handleCheckbox = () => {
		setExact((prev) => !prev)
		forceUpdate()
		setShowExactInfo(() => true)
		setTimeout(() => {
			setShowExactInfo(() => false)
		}, 2000)
	}

	const handleRandom = () => {
		setValue(() => randomQuery[getRandomInt(randomQuery.length)])
		setShowExactInfo(() => true)
		setTimeout(() => {
			setShowExactInfo(() => false)
		}, 2000)
	}

	return (
		<div>
			<p className="mx-2 text-center">Pro Version eps will be added soon!</p>
			<div className="flex flex-wrap items-center px-2 mt-2 md:px-2 md:mt-2">
				<button className="px-2 mr-4 text-sm text-white bg-blue-700 rounded" onClick={handleRandom}>
					Get random query
				</button>

				<label className="mr-4 text-sm" htmlFor="check">
					Search exact matches:{' '}
				</label>

				<input id="check" type="checkbox" onChange={handleCheckbox} checked={exact} />
				{showExactInfo && (
					<div className="px-2 my-2 text-sm text-white bg-red-700 rounded md:mx-2 md:my-0">
						Click the search bar
					</div>
				)}
				<div className="flex flex-wrap w-full mt-2 mb-2 text-sm">
					{suggestions.length === 99 ? (
						<p>99+ results for&nbsp;</p>
					) : (
						<p>{suggestions.length} results for&nbsp;</p>
					)}
					{value && <p>'{value}'&nbsp;</p>}
					{exact ? <p>(exact search)</p> : <p>(fuzzy search)</p>}
				</div>
			</div>
			<form>
				<Autosuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={exact ? onSuggestionFetchExact : onSuggestionFetchFuzzy}
					onSuggestionsClearRequested={onSuggestionsClearRequested}
					getSuggestionValue={getSuggestionValue}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps}
					focusInputOnSuggestionClick={false}
					alwaysRenderSuggestions={true}
					// renderInputComponent={renderInputComponent}
					// autoFocus
				/>
			</form>
		</div>
	)
}

export default withRouter(Search)
