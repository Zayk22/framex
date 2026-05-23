import { Metadata } from "next";
import { Smile } from "lucide-react";

export const metadata: Metadata = {
  title: "Kids | FRAMEX",
};

export default function KidsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center pt-24">
      <div className="text-center">
        <Smile size={48} className="mx-auto mb-4 text-matte-600" />
        <h1 className="font-display text-display text-white">Kids</h1>
        <p className="mt-3 text-body-lg text-matte-500">
          Kids section coming soon.
        </p>
      </div>
    </main>
  );
}