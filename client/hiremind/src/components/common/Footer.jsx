import Logo from "./Logo";
export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-white py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Logo />
        <p className="text-sm text-slate-500">
          © 2026 HireMind. Better resumes. Better jobs.
        </p>
      </div>
    </footer>
  );
}
