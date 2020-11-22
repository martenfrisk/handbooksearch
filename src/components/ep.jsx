import React, { useState, useEffect } from 'react'

import { secToMins, ExtLink } from './utils'
import { useParams } from 'react-router-dom'

import axios from 'axios'
// import moment from 'moment'

import '../components/ep.css'

export default function Ep() {
	const [ episode, setEpisode ] = useState([ { Episode: '', speaker: '', startTime: 0, text: '' } ])
	let { ep } = useParams()
	const epName = decodeURIComponent(ep)

	const onSuggestionFetchExact = async (value) => {
		const config = {
			method: "POST",
			url: 'https://oin-us-east-1.searchly.com/paragraphs/_search',
			headers: {
				'authorization': 'Basic ' + btoa('searchAPI:gqnavy3vfwiu0xqkt4amqouciiidvvle') 
			},
			data:{
				from: 0,
				size: 9999,
				query: {
					match_phrase: {
						Episode: value
					}
				}
			},
		}
		await axios(config)
			.then((res) => {
				const results = res.data.hits.hits.map((h) => h._source)
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
				<div className="mb-4 text-2xl">{episode[0].Episode}</div>
        <a href={`https://www.stitcher.com/search?q=${episode[0].Episode}#episodes`} className="text-blue-500 border-b border-white hover:border-blue-500">
									Find on Stitcher 
                  <div className="inline-block w-3 h-3 mb-px ml-1">{ExtLink}</div>
        </a>
				<div className="mt-4 text-justify">
					{sorted.map((i) => {
						return (
							<div key={i.text} className="flex mb-4">
                <div className="flex flex-col w-1/6">
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
