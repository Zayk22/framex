export default function Loading() {
  return (
    <main className="min-h-screen bg-matte-950">
      {/* Hero skeleton */}
      <div className="flex min-h-screen items-center px-6 pt-20">
        <div className="max-w-2xl">
          <div className="h-8 w-40 animate-pulse rounded-full bg-matte-800" />
          <div className="mt-6 h-16 w-96 animate-pulse rounded bg-matte-800" />
          <div className="mt-6 h-20 w-full max-w-lg animate-pulse rounded bg-matte-800" />
          <div className="mt-8 flex gap-4">
            <div className="h-14 w-40 animate-pulse rounded-lg bg-matte-800" />
            <div className="h-14 w-48 animate-pulse rounded-lg bg-matte-800" />
          </div>
        </div>
      </div>

      {/* Row skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="px-6 py-8">
          <div className="mb-4 h-8 w-48 animate-pulse rounded bg-matte-800" />
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 6 }).map((_, j) => (
              <div
                key={j}
                className="aspect-[2/3] w-[150px] sm:w-[180px] lg:w-[220px] flex-shrink-0 animate-pulse rounded-lg bg-matte-800"
              />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}