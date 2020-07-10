import React, { useState, useEffect } from 'react'

import { secToMins, ExtLink } from '../components/utils'
import { useParams } from 'react-router-dom'

import axios from 'axios'
// import moment from 'moment'

import '../components/ep.css'

export default function Ep() {
	const [ episode, setEpisode ] = useState([ { Episode: '', speaker: '', startTime: 0, text: '' } ])
	let { ep } = useParams()
	const epName = decodeURIComponent(ep)

	const onSuggestionFetchExact = async (value: string) => {
		await axios
			.post(
				'https://search-podcast-indexer-4gzssr2fnp27pbrx5fbmc4rml4.us-east-1.es.amazonaws.com/paragraphs/_search',
				{
					from: 0,
					size: 9999,
					query: {
						match_phrase: {
							Episode: value
						}
					}
				}
			)
			.then((res: any) => {
				const results = res.data.hits.hits.map((h: any) => h._source)
        setEpisode(() => results)
        console.log(results)
			})
	}
	useEffect(() => {
    onSuggestionFetchExact(epName)
	}, [ epName ])

	const sorted = episode.sort((a, b) => a.startTime - b.startTime)

	return (
		<div>
				<div className="text-2xl mb-4">{episode[0].Episode}</div>
        <a href={`https://www.stitcher.com/search?q=${episode[0].Episode}#episodes`} className="text-blue-500 border-b border-white hover:border-blue-500">
									Find on Stitcher 
                  <div className="inline-block w-3 h-3 ml-1 mb-px">{ExtLink}</div>
        </a>
				<div className="text-justify mt-4">
					{sorted.map((i) => {
						return (
							<div key={i.text} className="flex mb-4">
                <div className="w-1/6 flex flex-col">
								<p>{secToMins(i.startTime)}
                  </p>
                  <p className="text-xs text-gray-700">

                {i.speaker}
                  </p>
                </div>
                <div className="w-5/6">

								{i.text.replace(/'/g, '')}
                </div>
							</div>
						)
					})}
				</div>
		</div>
	)
}
