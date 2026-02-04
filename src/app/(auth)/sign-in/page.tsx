import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      <div className="relative z-10">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white/10 backdrop-blur-xl border border-white/10",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              socialButtonsBlockButton: "bg-white/5 border-white/10 hover:bg-white/10",
              socialButtonsBlockButtonText: "text-white",
              dividerLine: "bg-white/10",
              dividerText: "text-gray-400",
              formFieldLabel: "text-gray-300",
              formFieldInput: "bg-white/5 border-white/10 text-white",
              footerActionLink: "text-amber-400 hover:text-amber-300",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-amber-400",
            },
          }}
        />
      </div>
    </div>
  );
}
