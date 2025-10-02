import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-4">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#65c3c8",
            colorBackground: "#ffffff",
            colorText: "#291334",
            colorInputBackground: "#ffffff",
            colorInputText: "#291334",
            borderRadius: "1rem",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          },
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl bg-white rounded-2xl border-2 border-[#efeae6]",
            headerTitle: "text-[#291334] font-bold text-2xl",
            headerSubtitle: "text-[#291334]/60",
            socialButtonsBlockButton: "border-2 border-[#efeae6] hover:border-[#65c3c8] transition-colors",
            formButtonPrimary: "bg-[#65c3c8] hover:bg-[#65c3c8]/90 text-white font-semibold rounded-xl normal-case",
            footerActionLink: "text-[#65c3c8] hover:text-[#65c3c8]/80 font-semibold",
            formFieldInput: "border-2 border-[#efeae6] focus:border-[#65c3c8] rounded-xl",
            formFieldLabel: "text-[#291334] font-semibold",
            dividerLine: "bg-[#efeae6]",
            dividerText: "text-[#291334]/60",
            identityPreviewText: "text-[#291334]",
            identityPreviewEditButton: "text-[#65c3c8]",
            formResendCodeLink: "text-[#65c3c8] hover:text-[#65c3c8]/80",
            otpCodeFieldInput: "border-2 border-[#efeae6] focus:border-[#65c3c8] rounded-xl",
          },
        }}
        signInUrl="/signin"
        forceRedirectUrl="/dashboard"
        routing="hash"
      />
    </div>
  );
}
