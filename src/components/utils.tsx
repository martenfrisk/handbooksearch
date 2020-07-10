import React, { useRef } from 'react'

  export const ExtLink = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      opacity="0.7"
      fill="#3182ce"
      viewBox="0 0 768 1024"
    >
      <defs />
      <path d="M640 768H128V258l128-2V128H0v768h768V576H640v192zM384 128l128 128-192 192 128 128 192-192 128 128V128H384z" />
    </svg>
  )

  
export const useFocus = () => {
  const htmlElRef = useRef<HTMLElement>()
  const setFocus = () => {
    const currentEl = htmlElRef.current
    currentEl && currentEl.focus()
  }
  return [setFocus, htmlElRef] as const
}

export const secToMins = (seconds: number) => {
  let minutes: number = seconds / 60
  let totMins: string = minutes.toFixed(2)
  var number = totMins.replace('.', ':')
  return number
}

export const randomQuery = [
  "santa man",
  "teaser freezer",
  "chef kevin",
  "moriarty",
  "scoop troop",
  "You're Doing It Wrong: By Ho Ho Hove I Think Eggnog It",
  "gmail roulette",
  "speak on that",
  "ice bucket challenge",
  "cards against humanity",
  "engineer cody boy",
  "i love you and i'm in love with you",
  "guardians of the galaxy",
  "teen pope",
  "bosch",
  "homemade water",
  "doughboys"
]
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max))
}