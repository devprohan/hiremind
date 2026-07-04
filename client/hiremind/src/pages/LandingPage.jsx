import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
const features = [
  ["AI Resume Scoring", "Instant ATS-focused feedback"],
  ["Keyword Insights", "Find missing role keywords"],
  ["Smart Suggestions", "Improve weak resume sections"],
  ["Job Match", "Compare your resume to a JD"],
  ["Interview Prep", "Generate resume-based questions"],
];
export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-white via-violet-50 to-pink-50">
      <Navbar />
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
          <div>
            <span className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm text-violet-700">
              ✦ AI-powered placement companion
            </span>
            <h1 className="mt-8 text-5xl font-black leading-tight text-slate-900 md:text-7xl">
              AI-Powered Resume Analysis that{" "}
              <span className="bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                Gets You Hired
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Upload your resume, get an ATS score, discover skill gaps, match
              jobs and prepare for interviews.
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="/register"
                className="rounded-xl bg-linear-to-r from-violet-600 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg"
              >
                Upload Resume →
              </a>
              <a
                href="#how"
                className="rounded-xl border bg-white px-6 py-3 font-semibold"
              >
                Try Demo
              </a>
            </div>
          </div>
          <div className="rounded-4xl border border-violet-100 bg-white/80 p-8 shadow-2xl">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-violet-50 p-6">
                <p className="text-slate-500">Your ATS Score</p>
                <p className="mt-3 text-6xl font-black text-emerald-500">86</p>
                <p className="text-emerald-600">Good Score</p>
              </div>
              <div className="rounded-2xl bg-pink-50 p-6">
                <p className="font-bold">Top Skills</p>
                {["React", "Node.js", "JavaScript", "MongoDB"].map((x) => (
                  <div className="mt-4 flex justify-between" key={x}>
                    <span>{x}</span>
                    <span className="text-emerald-500">✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-5 md:grid-cols-5">
            {features.map(([a, b]) => (
              <div
                key={a}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-4 h-10 w-10 rounded-xl bg-violet-100" />
                <h3 className="font-bold">{a}</h3>
                <p className="mt-2 text-sm text-slate-500">{b}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="how" className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="text-4xl font-black">
            From resume to interview in four steps
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              "Upload Resume",
              "AI Analysis",
              "Match Jobs",
              "Prepare Interview",
            ].map((x, i) => (
              <div key={x} className="rounded-2xl bg-white p-7 shadow">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-violet-600 font-bold text-white">
                  {i + 1}
                </div>
                <b>{x}</b>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
