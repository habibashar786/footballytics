export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="glass-card p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <p className="text-muted-foreground mb-6">
          Authentication coming soon. For now, enjoy the platform!
        </p>
        <a 
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:opacity-90 transition"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
