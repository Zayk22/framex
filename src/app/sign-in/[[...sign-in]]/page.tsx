import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-matte-950">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-matte-900 border border-matte-800 shadow-elevated rounded-xl",
            headerTitle: "text-white font-display text-heading-2",
            headerSubtitle: "text-matte-300",
            formFieldLabel: "text-matte-200",
            formFieldInput: "bg-matte-800 border-matte-700 text-white rounded-lg placeholder:text-matte-500",
            formButtonPrimary: "bg-crimson-DEFAULT hover:bg-crimson-dark text-white font-semibold rounded-lg",
            footerActionLink: "text-crimson-DEFAULT hover:text-crimson-dark",
            footerActionText: "text-matte-300",
            dividerLine: "bg-matte-700",
            dividerText: "text-matte-400",
            formFieldInputShowPasswordButton: "text-matte-300",
            socialButtonsBlockButton: "bg-matte-800 border border-matte-700 text-white hover:bg-matte-700 rounded-lg",
            socialButtonsBlockButtonText: "text-white font-medium",
            formFieldErrorText: "text-red-400",
            alertText: "text-matte-300",
            identityPreviewText: "text-white",
            identityPreviewEditButton: "text-crimson-DEFAULT",
          },
        }}
      />
    </main>
  );
}