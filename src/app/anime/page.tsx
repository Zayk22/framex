import { Metadata } from "next";
import { Tv } from "lucide-react";

export const metadata: Metadata = {
  title: "Anime | FRAMEX",
};

export default function AnimePage() {
  return (
    <main className="flex min-h-screen items-center justify-center pt-24">
      <div className="text-center">
        <Tv size={48} className="mx-auto mb-4 text-matte-600" />
        <h1 className="font-display text-display text-white">Anime</h1>
        <p className="mt-3 text-body-lg text-matte-500">
          Anime collection coming soon.
        </p>
      </div>
    </main>
  );
}