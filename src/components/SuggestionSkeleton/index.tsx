export default function SuggestionSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-2xl p-4 shadow-sm bg-white animate-pulse hover:shadow-lg transition duration-300"
        >
          <div className="h-40 bg-gray-200 rounded-lg mb-4" />
          <div className="h-4 bg-gray-300 rounded mb-2 w-3/4" />
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/2" />
          <div className="h-4 bg-gray-300 rounded w-1/3" />
        </div>
      ))}
    </div>
  )
}
