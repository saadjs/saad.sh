import { KBarButton } from './search/KBarButton'

const SearchButton = () => {
  return (
    <KBarButton
      aria-label="Search"
      className="flex items-center space-x-1.5 rounded-full border border-gray-300 px-3 py-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <span className="hidden items-center rounded px-1 py-0.5 text-[10px] md:flex">⌘</span>
      <span className="hidden items-center rounded px-1 py-0.5 text-[10px] md:flex">K</span>
    </KBarButton>
  )
}

export default SearchButton
