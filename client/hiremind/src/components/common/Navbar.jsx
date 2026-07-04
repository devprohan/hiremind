import Logo from "./Logo";
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-violet-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <div className="hidden gap-8 text-sm text-slate-600 md:flex">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#about">About</a>
        </div>
        <div className="flex gap-3">
          <a href="/register" className="rounded-xl px-4 py-2">
            Login
          </a>
          <a
            href="/register"
            className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-2 text-white"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
