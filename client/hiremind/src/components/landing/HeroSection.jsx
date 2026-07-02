import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-24 px-8">

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-20 h-96 w-96 rounded-full bg-violet-300/40 blur-[120px]" />
        <div className="absolute right-20 top-20 h-96 w-96 rounded-full bg-pink-300/40 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="px-5 py-2 rounded-full bg-violet-100 text-violet-700">
            Trusted by 50,000+ students
          </span>

          <h1 className="text-6xl font-bold mt-8 leading-tight">
            AI Powered Career Platform to
            <span className="block bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              Get You Hired
            </span>
          </h1>

          <p className="text-slate-600 text-xl mt-8">
            Analyze resumes, improve skills and predict placements with AI.
          </p>

          <div className="flex gap-5 mt-10">
            <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-500 text-white px-8 py-4 rounded-2xl">
  Get Started →
</button>

            <button className="bg-white shadow-lg px-8 py-4 rounded-2xl">
              Watch Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-8">
            Resume Insights
          </h2>

          <div className="space-y-6">

            {["React", "NodeJS", "MongoDB", "DSA"].map(skill => (
              <div key={skill}>
                <div className="flex justify-between">
                  <span>{skill}</span>
                  <span>80%</span>
                </div>

                <div className="h-3 bg-slate-200 rounded-full mt-2">
                  <div className="h-3 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 w-[80%]" />
                </div>
              </div>
            ))}

          </div>

          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="bg-violet-50 rounded-2xl p-6">
              <p>ATS Score</p>
              <h3 className="text-4xl font-bold text-violet-600">85</h3>
            </div>

            <div className="bg-green-50 rounded-2xl p-6">
              <p>Placement Chance</p>
              <h3 className="text-4xl font-bold text-green-500">78%</h3>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;