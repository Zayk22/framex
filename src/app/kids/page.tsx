import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kids | Happu TV",
  description: "Family-friendly content coming soon.",
};

export default function KidsPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 mb-8">
        <h1 className="font-display text-display text-white">Kids</h1>
        <p className="mt-2 text-body-lg text-matte-500">
          Family-friendly content coming soon.
        </p>
      </div>
      <section className="flex min-h-[30vh] items-center justify-center">
        <p className="text-body-lg text-matte-600">
          Check back later for kids content.
        </p>
      </section>
    </main>
  );
}