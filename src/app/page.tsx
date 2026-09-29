"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const malupitonQuotes = [
    "“Araw-araw normal, walang aatras tropa!”",
    "“Solid ‘yan boss, basta tuloy-tuloy lang ang grind.”",
    "“Kalma lang sa authentication, safe ka dito.”",
    "“Stay humble, pero make your presence malupiton!”",
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % malupitonQuotes.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage({ type: null, text: "" });

    if (!email || !password || (isSignUp && !name)) {
      setStatusMessage({
        type: "error",
        text: "Paki-fill up lahat ng fields, idol!",
      });
      return;
    }

    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage({
        type: "success",
        text: isSignUp
          ? `Welcome aboard ${name}! Account created successfully.`
          : `Solid! Logged in as ${email}. Welcome back boss!`,
      });
    }, 1200);
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden font-sans bg-neutral-950 text-white selection:bg-amber-500 selection:text-black">
      {/* Background Image Container with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/malupiton.jpg"
          alt="Malupiton Manila Nightlife Background"
          fill
          priority
          className="object-cover object-center scale-105 filter brightness-[0.78] contrast-[1.1] transition-transform duration-1000 ease-out"
        />
        {/* Dynamic Vignette & Ambient Glow Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.25),rgba(255,255,255,0))]" />
      </div>

      {/* Main Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-700">
        {/* Glowing Ambient Halo */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/30 via-orange-500/20 to-yellow-500/30 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000"></div>

        <div className="relative rounded-3xl border border-white/15 bg-neutral-900/75 p-6 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-2xl">
          {/* Header Brand */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              BrightLight • Malupiton Edition
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
              {isSignUp ? "Create Your Account" : "Welcome Back, Idol!"}
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-300">
              {isSignUp
                ? "Sumali sa tropahan. Start your journey today."
                : "Enter your credentials to enter the hub."}
            </p>
          </div>

          {/* Malupiton Quote Pill / Easter Egg */}
          <div
            onClick={nextQuote}
            className="group cursor-pointer mb-6 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-950/40 via-neutral-900/60 to-amber-950/40 p-3 text-center transition-all hover:border-amber-500/50 hover:bg-neutral-900/80"
          >
            <p className="text-xs italic text-amber-200/90 font-medium transition-all group-hover:text-amber-100">
              {malupitonQuotes[quoteIndex]}
            </p>
            <span className="mt-1 inline-block text-[10px] text-neutral-400 group-hover:text-amber-400/80 transition-colors">
              ⚡ Click for more Malupiton quotes
            </span>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 gap-1 p-1 mb-6 rounded-xl bg-black/40 border border-white/10">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setStatusMessage({ type: null, text: "" });
              }}
              className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                !isSignUp
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20 font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setStatusMessage({ type: null, text: "" });
              }}
              className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                isSignUp
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20 font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Feedback Status Alert */}
          {statusMessage.text && (
            <div
              className={`mb-5 rounded-xl p-3 text-xs sm:text-sm font-medium border flex items-center gap-2 animate-in fade-in ${
                statusMessage.type === "success"
                  ? "bg-emerald-950/70 text-emerald-300 border-emerald-500/40"
                  : "bg-red-950/70 text-red-300 border-red-500/40"
              }`}
            >
              {statusMessage.type === "success" ? (
                <svg
                  className="w-4 h-4 shrink-0 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 shrink-0 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Pangalan / Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-neutral-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Boss Malupiton"
                    className="w-full rounded-xl bg-black/50 border border-white/15 pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-neutral-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="malupiton@brightlight.ph"
                  className="w-full rounded-xl bg-black/50 border border-white/15 pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Password
                </label>
                {!isSignUp && (
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      setStatusMessage({
                        type: "error",
                        text: "Password reset link sent to registered email.",
                      });
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 hover:underline transition-colors"
                  >
                    Nakalimutan mo?
                  </a>
                )}
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-neutral-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl bg-black/50 border border-white/15 pl-10 pr-11 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Option */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-black/50 border-white/20 text-amber-500 focus:ring-amber-400/40 focus:ring-offset-0"
                />
                <span className="text-xs text-neutral-300">Tandaan ako</span>
              </label>
              <span className="text-[11px] text-neutral-400">100% Legit Secured</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/25 transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Pumapasok na...
                  </>
                ) : (
                  <>
                    {isSignUp ? "Gumawa ng Account" : "Pasok Na (Log In)"}
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-white/10"></div>
            <span className="bg-neutral-900 px-3 text-[11px] font-medium text-neutral-400 uppercase tracking-widest absolute">
              O mag-sign in gamit
            </span>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                setStatusMessage({
                  type: "success",
                  text: "Redirecting to Google authentication...",
                })
              }
              className="flex items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/5 py-2.5 px-3 text-xs font-semibold text-neutral-200 transition-all hover:bg-white/10 hover:border-white/30 active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.4 8.8 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.6 7.2C.6 9.2 0 10.5 0 12s.6 2.8 1.6 4.8l3.7-2.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.4-6.7-5.3L1.6 15.9C3.5 19.7 7.4 23 12 23z"
                />
              </svg>
              Google
            </button>

            <button
              type="button"
              onClick={() =>
                setStatusMessage({
                  type: "success",
                  text: "Redirecting to GitHub authentication...",
                })
              }
              className="flex items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/5 py-2.5 px-3 text-xs font-semibold text-neutral-200 transition-all hover:bg-white/10 hover:border-white/30 active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Footer note */}
          <div className="mt-6 text-center">
            <p className="text-[11px] text-neutral-400">
              Protektado ng end-to-end security.{" "}
              <a
                href="#terms"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Malupiton Terms: Respeto at sipag lang, tropa!");
                }}
                className="underline hover:text-amber-400 transition-colors"
              >
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
