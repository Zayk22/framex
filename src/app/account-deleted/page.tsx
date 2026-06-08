import Link from "next/link";

export default function AccountDeletedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-matte-950">
      <div className="text-center">
        <h1 className="font-display text-heading-1 text-white">Account Deleted</h1>
        <p className="mt-2 text-body text-matte-400">
          Your account has been permanently deleted. We're sorry to see you go.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-crimson-DEFAULT px-6 py-3 text-body font-semibold text-white"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}