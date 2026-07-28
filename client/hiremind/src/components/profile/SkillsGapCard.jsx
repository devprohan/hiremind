import { motion } from "framer-motion";
import { Lightbulb, CheckCircle2, AlertTriangle } from "lucide-react";

const missingSkills = [
  "Docker",
  "Kubernetes",
  "System Design",
  "AWS",
  "CI/CD",
];

export default function SkillGapCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white p-6 shadow-lg"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-orange-100 p-3">
          <Lightbulb className="text-orange-600" size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Skill Gap Analysis
          </h2>
          <p className="text-slate-500">
            Skills recommended to improve your ATS score
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {missingSkills.map((skill) => (
          <motion.div
            key={skill}
            whileHover={{ x: 5 }}
            className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle
                size={18}
                className="text-orange-500"
              />

              <span className="font-medium text-slate-700">
                {skill}
              </span>
            </div>

            <CheckCircle2
              size={20}
              className="text-emerald-500"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}