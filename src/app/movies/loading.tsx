export default function MoviesLoading() {
  return (
    <main className="min-h-screen pt-24 bg-matte-950">
      <div className="mx-auto max-w-screen-2xl px-6 mb-8">
        <div className="h-12 w-48 animate-pulse rounded bg-matte-800" />
        <div className="mt-2 h-6 w-96 animate-pulse rounded bg-matte-800" />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="px-6 py-8">
          <div className="mb-4 h-8 w-48 animate-pulse rounded bg-matte-800" />
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 6 }).map((_, j) => (
              <div key={j} className="aspect-[2/3] w-[150px] sm:w-[180px] lg:w-[220px] flex-shrink-0 animate-pulse rounded-lg bg-matte-800" />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}