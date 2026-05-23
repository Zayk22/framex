import { Metadata } from "next";
import { Film } from "lucide-react";

export const metadata: Metadata = {
  title: "TV Shows | FRAMEX",
};

export default function TVShowsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center pt-24">
      <div className="text-center">
        <Film size={48} className="mx-auto mb-4 text-matte-600" />
        <h1 className="font-display text-display text-white">TV Shows</h1>
        <p className="mt-3 text-body-lg text-matte-500">
          TV show library coming soon.
        </p>
      </div>
    </main>
  );
}