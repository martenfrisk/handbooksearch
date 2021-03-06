import { Link } from "react-router-dom"

export default function Layout() {
  return (
    <>
      <div className="absolute top-0 flex flex-col items-center justify-center min-w-full min-h-screen text-3xl bg-white bg-opacity-75">
        <p>
          This page has moved to{" "}
          <a
            className="font-bold text-purple-900 underline"
            href="https://handbook.pcast.site"
          >
            https://handbook.pcast.site
          </a>
        </p>
        <p>You will be redirected there in five seconds.</p>
      </div>
      <div className="flex flex-col flex-wrap items-center justify-center pt-8 pb-4">
        <div className="flex items-end justify-center p-2 mt-2 border-b-2 border-gray-500 md:px-8">
          <Link
            to={{
              pathname: "/",
              search: "",
            }}
          >
            <div className="text-xl font-semibold tracking-tight uppercase md:text-2xl">
              Hollywood Handbook Search
            </div>
            <div className="text-base ">unofficial transcript archive</div>
          </Link>
          <div className="w-24 ml-4 text-xs leading-tight text-right text-blue-700 hover:underline">
            <a href="https://martenfrisk.github.io/seekerslounge">
              Teacher's Lounge search
            </a>
          </div>
        </div>
        {/* <div className="mt-2 text-sm">
          You can still download the raw transcripts formatted for Elasticsearch{" "}
          <a
            className="underline font-blue-800"
            href="https://github.com/martenfrisk/handbooksearch"
            target="_blank"
            rel="noopener noreferrer"
          >
            here.
          </a>
        </div> */}
      </div>
    </>
  )
}
