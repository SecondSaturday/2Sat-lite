import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-4">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#a442fe",
            colorBackground: "#f8f2ed",
            colorText: "#291334",
            colorInputBackground: "#f8f2ed",
            colorInputText: "#291334",
            borderRadius: "4px",
            fontFamily: "Instrument Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
          },
          elements: {
            rootBox: "mx-auto",
            card: "shadow-depth bg-base-100 border border-base-300",
            headerTitle: "text-base-content font-bold",
            headerSubtitle: "text-base-content/60",
            socialButtonsBlockButton: "border border-base-300 hover:border-primary transition-colors",
            formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-content font-semibold normal-case",
            footerActionLink: "text-primary hover:text-primary/80 font-semibold",
            formFieldInput: "border border-base-300 focus:border-primary bg-base-100",
            formFieldLabel: "text-base-content font-semibold",
            dividerLine: "bg-base-300",
            dividerText: "text-base-content/60",
            identityPreviewText: "text-base-content",
            identityPreviewEditButton: "text-primary",
            formResendCodeLink: "text-primary hover:text-primary/80",
            otpCodeFieldInput: "border border-base-300 focus:border-primary",
          },
        }}
        signUpUrl="/sign-up"
        forceRedirectUrl="/dashboard"
        routing="hash"
      />
    </div>
  );
}
